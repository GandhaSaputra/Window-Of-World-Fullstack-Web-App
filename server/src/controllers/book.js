// import models here
const { books, users, category, categorybooks} = require('../../models');

exports.getBooks = async (req, res) => {
  try {
    let data = await books.findAll({
      include: [
        {
          model: category,
          as: "category",
          through: {
            model: categorybooks,
            as: "bridge",
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'bridge'],
            },
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'bridge'],
          },
        }
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        bookFile: process.env.FILE_PATH + item.bookFile,
      }
    });

    res.send({
      status: 'success',
      data: {
        books: data
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

exports.getBook = async (req, res) => {
    try {
        const { id } = req.params;
    
        let data = await books.findOne({
          where: {
            id,
          },
          include: [
            {
              model: category,
              as: "category",
              through: {
                model: categorybooks,
                as: "bridge",
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'bridge'],
                },
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'bridge'],
              },
            }
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser'],
          },
        });

        data = JSON.parse(JSON.stringify(data));

        data = {
          ...data,
          bookFile: process.env.FILE_PATH + data.bookFile
        }
    
        res.send({
          status: "success",
          data: {
            book: data
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

exports.addBook = async (req, res) => {
  try {
    const {category: categoryName, ...data} = req.body;

    if(req.user.id != 1){
      return res.send({
        status: "Failed",
        message: "Only admin can add book"
      })
    }

    const newBook = await books.create({
      ...data,
      bookFile: req.file.filename,
      idUser: req.user.id
    });

    const categoryData = await category.findOne({
      where: {
        name: categoryName
      },
    });

    if (categoryData) {
      await categorybooks.create({
        idBook: newBook.id,
        idCategory: categoryData.id,
      });
    } else {
      const newCategory = await category.create({name: categoryName});
      await categorybooks.create({
        idBook: newBook.id,
        idCategory: newCategory.id,
      });
    }

    let bookData = await books.findOne({
      where: {
        id: newBook.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    res.send({
      status: 'success',
      data: {
        ...bookData.dataValues,
      }
    })

  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Erro',
    });
  }
};

exports.updateBook = async (req, res) => {
    try {
      const { id } = req.params;

      if(req.user.id != 1){
        return res.send({
          status: "Failed",
          message: "Only admin can update book"
        })
      }
  
      await books.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Update book id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};

exports.deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      await books.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete book id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.addCategoryBook = async (req, res) => {
    try {

      const { id } = req.params;

      // const {data} = req.body;

      await categorybooks.create({
        idBook: id,
        idCategory: req.body.idCategory
      })
  
      res.send({
        status: "success",
        message: `Add category to book with id ${id}, finished`
      })
      
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  }