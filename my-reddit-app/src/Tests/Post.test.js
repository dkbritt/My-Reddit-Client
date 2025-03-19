import React from 'react';
import { render } from '@testing-library/react';
import Post from './../Components/Post';

describe('Post Component', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    image: 'http://example.com/image.jpg',
    video: 'http://example.com/video.mp4',
    vote_score: 10,
    comment_count: 5,
    author: 'test_author',
    created: 1616161616,
    subreddit: 'test_subreddit',
    post_body: 'This is a test post body.'
  };

  it('should render without errors', () => {
    const { getByText } = render(<Post post={mockPost} />);
    expect(getByText('Test Post')).toBeInTheDocument();
  });

  it('should display the post image if available', () => {
    const { getByAltText } = render(<Post post={mockPost} />);
    expect(getByAltText('Post media')).toHaveAttribute('src', mockPost.image);
  });

  it('should display the post video if available', () => {
    const { getByRole } = render(<Post post={{ ...mockPost, image: null }} />);
    expect(getByRole('video')).toHaveAttribute('src', mockPost.video);
  });

  it('should display the post author', () => {
    const { getByText } = render(<Post post={mockPost} />);
    expect(getByText('test_author')).toBeInTheDocument();
  });

  it('should display the post body', () => {
    const { getByText } = render(<Post post={mockPost} />);
    expect(getByText('This is a test post body.')).toBeInTheDocument();
  });
});