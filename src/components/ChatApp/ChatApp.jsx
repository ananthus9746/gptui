import React, { useState, useEffect } from 'react';
import UsernameModal from '../UsernameModal/UsernameModal';
import DegenMintChat from '../DegenMintChat/DegenMintChat';
import Gallery from '../Gallery/Gallery';
import styles from './ChatApp.module.css';

export default function ChatApp() {
    const [username, setUsername] = useState('');
    const [activeComponent, setActiveComponent] = useState('chat');

    // Check for active component in sessionStorage on initial load
    useEffect(() => {
        const savedComponent = sessionStorage.getItem('activeComponent');
        if (savedComponent) {
            setActiveComponent(savedComponent);
        }
    }, []);

    // Store the active component in sessionStorage when it changes
    useEffect(() => {
        sessionStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);

    // Listen for Gallery button click events
    useEffect(() => {
        const handleGalleryButtonClick = () => {
            setActiveComponent('gallery');
        };

        // Listen for the custom event from the Header component
        document.addEventListener('galleryButtonClicked', handleGalleryButtonClick);

        return () => {
            document.removeEventListener('galleryButtonClicked', handleGalleryButtonClick);
        };
    }, []);

    const handleUsernameSubmit = (name) => {
        setUsername(name);
    };

    // Switch to chat view
    const switchToChat = () => {
        setActiveComponent('chat');
    };

    // Render components based on activeComponent state
    const renderActiveComponent = () => {
        if (!username) {
            return <UsernameModal onSubmit={handleUsernameSubmit} />;
        }

        switch (activeComponent) {
            case 'gallery':
                return (
                    <div className={styles.componentContainer}>
                        <Gallery />
                        <button className={styles.backButton} onClick={switchToChat}>
                            Back to Chat
                        </button>
                    </div>
                );
            case 'chat':
            default:
                return <DegenMintChat username={username} />;
        }
    };

    return <div className={styles.chatAppContainer}>{renderActiveComponent()}</div>;
}