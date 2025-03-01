import React from 'react';
import { FaSearch, FaReddit } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
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
                    <h1>Subreddits</h1>
                    {/* subreddits list will go here */}
                </div>
                <div className='posts'>
                    <h1>Posts</h1>
                    {/* posts will go here */}
                </div>
            </div>
        </div>
    )
}

export default HomePage;