const { category } = require('../../models');


exports.getCategories = async (req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                categories: data
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

exports.getCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await category.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
          category: data,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

exports.addCategory = async (req, res) => {
  try {
    await category.create(req.body);

    res.send({
      status: 'success',
      message: 'Add category finished',
      category: req.body
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      await category.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update category id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };


  exports.deleteCategory = async (req, res) => {
    // code here
    try {
      const { id } = req.params;
  
      // if(id !== user.id) {
      //   return res.send({
      //     status: "failed",
      //     message: `User with id ${id} not found`
      //   })
      // }
  
      await category.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Delete user id: ${id} finished`,
        data: {
          id,
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };