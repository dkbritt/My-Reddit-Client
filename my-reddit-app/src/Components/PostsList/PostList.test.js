import React from 'react';
import { render, waitFor } from '@testing-library/react';
import PostsList from './PostsList';
import Post from '../Post/Post';

jest.mock('../Post/Post', () => () => <div>Mocked Post</div>);

describe('PostsList Component', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'Test Post 1',
      image: 'http://example.com/image1.jpg',
      video: null,
      vote_score: 10,
      comment_count: 5,
      author: 'test_author_1',
      created: 1616161616,
      subreddit: 'test_subreddit_1',
      post_body: 'This is a test post body 1.'
    },
    {
      id: '2',
      title: 'Test Post 2',
      image: null,
      video: 'http://example.com/video2.mp4',
      vote_score: 20,
      comment_count: 10,
      author: 'test_author_2',
      created: 1616161617,
      subreddit: 'test_subreddit_2',
      post_body: 'This is a test post body 2.'
    }
  ];

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render without errors', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { children: mockPosts.map(post => ({ data: post })) } }));
    const { getByText } = render(<PostsList selectedSubreddit="test" searchQuery="" />);
    expect(getByText('Loading posts...')).toBeInTheDocument();
  });

  it('should render the correct number of Post components', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { children: mockPosts.map(post => ({ data: post })) } }));
    const { getAllByText } = render(<PostsList selectedSubreddit="test" searchQuery="" />);
    await waitFor(() => {
      expect(getAllByText('Mocked Post').length).toBe(mockPosts.length);
    });
  });
});q