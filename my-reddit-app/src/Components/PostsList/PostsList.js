import React, { useState, useEffect } from "react";
import './PostsList.css';
import Post from "../Post/Post";

const cache = {}; // Cache object to store fetched data

const PostsList = ({ selectedSubreddit }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (cache[selectedSubreddit]) {
                setPosts(cache[selectedSubreddit]);
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const postData = data.data.children.map(child => ({
                    id: child.data.id,
                    title: child.data.title,
                    media: child.data.url,
                    vote_score: child.data.score,
                    comment_count: child.data.num_comments,
                    author: child.data.author,
                    created: child.data.created_utc,
                    subreddit: child.data.subreddit,
                }));
                cache[selectedSubreddit] = postData; // Store data in cache
                setPosts(postData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedSubreddit]);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='posts-list'>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
}

export default PostsList;