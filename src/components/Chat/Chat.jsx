import React, { useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import Message from './Message/Message';
import ChatInput from './ChatInput/ChatInput';

const Chat = ({ messages, addMessage }) => {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        addMessage(suggestion);
    };

    return (
        <main className={styles.chat}>
            {messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <h2 className={styles.emptyTitle}>How can I help you today?</h2>
                    <div className={styles.suggestionGrid}>
                        <div
                            className={styles.suggestionCard}
                            onClick={() => handleSuggestionClick("Create a responsive landing page layout")}
                        >
                            <div className={styles.suggestionTitle}>Create a website layout</div>
                            <div className={styles.suggestionDesc}>Design a responsive landing page</div>
                        </div>
                        <div
                            className={styles.suggestionCard}
                            onClick={() => handleSuggestionClick("Explain React hooks like useState and useEffect")}
                        >
                            <div className={styles.suggestionTitle}>Explain React hooks</div>
                            <div className={styles.suggestionDesc}>Guide me through useState and useEffect</div>
                        </div>
                        <div
                            className={styles.suggestionCard}
                            onClick={() => handleSuggestionClick("Generate CSS for a loading spinner animation")}
                        >
                            <div className={styles.suggestionTitle}>Generate CSS animations</div>
                            <div className={styles.suggestionDesc}>Create a loading spinner effect</div>
                        </div>
                        <div
                            className={styles.suggestionCard}
                            onClick={() => handleSuggestionClick("Help me debug this JavaScript code")}
                        >
                            <div className={styles.suggestionTitle}>Debug my code</div>
                            <div className={styles.suggestionDesc}>Help me fix JavaScript errors</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.messagesContainer} ref={messagesContainerRef}>
                    {messages.map(message => (
                        <Message
                            key={message.id}
                            content={message.content}
                            isUser={message.isUser}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}

            <div className={styles.inputContainer}>
                <ChatInput onSubmit={addMessage} />
            </div>
        </main>
    );
};

export default Chat;