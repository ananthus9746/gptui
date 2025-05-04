import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './App.module.css';
import { mockChatHistory } from './data/mockData';
import ChatApp from './components/ChatApp/ChatApp';

function App() {
    const [activeChat, setActiveChat] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatHistory, setChatHistory] = useState(mockChatHistory);

    // Set the first chat as active when the app loads or when history changes
    useEffect(() => {
        if (chatHistory.length > 0 && !activeChat) {
            setActiveChat(chatHistory[0].id);
        }
    }, [chatHistory, activeChat]);

    // Create a new chat
    const createNewChat = () => {
        const newChat = {
            id: `chat-${Date.now()}`,
            title: 'New chat',
            date: new Date().toISOString(),
            messages: []
        };

        setChatHistory(prev => [newChat, ...prev]);
        setActiveChat(newChat.id);
    };

    // Get the active chat object
    const currentChat = chatHistory.find(chat => chat.id === activeChat) || { messages: [] };

    // Add a message to the current chat
    const addMessage = (content, isUser = true) => {
        if (!activeChat) {
            createNewChat();
        }

        const newMessage = {
            id: `msg-${Date.now()}`,
            content,
            isUser,
            timestamp: new Date().toISOString()
        };

        setChatHistory(prev =>
            prev.map(chat =>
                chat.id === activeChat
                    ? {
                        ...chat,
                        title: isUser ? content.slice(0, 20) + (content.length > 20 ? '...' : '') : chat.title,
                        messages: [...chat.messages, newMessage]
                    }
                    : chat
            )
        );

        // Simulate AI response after 1 second
        if (isUser) {
            setTimeout(() => {
                const responses = [
                    "I'm an AI assistant. How can I help you today?",
                    "That's an interesting question. Let me think about it...",
                    "I understand what you're asking. Here's what I think...",
                    "I found some information that might help with your question.",
                    "I'd be happy to assist you with that request."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, false);
            }, 1000);
        }
    };

    // Delete a chat from history
    const deleteChat = (chatId) => {
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
        if (activeChat === chatId) {
            setActiveChat(chatHistory.length > 1 ? chatHistory[0].id : null);
        }
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className={styles.app}>
            <Header
                toggleSidebar={toggleSidebar}
                sidebarOpen={sidebarOpen}
                createNewChat={createNewChat}
                currentChatTitle={currentChat.title || 'New chat'}
            />
            <div className={styles.mainContainer}>
                <Sidebar
                    isOpen={sidebarOpen}
                    chatHistory={chatHistory}
                    activeChat={activeChat}
                    setActiveChat={setActiveChat}
                    createNewChat={createNewChat}
                    deleteChat={deleteChat}
                />
                <ChatApp/>
            </div>
        </div>
    );
}

export default App;