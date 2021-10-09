const { users, transaction } = require('../../models')


exports.getTransactions = async (req, res) => {
    try {
        if(req.user.id != 1){
            return res.send({
              status: "Failed",
              message: "Error, You Cannot Access This Page"
            })
        }
        let data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            },
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'email']
                    }
                }
            ]
        })

        data = JSON.parse(JSON.stringify(data));

        data = data.map((item) => {
        return {
            ...item,
            transferProof: process.env.FILE_PATH + item.transferProof,
        }
        });

        res.send({
            status: 'success',
            data: {
                transactions: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {

        const { id } = req.params;

        let data = await transaction.findOne({
            where:{
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'email']
                    }
                }
            ]
        });

        data = JSON.parse(JSON.stringify(data));

        data = {
          ...data,
          transferProof: process.env.FILE_PATH + data.transferProof
        }

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        // if(req.user.id != req.body.idUser){
        //     return res.send({
        //       status: "Failed",
        //       message: "Error, the account number you entered is wrong"
        //     })
        //   }

        if(req.user.id == 1){
          return res.send({
            status: "Failed",
            message: "Error, Admin cannot add transaction"
          })
        }
        
        await transaction.destroy({
          where: {
            idUser: req.user.id,
          },
        });

        const newTransaction = await transaction.create({
            idUser: req.user.id,
            transferProof: req.file.filename,
            remainingActive: 0,
            userStatus: "Not Active",
            paymentStatus: "Pending"
        })

        res.send({
            status: 'success',
            message: 'Add transaction finished',
            data: {
                transaction: {
                    ...newTransaction.dataValues
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;

      if (req.body.paymentStatus === "Approved"){
          await transaction.update(
            {
              remainingActive: 30,
              userStatus: "Active",
              paymentStatus: req.body.paymentStatus,
            },
            {
              where: {
              id,
              },
            },
          );
      }

      if (req.body.paymentStatus === "Cancel"){
        await transaction.update(
            {
              remainingActive: 0,
              userStatus: "Not Active",
              paymentStatus: req.body.paymentStatus,
            },
            {
              where: {
              id,
              },
            }
        );
      }

      const newTransaction = await transaction.findOne({
        where: {
          id
        },
        include: {
            model: users,
            as: "user",
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password', 'email', 'role'],
            },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'idUser']
        },
      });
  
      res.send({
        status: "success",
        message: `Update transaction id: ${id} finished`,
        data: {
            transaction: {
                ...newTransaction.dataValues
            }
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};