import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 5000;

// Replace these with your Reddit app credentials
const CLIENT_ID = 'MifxT0giEnwepVh-FnMgRA';
const CLIENT_SECRET = '8oCq5KqIEM92Iwie0FfdtHPKciafiw';

// Function to get OAuth token from Reddit
async function getRedditToken() {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'RedditLurker/1.0 (by /u/guest)'
        },
        body: 'grant_type=client_credentials'
    });
    const text = await response.text();
    console.log('Reddit token response:', text);
    const data = await response.json();
    return data.access_token;
}

app.use(cors());

// Get subreddits
app.get('/api/subreddits', async (req, res) => {
    try {
        const token = await getRedditToken();
        const response = await fetch('https://oauth.reddit.com/subreddits.json', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'RedditLurker/1.0 (by /u/guest)'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching subreddits:', error);
        res.status(500).json({ error: 'Failed to fetch subreddits' });
    }
});

// Get comments for a post
app.get('/api/r/:subreddit/comments/:postId', async (req, res) => {
    const { subreddit, postId } = req.params;
    const url = `https://oauth.reddit.com/r/${subreddit}/comments/${postId}.json`;
    try {
        const token = await getRedditToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'RedditLurker/1.0 (by /u/guest)'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Get posts from a subreddit
app.get('/api/r/:subreddit.json', async (req, res) => {
    const { subreddit } = req.params;
    const url = `https://oauth.reddit.com/r/${subreddit}.json`;
    try {
        const token = await getRedditToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'RedditLurker/1.0 (by /u/guest)'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});