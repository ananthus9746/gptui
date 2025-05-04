import React, { useState } from 'react';
import styles from './Gallery.module.css';

import preview1 from '../../assets/previewImg/preview1.png';
import preview2 from '../../assets/previewImg/preview2.png';
import preview3 from '../../assets/previewImg/preview3.png';
import preview4 from '../../assets/previewImg/preview4.png';
import preview5 from '../../assets/previewImg/preview5.png';
import preview6 from '../../assets/previewImg/preview6.png';
import preview7 from '../../assets/previewImg/preview7.png';
import preview8 from '../../assets/previewImg/preview8.png';
import preview9 from '../../assets/previewImg/preview9.png';
import preview10 from '../../assets/previewImg/preview10.png';
import preview11 from '../../assets/previewImg/preview11.png';
import preview12 from '../../assets/previewImg/preview12.png';
import preview13 from '../../assets/previewImg/preview13.png';

const Gallery = () => {
    // Sample gallery items - replace with your actual data
    const initialGalleryItems = [
        { id: 1, title: 'NFT #1', image: preview1, creator: 'Artist One', price: '0.5 ETH' },
        { id: 2, title: 'NFT #2', image: preview2, creator: 'Artist Two', price: '0.8 ETH' },
        { id: 3, title: 'NFT #3', image: preview3, creator: 'Artist Three', price: '1.2 ETH' },
        { id: 4, title: 'NFT #4', image: preview4, creator: 'Artist Four', price: '0.3 ETH' },
        { id: 5, title: 'NFT #5', image: preview5, creator: 'Artist Five', price: '2.0 ETH' },
        { id: 6, title: 'NFT #6', image: preview6, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 7, title: 'NFT #6', image: preview7, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 8, title: 'NFT #6', image: preview8, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 6, title: 'NFT #6', image: preview6, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 7, title: 'NFT #6', image: preview7, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 8, title: 'NFT #6', image: preview8, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 9, title: 'NFT #6', image: preview9, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 10, title: 'NFT #6', image: preview10, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 11, title: 'NFT #6', image: preview11, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 12, title: 'NFT #6', image: preview12, creator: 'Artist Six', price: '0.7 ETH' },
        { id: 13, title: 'NFT #6', image: preview13, creator: 'Artist Six', price: '0.7 ETH' }

    ];

    // State to track gallery items and currently regenerating item
    const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
    const [regeneratingId, setRegeneratingId] = useState(null);

    // Function to regenerate an NFT image
    const regenerateImage = (id) => {
        setRegeneratingId(id);

        // Simulate image regeneration with timeout
        setTimeout(() => {
            // In a real app, you would fetch a new image or generate one
            // Here we're just adding a timestamp to force image refresh
            setGalleryItems(items =>
                items.map(item =>
                    item.id === id
                        ? { ...item, image: preview12 }
                        : item
                )
            );
            setRegeneratingId(null);
        }, 1000);
    };

    return (
        <div className={styles.galleryContainer}>
            <h2 className={styles.galleryTitle}>NFT Gallery</h2>
            <div className={styles.galleryGrid}>
                {galleryItems.map(item => (
                    <div key={item.id} className={styles.galleryItem}>
                        <div className={styles.imageContainer}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={`${styles.itemImage} ${regeneratingId === item.id ? styles.regenerating : ''}`}
                            />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <p className={styles.itemCreator}>By {item.creator}</p>
                            <p className={styles.itemPrice}>{item.price}</p>
                            <button
                                className={styles.regenerateButton}
                                onClick={() => regenerateImage(item.id)}
                                disabled={regeneratingId === item.id}
                            >
                                Regenerate
                                {regeneratingId === item.id && (
                                    <span className={styles.loadingIndicator}>...</span>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;