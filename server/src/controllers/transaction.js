const { users, transaction } = require('../../models')
const cron = require("node-cron")

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
                idUser: id,
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
        //inisiate remaining active variable
        let remainingActiveUser = 29;

        // get time now
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
          //first update
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
          
          //Update remaining active
          const task = cron.schedule(`${seconds} ${minutes} ${hours} * * *`, async () => {
            //get data transaction
            let getTransaction = await transaction.findOne({
              where: {
                id,
              }
            })
            getTransaction = JSON.parse(JSON.stringify(getTransaction))
            
            // the task will be stopped and completely delete if remainingActive < 0
            if (remainingActiveUser === -1) {
              //update user status
              await transaction.update(
                {
                  ...getTransaction,
                  paymentStatus: "Cancel",
                  userStatus: "Not Active",
                },
                {
                  where: {
                    id
                  }
                }
              )
              task.destroy();
            } else {
              // Update Transaction if remaining active > 0
              await transaction.update(
                {
                  ...getTransaction,
                  remainingActive: remainingActiveUser
                },
                {
                  where: {
                    id
                  }
                }
              )
              // Substrac remaining active
              remainingActive = remainingActive - 1;
            }

          })
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