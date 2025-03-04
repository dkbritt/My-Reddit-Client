import React, { useState, useEffect } from "react";
import './Posts.css';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetch('https://www.reddit.com/r/popular.json')
            .then(response => response.json())
            .then(data => {
                const postData = data.data.children.map(child => ({
                    title: child.data.title
                }));
                setPosts(postData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // const handlePostClick = (post) => {
    //     setSelectedPost(post);
    // }

    return (
        <div className='posts-list'>
            {posts.map((post, index) => (
                <div key={index} className='post'>
                    <div className='post-votes'>
                        <FaArrowUp className='icon upvote-icon' />
                        <span className='vote-count'>0</span>
                        <FaArrowDown className='icon downvote-icon' />
                    </div>
                    <div className='post-content'>
                        <h3>{post.title}</h3>
                        <FaComment className='icon comment-icon' />
                    </div>
                </div>
            ))}
        </div>
    );

}


export default Posts;