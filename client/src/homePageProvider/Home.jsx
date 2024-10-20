import React, { useState } from 'react'
import axios from 'axios'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const Home = () => {
    const [messages, setMessages] = useState([
        {
            message: 'Hello Mr. Kundu! I am MITRA, your digital best friend and I am here to assist you..',
            sender: 'MITRA',
            direction: 'incoming'
        }
    ]);

    const [typing, setTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {//holds the newly sent input by user
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }
        const newMessages = [...messages, newMessage]; //makes an array that holds all the previous states of 'messages' of useState and adds the newly sent input i.e 'newMessage'
        setMessages(newMessages);//updates 'messages' state of useState
        setTyping(true);

        //setting up API POST request here :=>
        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: message,
                history: newMessages.map(msg => msg.message)
            });
            //   console.log("------->>",response.data.text);
              const botReply = { message: response.data.text, sender: 'MITRA', direction: 'incoming' };
              setMessages([...newMessages, botReply]);            
        }
        catch (error) {
            console.error('Error communicating with Gemini API:', error);
            const errorMessage = {
                message: 'Oops! Something went wrong. Please try again.',
                sender: 'MITRA',
                direction: 'incoming'
            };
            setMessages([...newMessages, errorMessage]);
        }
        finally {
            setTyping(false);
        }

    }


    return (
        <>
            <div style={{ height: '650px', width: '1500px' }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={typing ? <TypingIndicator content='MITRA is typing..' /> : null}>
                            {messages.map((element, index) => {
                                return (
                                    <Message key={index} model={element} />
                                )
                            })}
                        </MessageList>
                        {/* <MessageInput placeholder='Type your query here..' onSend={handleSend} /> */}
                        <MessageInput placeholder='Type your query here..' onSend={(innerHtml, textContent) => handleSend(textContent)} 
                        attachButton = {false}
                            disabled = {false}
                            attachDisabled = {false}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </>
    );
}

export default Home