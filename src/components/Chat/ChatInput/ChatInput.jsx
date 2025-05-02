import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInput.module.css';
import { FiSend, FiPlus } from 'react-icons/fi';

const ChatInput = ({ onSubmit }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        if (!message && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSubmit(message);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className={styles.chatInputForm} onSubmit={handleSubmit}>
            <div className={styles.chatInputContainer}>
                <button
                    type="button"
                    className={styles.attachButton}
                    title="Add attachments"
                >
                    <FiPlus size={16} />
                </button>

                <textarea
                    ref={textareaRef}
                    className={styles.chatInput}
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Message ChatGPT..."
                    rows={1}
                />

                <button
                    type="submit"
                    className={`${styles.sendButton} ${message.trim() ? styles.active : ''}`}
                    disabled={!message.trim()}
                >
                    <FiSend size={16} />
                </button>
            </div>

            <div className={styles.hintText}>
                ChatGPT can make mistakes. Consider checking important information.
            </div>
        </form>
    );
};

export default ChatInput;
