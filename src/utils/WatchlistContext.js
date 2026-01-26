import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};

export const WatchlistProvider = ({ children }) => {
    const [watchlistItems, setWatchlistItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWatchlist = localStorage.getItem('ebay_watchlist');
            if (savedWatchlist) {
                try {
                    const parsed = JSON.parse(savedWatchlist);
                    if (Array.isArray(parsed)) {
                        setWatchlistItems(parsed);
                    }
                } catch (e) {
                    console.error('Failed to parse watchlist from localStorage', e);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage when watchlistItems change, but ONLY after initial load is complete
    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            localStorage.setItem('ebay_watchlist', JSON.stringify(watchlistItems));
        }
    }, [watchlistItems, isLoaded]);

    const addToWatchlist = (item) => {
        setWatchlistItems((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWatchlist = (itemId) => {
        setWatchlistItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const toggleWatchlist = (item) => {
        setWatchlistItems((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev.filter((i) => i.id !== item.id);
            }
            return [...prev, item];
        });
    };

    const isInWatchlist = (itemId) => {
        return watchlistItems.some((item) => item.id === itemId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlistItems, addToWatchlist, removeFromWatchlist, toggleWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
