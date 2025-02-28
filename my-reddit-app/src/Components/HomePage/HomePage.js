import React from 'react';

const HomePage = () => {
    return (
        <div className='home'>
            <div className='banner'>
                <img src='' alt="RedditLurker" id='logo' />
                <p id='logoText'>RedditLurker</p>
                {/* future search bar */}
            </div>
            <div className='subreddits'>
                <h1>SUBREDDITS</h1>
                {/* subreddits list will go here */}
            </div>
            <div className='posts'>
                <h1>POSTS</h1>
                {/* posts will go here */}
            </div>
        </div>
    )
}

export default HomePage;