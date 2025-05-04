import React, { useState } from 'react';
import styles from './Header.module.css';
import { FiMenu, FiPlus, FiChevronDown, FiSearch, FiUser } from 'react-icons/fi';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

const Header = ({ toggleSidebar, sidebarOpen, createNewChat, currentChatTitle }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleGalleryClick = () => {
        // Dispatch a custom event that our ChatApp component will listen for
        const galleryEvent = new CustomEvent('galleryButtonClicked');
        document.dispatchEvent(galleryEvent);
    };

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

                <h1 className={styles.chatTitle}>LOGO</h1>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.fancyButton}>
                    <span className={styles.fancyButtonContent}>Connect</span>
                </button>

                <button
                    className={styles.fancyButton}
                    onClick={handleGalleryClick}
                    id="galleryButton"
                >
                    <span className={styles.fancyButtonContent}>Gallery</span>
                </button>

                <a
                    className={styles.socialIcon}
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                >
                    <FaTwitter size={18} />
                </a>

                <a
                    className={styles.socialIcon}
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                >
                    <FaDiscord size={18} />
                </a>
            </div>
        </header>
    );
};

export default Header;