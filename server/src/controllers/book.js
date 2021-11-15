// import models here
const { books, users, category, categorybooks, userBookList} = require('../../models');

const fs = require("fs")

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
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
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
        bookCover: process.env.FILE_PATH + item.bookCover,
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
          bookCover: process.env.FILE_PATH + data.bookCover,
          bookFile: process.env.FILE_PATH + data.bookFile,
          bookFileName: data.bookFile,
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

    const newBook = await books.create({
      ...data,
      bookFile: req.files.bookFile[0].filename,
      bookCover: req.files.bookCover[0].filename,
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
      message: 'Server Error',
    });
  }
};

exports.updateBook = async (req, res) => {
    try {
      const { id } = req.params;

      const dataBody = req.body;

      if (Object.keys(req.files).length === 0) {
        await books.update(
          {
            ...dataBody
          },
          {
            where: {
              id
            }
          }
        )
      } else if (req.files.bookFile !== undefined && req.files.bookCover === undefined) {
        const book = await books.findOne({
          where: {
            id,
          }
        })
        fs.unlinkSync("uploads/" + book.bookFile)
        await books.update(
          {
            ...dataBody,
            bookFile: req.files.bookFile[0].filename
          },
          {
            where: {
              id,
            }
          }
        )
      } else if (req.files.bookFile === undefined && req.files.bookCover !== undefined) {
        const book = await books.findOne({
          where: {
            id,
          }
        })
        fs.unlinkSync("uploads/" + book.bookCover)
        await books.update(
          {
            ...dataBody,
            bookCover: req.files.bookCover[0].filename
          },
          {
            where: {
              id,
            }
          }
        )
      } else {
        const book = await books.findOne({
          where: {
            id,
          }
        })
        fs.unlinkSync("uploads/" + book.bookFile)
        fs.unlinkSync("uploads/" + book.bookCover)
        await books.update(
          {
            ...dataBody,
            bookFile: req.files.bookFile[0].filename,
            bookCover: req.files.bookCover[0].filename
          },
          {
            where: {
              id,
            }
          }
        )
      }
  
      let data = await books.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      })

      data = JSON.parse(JSON.stringify(data))
      data = {
        ...data,
        bookCover: process.env.FILE_PATH + data.bookCover,
        bookFile: process.env.FILE_PATH + data.bookFile,
      }
  
      res.send({
        status: "success",
        message: `Update book id: ${id} finished`,
        data
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
      
      const book = await books.findOne({
        where: {
          id,
        }
      })

      fs.unlinkSync("uploads/" + book.bookFile)
      fs.unlinkSync("uploads/" + book.bookCover)
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

exports.getUserDetailBook = async (req, res) => {
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
        bookCover: process.env.FILE_PATH + data.bookCover,
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