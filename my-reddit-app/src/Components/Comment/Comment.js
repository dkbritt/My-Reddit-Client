import './Comment.css';
import React from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo';


const Comment = ({ comment }) => {
    return (
        <div className='comment-container'>
            <div className='comment-author'>{comment.author}</div>
            <div className='comment-created'>{formatTimeAgo(comment.created)}</div>
            <div className='comment-body'>{comment.body}</div>
        </div>
    );
};

export default Comment;