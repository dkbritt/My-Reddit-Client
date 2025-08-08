import React, { useState, useEffect } from 'react';
import './Subreddits.css';

const cache = {}; // Simple in-memory cache

const Subreddits = ({ onSelectedSubreddit }) => {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubreddits = async () => {
            if (cache['subreddits']) {
                setSubreddits(cache['subreddits']);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://my-reddit-client-production.up.railway.app/api/subreddits');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const subredditData = data.data.children.map(child => ({
                    name: child.data.display_name,
                    icon_img: child.data.icon_img || 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png'
                }));
                cache['subreddits'] = subredditData; // Store data in cache
                setSubreddits(subredditData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subreddits:', error);
                setError('Failed to load subreddits');
                setLoading(false);
            }
        };

        fetchSubreddits();
    }, []);

    const handleSelectedSubreddit = (subreddit) => {
        setSelectedSubreddit(subreddit);
        onSelectedSubreddit(subreddit);
    }

    if (loading) {
        return <div>Loading subreddits...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='subreddits-list'>
            <h1>Subreddits</h1>
            <ul>
                {subreddits.map((subreddit, index) => (
                    <li 
                        key={index}
                        onClick={() => handleSelectedSubreddit(subreddit.name)}
                        className={selectedSubreddit === subreddit.name ? 'selected' : ''}>
                        <img src={subreddit.icon_img} alt={`${subreddit.name} icon`} className='subreddit-icon-img' />
                        <p>r/{subreddit.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subreddits;