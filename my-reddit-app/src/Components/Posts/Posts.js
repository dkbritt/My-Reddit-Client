import React, { useState, useEffect } from "react";
import './Posts.css';
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { formatNumber } from '../../utils/formatNumber';
import { FaRegCommentAlt } from "react-icons/fa";

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
                    title: child.data.title,
                    media: child.data.url_overridden_by_dest,
                    vote_score: child.data.score,
                    comment_count: child.data.num_comments,
                    author: child.data.author,
                    created: child.data.created_utc,
                    subreddit: child.data.subreddit,
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
                <div key={index} className='post-container'>
                    
                    <div className='post-votes'>
                        {/* Voting Component */}
                    </div>
                    <div className='post-content'>
                        <div className="post-header">
                            <h3>{post.title}</h3>
                            <span className='post-subreddit'>r/{post.subreddit}</span>
                        </div> 
                        {/* If the post has an image, post the image */}
                        {post.media && (
                            <img src={post.media} alt='Post media' className='post-media' />
                        )}
                        <div className='horizontal-line'></div>
                        <div className='post-details'>
                            <span className="post-author">{post.author}</span>
                            <span className="post-created">{formatTimeAgo(post.created)}</span>
                            <div className='post-comments'>
                                <FaRegCommentAlt className='icon comment-icon' />
                                <span className='comment-count'>{formatNumber(post.comment_count)}</span>
                            </div>
                        </div>
                    </div>    
                </div>
            ))}
        </div>
    );

}


export default Posts;
