import React from 'react';
import styles from './Sidebar.module.css';
import ChatItem from './ChatItem/ChatItem';
import { FiPlus, FiUser, FiSettings } from 'react-icons/fi';

const Sidebar = ({
    isOpen,
    chatHistory,
    activeChat,
    setActiveChat,
    createNewChat,
    deleteChat
}) => {
    // Group chats by date
    const groupChatsByDay = () => {
        const groups = {};

        chatHistory.forEach(chat => {
            const date = new Date(chat.date);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            // Format as YYYY-MM-DD
            const dateStr = date.toISOString().split('T')[0];
            const todayStr = today.toISOString().split('T')[0];
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let groupTitle;
            if (dateStr === todayStr) {
                groupTitle = 'Today';
            } else if (dateStr === yesterdayStr) {
                groupTitle = 'Yesterday';
            } else {
                // Format as "April 30" or similar
                groupTitle = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            }

            if (!groups[groupTitle]) {
                groups[groupTitle] = [];
            }

            groups[groupTitle].push(chat);
        });

        return groups;
    };

    const chatGroups = groupChatsByDay();

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.sidebarHeader}>
                <button className={styles.newChatButton} onClick={createNewChat}>
                    <FiPlus size={16} />
                    <span>New chat</span>
                </button>
            </div>

            <div className={styles.chatList}>
                {Object.entries(chatGroups).map(([groupTitle, chats]) => (
                    <div key={groupTitle} className={styles.chatGroup}>
                        <h3 className={styles.groupTitle}>{groupTitle}</h3>
                        {chats.map(chat => (
                            <ChatItem
                                key={chat.id}
                                chat={chat}
                                isActive={chat.id === activeChat}
                                onClick={() => setActiveChat(chat.id)}
                                onDelete={() => deleteChat(chat.id)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.sidebarFooter}>
                <button className={styles.footerButton}>
                    <FiUser size={16} />
                    <span>My Profile</span>
                </button>
                <button className={styles.footerButton}>
                    <FiSettings size={16} />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;