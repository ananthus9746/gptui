import React, { useState } from 'react';
import { FiPlus, FiZap, FiDatabase, FiTrendingUp, FiSettings, FiUser } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import NFTItem from './NFTItem/NFTItem';

const Sidebar = () => {
    // Static data instead of props
    const [isOpen, setIsOpen] = useState(true);
    const [activeCollection, setActiveCollection] = useState("nft-001");

    // Static NFT collections data
    const nftCollections = [
        {
            id: "nft-001",
            name: "Cyber Samurai",
            tokenId: "6529",
            imageUrl: null,
            type: "Genesis",
            collectionType: "Recent"
        },
        {
            id: "nft-002",
            name: "Neon Dragon",
            tokenId: "2077",
            imageUrl: null,
            type: "Mythic",
            collectionType: "Recent"
        },
        {
            id: "nft-003",
            name: "Ghost Protocol",
            tokenId: "3301",
            imageUrl: null,
            type: "Legendary",
            collectionType: "Recent"
        },
        {
            id: "nft-004",
            name: "Neural Network",
            tokenId: "0451",
            imageUrl: null,
            type: "Rare",
            collectionType: "Cyberpunk"
        },
        {
            id: "nft-005",
            name: "Digital Wasteland",
            tokenId: "2143",
            imageUrl: null,
            type: "Epic",
            collectionType: "Cyberpunk"
        },
        {
            id: "nft-006",
            name: "Virtual Singularity",
            tokenId: "1337",
            imageUrl: null,
            type: "Rare",
            collectionType: "Abstract"
        },
        {
            id: "nft-007",
            name: "Quantum Glitch",
            tokenId: "8888",
            imageUrl: null,
            type: "Uncommon",
            collectionType: "Abstract"
        },
        {
            id: "nft-008",
            name: "Blockchain Guardian",
            tokenId: "1984",
            imageUrl: null,
            type: "Legendary",
            collectionType: "Avatars"
        }
    ];

    // Functions to handle actions
    const createNewNFT = () => {
        console.log("Creating new NFT");
        // Implementation would go here
    };

    const deleteNFT = (id) => {
        console.log(`Deleting NFT with id: ${id}`);
        // Implementation would go here
    };
    // State for tracking expanded categories
    const [expandedCategories, setExpandedCategories] = useState({
        recent: true,
        collections: true
    });

    // Toggle category expansion
    const toggleCategory = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category]
        });
    };

    // Group NFTs by collection type
    const groupNFTsByType = () => {
        const groups = {};

        nftCollections.forEach(nft => {
            const collectionType = nft.collectionType || 'Uncategorized';

            if (!groups[collectionType]) {
                groups[collectionType] = [];
            }

            groups[collectionType].push(nft);
        });

        return groups;
    };

    const nftGroups = groupNFTsByType();

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.sidebarContent}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoGlow}></div>
                    <span className={styles.logoText}>NEXUS<span className={styles.logoAccent}>NFT</span></span>
                </div>

                <button className={styles.createButton} onClick={createNewNFT}>
                    <FiZap className={styles.buttonIcon} />
                    <span>Generate NFT</span>
                    <div className={styles.buttonGlow}></div>
                </button>

                <div className={styles.navigationContainer}>
                    <div className={styles.navSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleCategory('recent')}
                        >
                            <div className={styles.sectionTitle}>
                                <FiTrendingUp />
                                <span>Recent Generations</span>
                            </div>
                            <div className={`${styles.expandArrow} ${expandedCategories.recent ? styles.expanded : ''}`}>
                                ›
                            </div>
                        </div>

                        {expandedCategories.recent && (
                            <div className={styles.sectionContent}>
                                {nftGroups['Recent'] && nftGroups['Recent'].map(nft => (
                                    <NFTItem
                                        key={nft.id}
                                        nft={nft}
                                        isActive={activeCollection === nft.id}
                                        onClick={() => setActiveCollection(nft.id)}
                                        onDelete={() => deleteNFT(nft.id)}
                                    />
                                ))}
                                {(!nftGroups['Recent'] || nftGroups['Recent'].length === 0) && (
                                    <div className={styles.emptyMessage}>No recent generations</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.navSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleCategory('collections')}
                        >
                            <div className={styles.sectionTitle}>
                                <FiDatabase />
                                <span>Collections</span>
                            </div>
                            <div className={`${styles.expandArrow} ${expandedCategories.collections ? styles.expanded : ''}`}>
                                ›
                            </div>
                        </div>

                        {expandedCategories.collections && (
                            <div className={styles.sectionContent}>
                                {Object.entries(nftGroups)
                                    .filter(([groupName]) => groupName !== 'Recent')
                                    .map(([groupName, nfts]) => (
                                        <div key={groupName} className={styles.collectionGroup}>
                                            <div className={styles.collectionGroupTitle}>
                                                <span className={styles.groupDot}></span>
                                                {groupName}
                                            </div>
                                            {nfts.map(nft => (
                                                <NFTItem
                                                    key={nft.id}
                                                    nft={nft}
                                                    isActive={activeCollection === nft.id}
                                                    onClick={() => setActiveCollection(nft.id)}
                                                    onDelete={() => deleteNFT(nft.id)}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                {Object.keys(nftGroups).length <= 1 && (
                                    <div className={styles.emptyMessage}>No collections found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.sidebarFooter}>
                <button className={styles.footerButton}>
                    <FiUser />
                    <span>Profile</span>
                </button>
                <button className={styles.footerButton}>
                    <FiSettings />
                    <span>Settings</span>
                </button>
            </div>

            <div className={styles.scanLine}></div>
            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerTopRight}></div>
            <div className={styles.cornerBottomLeft}></div>
            <div className={styles.cornerBottomRight}></div>
        </div>
    );
};

export default Sidebar;