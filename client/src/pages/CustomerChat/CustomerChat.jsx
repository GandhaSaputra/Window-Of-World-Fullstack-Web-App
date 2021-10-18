import React, { useContext, useEffect, useState } from 'react'
import Left from '../../components/Left';
import { Container, Row, Col } from 'react-bootstrap';
import Contact from '../../components/chat/Contact';
import Chat from '../../components/chat/Chat';
import { UserContext } from '../../config/UserContext/UserContext';
import {io} from 'socket.io-client';

let socket;

const CustomerChat = () => {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })

        socket.on("connect_error", (err) => {
            console.error(err.message);
        });
        loadContact()
        loadMessages()
        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        socket.emit("load admin contact")

        socket.on("admin contact", (data) => {

            const dataContact = {
                ...data, 
                message: messages.length > 0 ? messages[messages.length -1].message : "Click here to start message"
            }
            // console.log(dataContact)
            setContacts([dataContact])
        })
    }

    const onClickContact = (data) => {
        console.log(data)
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        socket.on("messages", async (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                console.log(dataMessages)
                setMessages(dataMessages)
            }
            const chatMessagesElm = document.getElementById("chat-messages")
            chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
        })
    }

    const onSendMessage = (e) => {
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            console.log(data)
            socket.emit("send message", data)
            e.target.value = ""
        }
    }

    console.log(contact)
    console.log(contacts)

    return (
        <div className="container-home">
            <Left/>
            <Container style={{height: '100vh'}}>
                <Row>
                    <Col md={3} style={{height: '100vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{maxHeight: '100vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CustomerChat
