import './Comment.css';
import React from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import Voting from '../Voting/Voting';

const Comment = ({ comment }) => {
    return (
        <div className='comment-container'>
            <Voting className='comment-voting' initialVoteScore={comment.score} size='smaller' />
            <div className='comment-details'>
                <div className='comment-creator-details'>
                    <span className='comment-author'>{comment.author}</span>
                    <span className='comment-created'>{formatTimeAgo(comment.created)}</span> {/* Pass Unix timestamp directly */}
                </div>
                <div className='comment-body'>{comment.body}</div>
            </div>
        </div>
    );
};

export default Comment;