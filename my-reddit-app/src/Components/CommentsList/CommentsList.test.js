import React from 'react';
import { render } from '@testing-library/react';
import CommentsList from './CommentsList';

describe('CommentsList Component', () => {
  it('should render without errors', () => {
    const { getByText } = render(<CommentsList subreddit="test" postId="1" />);
    expect(getByText(/Loading comments.../i)).toBeInTheDocument();
  });

  // Add more tests as needed
});