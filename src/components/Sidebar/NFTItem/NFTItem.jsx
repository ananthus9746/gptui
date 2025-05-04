import React from 'react';
import { FiTrash2, FiCopy, FiEye } from 'react-icons/fi';
import styles from './NFTItem.module.css';

const NFTItem = ({ nft, isActive, onClick, onDelete }) => {
    // No changes to function parameters since these are passed from the parent Sidebar component
    return (
        <div
            className={`${styles.nftItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <div className={styles.imagePreview}>
                {nft.imageUrl ? (
                    <img src={nft.imageUrl} alt={nft.name} />
                ) : (
                    <div className={styles.placeholderImage}>
                        <div className={styles.placeholderGlow}></div>
                    </div>
                )}
                <div className={styles.previewOverlay}>
                    <FiEye />
                </div>
            </div>

            <div className={styles.nftInfo}>
                <div className={styles.nftTitle}>{nft.name}</div>
                <div className={styles.nftDetails}>
                    <span className={styles.nftId}>#{nft.tokenId || '000'}</span>
                    <span className={styles.nftType}>{nft.type || 'Cyberpunk'}</span>
                </div>
            </div>

            <div className={styles.nftActions}>
                <button
                    className={styles.actionButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(nft.id);
                    }}
                    title="Copy Token ID"
                >
                    <FiCopy />
                </button>
                <button
                    className={styles.actionButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    title="Delete NFT"
                >
                    <FiTrash2 />
                </button>
            </div>

            <div className={styles.itemCornerTopLeft}></div>
            <div className={styles.itemCornerBottomRight}></div>
            <div className={styles.hoverGlow}></div>
        </div>
    );
};

export default NFTItem;