import './CommentsList.css';
import React, {useState, useEffect} from 'react';
// import { formatTimeAgo } from '../../utils/formatTimeAgo';
// import Comment from '../Comment/Comment';

const cache = {}; // Simple in-memory cache

const CommentsList = ({ subreddit, postId }) => {
    
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            const cacheKey = `${subreddit}-${postId}`;
            if (cache[cacheKey]) {
                setComments(cache[cacheKey]);
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch(`http://localhost:5000/api/r/${subreddit}/comments/${postId}.json`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const commentData = data[1].data.children.map(child => ({
                    author: child.data.author,
                    body: child.data.body,
                    created: child.data.created_utc,
                }));
                cache[cacheKey] = commentData; // Store data in cache
                setComments(commentData);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to load comments');
                setLoading(false);
            }
        }

        fetchComments();
    }
    , [subreddit, postId]);

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    
    return (
        <div className='comments-list'>
            {comments.map((comment, index) => (
                <div key={index} className='comment-container'>
                    <div className='comment-content'>
                        {/* <Comment comment={comment.body} author={comment.author} created={comment.created}/> */}
                        <span className='comment-author'>{comment.author}</span>
                        {/* <span className='comment-created'>{formatTimeAgo(comment.created)}</span> */}
                        <div className='comment-text'>{comment.body}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentsList;