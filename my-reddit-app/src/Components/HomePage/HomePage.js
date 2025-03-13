import React, { useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import Subreddits from '../Subreddits/Subreddits';
import PostsList from '../PostsList/PostsList';
import './HomePage.css';
import Search from '../Search/Search';

const HomePage = () => {
    
    const [selectedSubreddit, setSelectedSubreddit] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectSubreddit = (subreddit) => {
        setSelectedSubreddit(subreddit);
        // console.log(subreddit);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className='home'>
            <div className='banner'>
                <div className='bannerText'>
                    <FaReddit className='icon reddit-logo' />
                    <p id='logoText'><span id='logoText-reddit'>Reddit</span>Lurker</p>
                </div>
                <div className='search'>
                    <Search onSearch={handleSearch}></Search>
                </div>
            </div>
            <div className='pageContent'>
                <div className='subreddits'>
                    <Subreddits onSelectedSubreddit={handleSelectSubreddit} />
                </div>
                <div className='posts'>
                    <PostsList selectedSubreddit={selectedSubreddit} searchQuery={searchQuery}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;