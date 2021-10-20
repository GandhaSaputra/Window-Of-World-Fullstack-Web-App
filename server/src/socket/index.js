const { users, profile, chats } = require('../../models')
const jwt = require("jsonwebtoken")

const {Op} = require("sequelize")
const connectedUser = {}


const socketIo = (io) => {

  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token ) {
      next();
    } else {
      next(new Error("Not Authorized"))
    }
  });

    io.on('connection', async (socket) => {
      console.log('client connect:', socket.id);

      const userId = socket.handshake.query.id
      connectedUser[userId] = socket.id

      socket.on('load admin contact', async () => {
        try {
          const adminContact = await users.findOne({
            include : [
              {
                model: profile,
                as: "profile",
                attributes : {
                  exclude: ['createdAt', 'updatedAt']
                },
              },
            ],
            where: {
              role: 'Admin'
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          });

          socket.emit('admin contact', adminContact);

        } catch (error) {
          console.log(error)
        }
      });

      socket.on('load customer contacts', async () => {
        try {
          let customersContact = await users.findAll({
            include : [
              {
                model: profile,
                as: "profile",
                attributes : {
                  exclude: ['createdAt', 'updatedAt']
                },
              },
              {
                model: chats,
                as: 'senderMessage',
                attributes : {
                  exclude: ['createdAt', 'updatedAt', 'idSender', 'idRecipient']
                },
              },
              {
                model: chats,
                as: 'recipientMessage',
                attributes : {
                  exclude: ['createdAt', 'updatedAt', 'idSender', 'idRecipient']
                },
              }
            ],
            where: {
              role: "Customer"
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          });

          customersContact = JSON.parse(JSON.stringify(customersContact));

          customersContact = customersContact.map(item => ({
            ...item,
            userPhoto: item.userPhoto ? process.env.PATH_FILE + item.userPhoto : null
          }))

          socket.emit('customer contacts', customersContact);

        } catch (error) {
          console.log(error)
        }
      })

      socket.on('load messages', async (payload) => {
        try {
          const token = socket.handshake.auth.token
          const tokenKey = process.env.SECRET_KEY
          const verified = jwt.verify(token, tokenKey)

          const idRecipient = payload
          const idSender = verified.id

          const data = await chats.findAll({
            where: {
              idSender: {
                [Op.or]: [idRecipient, idSender]
              },
              idRecipient: {
                [Op.or]: [idRecipient, idSender]
              }
            },
            include: [
              {
                model: users,
                as: "recipient",
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password']
                },
              },
              {
                model: users,
                as: "sender",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              },
            ],
            order: [['createdAt', 'ASC']],
            attributes: {
              exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"]
            }
          })

          socket.emit("messages", data)
        } catch (error) {
          console.log(error)
        }
      })

      socket.on('send message', async (payload) => {
        try {
          const token = socket.handshake.auth.token
        
          const tokenKey = process.env.SECRET_KEY
          const verified = jwt.verify(token, tokenKey)
          
          const idSender = verified.id
          const { message, idRecipient } = payload

          await chats.create({
            message,
            idRecipient,
            idSender
          })

          io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient)
        } catch (error) {
          console.log(error)
        }
      })

      socket.on('disconnect', () => {
          console.log('client disconnect');
      })
    })
}
   
module.exports = socketIo