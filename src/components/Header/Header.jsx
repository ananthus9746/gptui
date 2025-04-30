import React, { useState } from 'react';
import styles from './Header.module.css';
import { FiMenu, FiPlus, FiChevronDown, FiSearch, FiUser } from 'react-icons/fi';

const Header = ({ toggleSidebar, sidebarOpen, createNewChat, currentChatTitle }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button
                    className={styles.menuButton}
                    onClick={toggleSidebar}
                    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <FiMenu size={20} />
                </button>

                <h1 className={styles.chatTitle}>{currentChatTitle}</h1>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.newChatButton} onClick={createNewChat}>
                    <FiPlus size={16} />
                    <span>New chat</span>
                </button>

                <div className={styles.dropdownContainer}>
                    <button
                        className={styles.modelSelector}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span>ChatGPT</span>
                        <FiChevronDown size={16} />
                    </button>

                    {dropdownOpen && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownItem}>GPT-3.5</div>
                            <div className={styles.dropdownItem}>GPT-4</div>
                        </div>
                    )}
                </div>

                <button className={styles.iconButton} aria-label="Search">
                    <FiSearch size={20} />
                </button>

                <button className={styles.userButton} aria-label="User settings">
                    <div className={styles.userAvatar}>
                        <FiUser size={18} />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;