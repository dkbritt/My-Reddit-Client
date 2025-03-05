import './Voting.css';
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import React, { useState, useEffect } from 'react';


const Voting = ({ initialVoteScore }) => {
    const [voteScore, setVoteScore] = useState(initialVoteScore);
    const [hasVoted, setHasVoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);
    const [hasUpvoted, setHasUpvoted] = useState(false);

    useEffect(() => {
        setVoteScore(initialVoteScore);
    }, [initialVoteScore]);

    const handleUpvote = () => {
        // Case if user has not voted yet
        if (!hasVoted) {
            setVoteScore(voteScore + 1);
            setHasVoted(true);
            setHasUpvoted(true);
            setHasDownvoted(false);
        } 
        // case if has already upvoted -- we want to remove the upvote and restore the vote score
        else if (hasVoted && hasUpvoted) {
            setVoteScore(voteScore - 1);
            setHasVoted(false);
            setHasUpvoted(false);
            setHasDownvoted(false);
        } 
        //  case if the user has already voted and it was a downvote -- we want to remove the downvote and add an upvote
        else if (hasDownvoted) {
            setVoteScore(voteScore + 2);
            setHasDownvoted(false);
            setHasUpvoted(true);
            setHasVoted(true);
        }
    };

    const handleDownvote = () => {
        // case if the user has not yet voted
        if (!hasVoted) {
            setVoteScore(voteScore - 1);
            setHasVoted(true);
            setHasDownvoted(true);
            setHasUpvoted(false);
        } 
        // case if the user has already downvoted -- we want to remove the downvote and restore the vote score
        else if (hasVoted && hasDownvoted) {
            setVoteScore(voteScore + 1);
            setHasDownvoted(false);
            setHasUpvoted(false);
            setHasVoted(false);
        } 
        // case if the user has already voted and it was an upvote -- we want to remove the upvote and add a downvote
        else if (hasUpvoted) {
            setVoteScore(voteScore - 2);
            setHasUpvoted(false);
            setHasDownvoted(true);
            setHasVoted(true);
        }
    };

    return (
        <div className='voting-container'>
            <TiArrowUpOutline
                className={`vote-button upvote ${hasUpvoted ? 'upActive' : ''}`}
                onClick={handleUpvote}/>
            <span className={`vote-score ${hasUpvoted ? 'upActive' : ''} ${hasDownvoted ? 'downActive' : ''}`}>{voteScore}</span>
            <TiArrowDownOutline
                className={`vote-button downvote ${hasDownvoted ? 'downActive' : ''}`}
                onClick={handleDownvote}/>
        </div>
    );
}



export default Voting;