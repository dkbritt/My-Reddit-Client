import express from 'express';
import fetch from 'node-fetch'; // Import node-fetch
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

app.get('/api/subreddits', async (req, res) => {
    try {
        const response = await fetch('https://www.reddit.com/subreddits.json');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching subreddits:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch subreddits' });
    }
});

app.get('/api/r/:subreddit/comments/:postId', async (req, res) => {
    const { subreddit, postId } = req.params;
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`; // Correct URL construction
    try {
        console.log(`Fetching URL: ${url}`); // Log the URL being fetched
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching comments:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.get('/api/r/:subreddit.json', async (req, res) => {
    const { subreddit } = req.params;
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    try {
        console.log(`Fetching URL: ${url}`); // Log the URL being fetched
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});