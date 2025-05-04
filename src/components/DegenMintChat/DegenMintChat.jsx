import { useState, useEffect, useRef } from 'react';
import { FaWallet, FaCannabis, FaGem, FaMoneyBillWave, FaRandom, FaUserAlt } from 'react-icons/fa';
import styles from './DegenMintChat.module.css';

export default function DegenMintChat({ username }) {
    const [messages, setMessages] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentId, setCurrentId] = useState("1");
    const [typing, setTyping] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variantNumber, setVariantNumber] = useState(null);
    const chatContainerRef = useRef(null);

    // Load a random chat variant on component mount
    useEffect(() => {
        async function loadRandomChatData() {
            try {
                setLoading(true);
                // Generate a random number between 1 and 30
                const randomVariant = Math.floor(Math.random() * 30) + 1;
                setVariantNumber(randomVariant);

                // Fetch the JSON file
                const response = await fetch(`/conversationdata/degen_chat_variant_${randomVariant}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load chat data: ${response.status}`);
                }

                const data = await response.json();
                // Add artificial delay of 5 seconds
                setTimeout(() => {
                    setChatData(data);
                    setLoading(false);
                }, 5000);
            } catch (error) {
                console.error("Error loading chat data:", error);
                // Keep consistent delay even on error
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            }
        }

        loadRandomChatData();
    }, []);

    useEffect(() => {
        // Only proceed if we have loaded chat data and not in loading state
        if (chatData.length > 0 && !loading) {
            const node = chatData.find(n => n.id === currentId);
            if (node) {
                setTyping(true);
                // Replace any [USERNAME] placeholder with the actual username
                const processedText = node.bot.replace(/\[USERNAME\]/g, username.toUpperCase());

                typeWriterEffect(processedText, (text) => {
                    setMessages(prev => [...prev, { type: 'bot', text }]);
                    setOptions(node.options);
                    setTyping(false);
                });
            }
        }
    }, [currentId, chatData, loading, username]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, options]);

    // Reload with a different variant
    const reloadWithNewVariant = () => {
        setMessages([]);
        setOptions([]);
        setCurrentId("1");
        setLoading(true);

        // Generate a different random number between 1 and 8
        let newVariant;
        do {
            newVariant = Math.floor(Math.random() * 8) + 1;
        } while (newVariant === variantNumber);

        setVariantNumber(newVariant);

        // Fetch the new JSON file
        fetch(`/conversationdata/degen_chat_variant_${newVariant}.json`)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load chat data: ${response.status}`);
                return response.json();
            })
            .then(data => {
                // Increased delay to 5 seconds
                setTimeout(() => {
                    setChatData(data);
                    setLoading(false);
                }, 3000);
            })
            .catch(error => {
                console.error("Error loading chat data:", error);
                // Keep consistent delay even on error
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            });
    };

    const typeWriterEffect = (text, callback, delay = 20) => {
        let displayText = '';
        let i = 0;

        const typing = setInterval(() => {
            if (i < text.length) {
                displayText += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                if (callback) callback(displayText);
            }
        }, delay);
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleOption = (option) => {
        setMessages(prev => [...prev, { type: 'user', text: option }]);
        setOptions([]);

        const nextNode = chatData.find(n => n.id === currentId);
        if (nextNode.next && nextNode.next[option]) {
            setTimeout(() => {
                setCurrentId(nextNode.next[option]);
                // If we reach the end node (usually id 10), trigger mint process
                if (nextNode.next[option] === "10" || !nextNode.next[option]) {
                    console.log("Trigger mint process...");
                }
            }, 800);
        } else {
            // If there's no next node, we're at the end of the conversation
            // Add option to start a new chat with different variant
            setTimeout(() => {
                setOptions(["Try different conversation"]);
            }, 1500);
        }
    };

    // Special handler for restarting with a new variant
    const handleSpecialOption = (option) => {
        if (option === "Try different conversation") {
            reloadWithNewVariant();
        } else {
            handleOption(option);
        }
    };

    // Get appropriate icon for each message based on content
    const getMessageIcon = (message) => {
        if (message.type === 'user') return <FaUserAlt />;

        if (message.text.includes('NFT')) return <FaGem />;
        if (message.text.includes('weed')) return <FaCannabis />;
        return <FaMoneyBillWave />;
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading Degen Chat...</p>
                </div>
            ) : (
                <>
                    <div className={styles.header}>
                        <h1>DEGEN CHAT</h1>
                        <div className={styles.variantBadge}>
                            <FaUserAlt className={styles.variantIcon} />
                            {username}
                        </div>
                    </div>

                    <div className={styles.chatContainer} ref={chatContainerRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${styles.chatBubble} ${styles[message.type]} ${styles.show}`}
                            >
                                <span className={styles.icon}>{getMessageIcon(message)}</span>
                                <span className={styles.text}>{message.text}</span>
                            </div>
                        ))}

                        {typing && (
                            <div className={`${styles.chatBubble} ${styles.bot}`}>
                                <span className={styles.typingDots}>
                                    <span>.</span><span>.</span><span>.</span>
                                </span>
                            </div>
                        )}

                        {options.length > 0 && (
                            <div className={styles.options}>
                                {options.map((opt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => opt === "Try different conversation" ? handleSpecialOption(opt) : handleOption(opt)}
                                        className={`${styles.optionButton} ${opt === "Try different conversation" ? styles.specialButton : ''}`}
                                    >
                                        {opt === "Try different conversation" && <FaRandom className={styles.buttonIcon} />}
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}