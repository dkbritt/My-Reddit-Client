import React from 'react';
import { render } from '@testing-library/react';
import Comment from './Comment';

describe('Comment Component', () => {
  const mockComment = {
    author: 'test_author',
    body: 'This is a test comment',
    created: 1616161616,
  };

  it('should render without errors', () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    expect(getByText('test_author')).toBeInTheDocument();
    expect(getByText('This is a test comment')).toBeInTheDocument();
  });

  // Add more tests as needed
});