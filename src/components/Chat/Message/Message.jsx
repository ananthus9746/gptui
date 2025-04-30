import React from 'react';
import styles from './Message.module.css';
import { FiUser, FiCpu, FiCopy, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const Message = ({ content, isUser }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(content);
    };

    return (
        <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.aiMessage}`}>
            <div className={styles.messageContent}>
                <div className={styles.avatar}>
                    {isUser ? (
                        <div className={styles.userAvatar}>
                            <FiUser />
                        </div>
                    ) : (
                        <div className={styles.aiAvatar}>
                            <FiCpu />
                        </div>
                    )}
                </div>
                <div className={styles.messageBody}>
                    <div className={styles.messageText}>{content}</div>
                    {!isUser && (
                        <div className={styles.messageActions}>
                            <button className={styles.actionButton} onClick={copyToClipboard} title="Copy to clipboard">
                                <FiCopy size={16} />
                            </button>
                            <button className={styles.actionButton} title="Like this response">
                                <FiThumbsUp size={16} />
                            </button>
                            <button className={styles.actionButton} title="Dislike this response">
                                <FiThumbsDown size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;