// ChatItem.jsx
import React, { useState } from 'react';
import styles from './ChatItem.module.css';
import { FiMessageSquare, FiTrash2, FiEdit2 } from 'react-icons/fi';

const ChatItem = ({ chat, isActive, onClick, onDelete }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={styles.frame}>
                <div className={styles.icon}>
                    <FiMessageSquare size={14} />
                </div>
                <div className={styles.title}>{chat.title}</div>
                {isHovering && (
                    <div className={styles.actions}>
                        <button
                            className={styles.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Edit chat:', chat.id);
                            }}
                        >
                            <FiEdit2 size={12} />
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            <FiTrash2 size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatItem;