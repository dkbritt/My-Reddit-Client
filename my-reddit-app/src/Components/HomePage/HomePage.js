import React, { useState } from 'react';
import { FaSearch, FaReddit } from 'react-icons/fa';
import Subreddits from '../Subreddits/Subreddits';
import Posts from '../Posts/Posts';
import './HomePage.css';

const HomePage = () => {
    
    const [selectedSubreddit, setSelectedSubreddit] = useState('Home');

    const handleSelectSubreddit = (subreddit) => {
        setSelectedSubreddit(subreddit);
    }

    return (
        <div className='home'>
            <div className='banner'>
                <div className='bannerText'>
                    <FaReddit className='icon reddit-logo' />
                    <p id='logoText'><span id='logoText-reddit'>Reddit</span>Lurker</p>
                </div>
                <form className='searchBar'>
                    <input type='text' placeholder='Search...' className='searchInput'/>
                    <button className='searchButton' type='submit'>
                        <FaSearch className='icon search-icon'/>
                    </button>
                </form>
            </div>
            <div className='pageContent'>
                <div className='subreddits'>
                    <Subreddits onSelectedSubreddit={handleSelectSubreddit} />
                </div>
                <div className='posts'>
                    <h1>Posts in r/{selectedSubreddit}</h1>
                    <Posts></Posts>
                </div>
            </div>
        </div>
    )
}

export default HomePage;