import { useState, useEffect, useRef } from 'react';
import { FaUserAlt, FaChevronRight } from 'react-icons/fa';
import styles from './UsernameModal.module.css';

export default function UsernameModal({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        // Add animation delay to make the modal appear dramatically
        const timer = setTimeout(() => {
            setIsActive(true);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            // Animate out
            setIsActive(false);
            setTimeout(() => {
                onSubmit(username.trim());
            }, 500); // Match transition duration for smooth exit
        }
    };

    return (
        <div className={`${styles.modalOverlay} ${isActive ? styles.active : ''}`}>
            <div className={`${styles.frameOverlay}`}>
                <div className={styles.frameBorder}></div>
                <div className={`${styles.frameCorner} ${styles.frameCornerTopLeft}`}></div>
                <div className={`${styles.frameCorner} ${styles.frameCornerTopRight}`}></div>
                <div className={`${styles.frameCorner} ${styles.frameCornerBottomLeft}`}></div>
                <div className={`${styles.frameCorner} ${styles.frameCornerBottomRight}`}></div>
            </div>

            <div className={`${styles.modalContent} ${isActive ? styles.active : ''}`}>
                <div className={styles.modalHeader}>
                    <h2>USER IDENTIFICATION</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputIcon}>
                            <FaUserAlt />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ENTER USERNAME"
                            className={styles.usernameInput}
                            maxLength={20}
                            required
                        />
                    </div>

                    <div className={styles.formFooter}>
                        <div className={styles.connectionStatus}>
                            <span className={styles.statusDot}></span>
                            SECURE CONNECTION
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!username.trim()}
                        >
                            INITIALIZE <FaChevronRight className={styles.buttonIcon} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}