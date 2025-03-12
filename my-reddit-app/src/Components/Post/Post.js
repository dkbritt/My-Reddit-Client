import React from 'react';
import './Post.css';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { formatNumber } from '../../utils/formatNumber';
import { FaRegCommentAlt } from "react-icons/fa";
import Voting from '../Voting/Voting';
import CommentsList from '../CommentsList.js/CommentsList';

const Post = ({ post }) => {
    const [commentsHidden, setCommentsHidden] = React.useState(true);
    const [postBodyHidden, setPostBodyHidden] = React.useState(true);

    const handleCommentHide = () => {
        setCommentsHidden(!commentsHidden);
    }

    const handlePostBodyHide = () => {
        setPostBodyHidden(!postBodyHidden);
    }

    // Function to check if the media is an image
    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i) != null;
    }

    // Function to check if the media is a video
    // const isVideo = (url) => {
    //     return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) != null;
    // }

    return (
        <div className='post-container'>
            <Voting initialVoteScore={post.vote_score} />
            <div className='post-content'>
                <div className="post-header">
                    <h3 onClick={handlePostBodyHide}>{post.title}</h3>
                    <span className='post-subreddit'>r/{post.subreddit}</span>
                </div> 
                <div className={`post-body ${postBodyHidden ? 'hidden' : 'visible'}`}>
                    <p>{post.post_body}</p>
                </div>
                {post.image && isImage(post.image) && (
                    <img src={post.image} alt='Post media' className='post-media' />
                )}
                {/* {post.video && isVideo(post.video) && (
                    <video controls className='post-media'>
                        <source src={post.video} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                )} */}
                <div className='horizontal-line'></div>
                <div className='post-details'>
                    <span className="post-author">{post.author}</span>
                    <span className="post-created">{formatTimeAgo(post.created)}</span>
                    <div className='post-comments'>
                        <FaRegCommentAlt 
                            className='icon comment-icon'
                            onClick={handleCommentHide}/>
                        <span className='comment-count'>{formatNumber(post.comment_count)}</span>
                    </div>
                </div>
                <div className={`comments-list ${commentsHidden ? 'hidden' : 'visible'}`}>
                    <CommentsList subreddit={post.subreddit} postId={post.id} />
                </div>
            </div>    
        </div>
    );
};

export default Post;