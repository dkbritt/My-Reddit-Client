import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../Subreddits/Subreddits', () => ({ onSelectedSubreddit }) => (
  <button onClick={() => onSelectedSubreddit('some-subreddit')}>some-subreddit</button>
));

describe('HomePage Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('should render without errors', () => {
    const { container } = render(<HomePage />);
    const logoText = container.querySelector('#logoText');
    expect(logoText).toBeInTheDocument();
    expect(logoText.textContent).toContain('RedditLurker');
  });

  it('should scroll to the top when subreddit changes', () => {
    const { getByText } = render(<HomePage />);
    const subredditButton = getByText(/some-subreddit/i);
    fireEvent.click(subredditButton);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});