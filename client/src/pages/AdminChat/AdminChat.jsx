import React, { useContext, useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import { Container, Row, Col } from 'react-bootstrap';
import Contact from '../../components/chat/Contact';
import Chat from '../../components/chat/Chat';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin'
import { UserContext } from '../../config/UserContext/UserContext';

let socket;

const AdminChat = () => {
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
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        loadMessages()

        socket.on("connect_error", (err) => {
            console.error(err.message);
        });

        return () => {
            socket.disconnect();
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            let dataContacs = data.filter(item => item.role !== "Admin")

            dataContacs = dataContacs.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
            }))

            setContacts(dataContacs)
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = () => {
        // define event listener for "messages"
        socket.on("messages", (data) => {
            // get data messages
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message,
                }))
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessagesElm = document.getElementById("chat-messages")
            chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
        })
    }

    const onSendMessage = (e) => {
        // listen only enter key event press
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            //emit event send message
            socket.emit("send message", data)
            e.target.value = ""
        }
    }

    return (
        <div>
            <NavbarAdmin/>
            <Container fluid style={{height: '83.7vh'}}>
                <Row>
                    <Col md={3} style={{height: '89vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} sendMessage={onSendMessage}/>
                    </Col>
                    <Col md={9} style={{maxHeight: '100vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default AdminChat
