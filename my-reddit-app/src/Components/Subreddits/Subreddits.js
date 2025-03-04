// Importing React and necessary hooks from the 'react' library
import React, { useState, useEffect } from 'react';

// Importing the CSS file for styling the Subreddits component
import './Subreddits.css';

// Defining the Subreddits functional component
const Subreddits = ({ onSelectedSubreddit }) => {
    // Declaring a state variable 'subreddits' and a function 'setSubreddits' to update it
    // Initializing 'subreddits' as an empty array
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Using the useEffect hook to perform side effects in the component
    // The empty dependency array [] means this effect runs only once when the component mounts
    useEffect(() => {
        // Fetching data from the Reddit API endpoint for subreddits
        fetch('https://www.reddit.com/subreddits.json')
            .then(response => response.json()) // Parsing the JSON response
            .then(data => {
                // Mapping over the fetched data to extract relevant subreddit information
                const subredditData = data.data.children.map(child => ({
                    name: child.data.display_name, // Subreddit name
                    header_img: child.data.header_img || 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png' // Subreddit header image or default image if none exists
                }));
                // Updating the 'subreddits' state with the fetched subreddit data
                setSubreddits(subredditData);
                setLoading(false);
            })
            // Catching and logging any errors that occur during the fetch operation
            .catch(error => {
                console.error('Error fetching subreddits:', error);
                setError('Failed to load subreddits');
                setLoading(false);
            });
    }, []); // Empty dependency array to run the effect only once

    const handleSelectedSubreddit = (subreddit) => {
        setSelectedSubreddit(subreddit);
        onSelectedSubreddit(subreddit);
    }

    // Returning a loading message if the data is still being fetched
    if (loading) {
        return <div>Loading subreddits...</div>;
    }

    // Returning an error message if there was an error during the fetch operation
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Returning the JSX to render the component
    return (
        // Main container div with a class name for styling
        <div className='subreddits-list'>
            {/* Heading for the subreddits list */}
            <h1>Subreddits</h1>
            {/* Unordered list to display the subreddits */}
            <ul>
                {/* Mapping over the 'subreddits' state to render each subreddit as a list item */}
                {subreddits.map((subreddit, index) => (
                    // Each list item has a unique key based on the index
                    <li 
                        key={index}
                        onClick={() => handleSelectedSubreddit(subreddit.name)}
                        className={selectedSubreddit === subreddit.name ? 'selected' : ''}>
                        {/* Subreddit header image */}
                        <img src={subreddit.header_img} alt={`${subreddit.name} header`} className='subreddit-header-img' />
                        {/* Subreddit name */}
                        <p>{subreddit.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exporting the Subreddits component as the default export
export default Subreddits;