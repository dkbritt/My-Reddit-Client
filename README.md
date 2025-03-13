# Reddit Lurker

Reddit Lurker is a web application that allows users to browse and search for posts from various subreddits. Users can view post details, vote on posts, as well as vote and read comments on posts.


## Technologies Used

- **Frontend:**
  - React
  - CSS (Flexbox)
  - React Icons
- **Backend:**
  - Node.js
  - Express
  - Node-fetch
- **Other:**
  - date-fns (for date formatting)

## Features

- Browse posts from various subreddits
- Select a subreddit from a pre-decided list
- Search for posts by title
- View post details (if available) by clicking post title
- Read comments on posts by expanding/unhiding the comments button
- Vote on individual comments
- Voting on posts

## Future Work

- **Show Video Media in Posts:** Currently, the application displays images in posts. Future work includes displaying video media in posts.
- **Allow User to Enter Comments on Posts:** Enable users to add comments to posts.
- **User Authentication:** Implement user authentication to allow users to log in and interact with posts.
- **Post Creation:** Allow users to create new posts.
- **Improved UI/UX:** Enhance the user interface and user experience with better design and animations.

## How to Run the Project on Local PC

### Prerequisites

- Node.js and npm installed on your local machine

### Backend Setup
(Running this will help to avoid CORS issues)

1. Clone the repository:

```bash
git clone https://github.com/your-username/reddit-lurker.git
cd reddit-lurker/my-reddit-client-backend
```
2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node server.js
```

The backend server will run on http://localhost:5000.


### Frontend Setup

1. Navigate to frontend directory:

```bash
cd ../my-reddit-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend application will run on http://localhost:3000.



## Directory Structure
reddit-lurker/
├── my-reddit-client-backend/
│   ├── server.js
│   └── ...
├── my-reddit-app/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── HomePage/
│   │   │   │   └── HomePage.js
│   │   │   ├── Post/
│   │   │   │   └── Post.js
│   │   │   ├── PostsList/
│   │   │   │   └── PostsList.js
│   │   │   ├── Search/
│   │   │   │   └── Search.js
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── formatTimeAgo.js
│   │   └── ...
│   └── ...
└── [README.md](http://_vscodecontentref_/0)