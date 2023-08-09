import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat(): JSX.Element {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {

        const userId = sessionStorage.getItem('token'); // Replace with the actual user ID
        socket.emit('identify', userId);
        // Listen for 'message' events from the server
        socket.on('message', (newMessage: string) => {
            console.log(newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
        socket.on('connect', () => {
            console.log('Connected to the WebSocket server');
        });


        return () => {
            // Clean up event listeners when component unmounts
            socket.off('message');
        };
    }, []);

    const sendMessage = (message: string): void => {
        // Emit a 'message' event to the server
        socket.emit('message', message);
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Type a message"
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        sendMessage(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}
            />
        </div>
    );
}

export default Chat;
