import React, { useState } from 'react';
import styles from './ChatItem.module.css';
import { FiMessageSquare, FiTrash2, FiEdit2 } from 'react-icons/fi';

const ChatItem = ({ chat, isActive, onClick, onDelete }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        // Edit functionality could be implemented here
        console.log('Edit chat:', chat.id);
    };

    return (
        <div
            className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.icon}>
                <FiMessageSquare size={16} />
            </div>

            <div className={styles.content}>
                <div className={styles.title}>{chat.title}</div>
            </div>

            {isHovering && (
                <div className={styles.actions}>
                    <button
                        className={styles.actionButton}
                        onClick={handleEdit}
                        aria-label="Edit chat title"
                    >
                        <FiEdit2 size={14} />
                    </button>
                    <button
                        className={styles.actionButton}
                        onClick={handleDelete}
                        aria-label="Delete chat"
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatItem;