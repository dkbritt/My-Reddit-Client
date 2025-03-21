import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Subreddits from './Subreddits';

jest.mock('../Subreddits/Subreddits', () => ({ onSelectedSubreddit }) => (
  <button onClick={() => onSelectedSubreddit('some-subreddit')}>some-subreddit</button>
));

describe('Subreddits Component', () => {
  const mockSubreddits = [
    { id: '1', display_name: 'some-subreddit' },
    { id: '2', display_name: 'another-subreddit' }
  ];

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render without errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { children: mockSubreddits.map(subreddit => ({ data: subreddit })) } }));
    const { getByText } = render(<Subreddits onSelectedSubreddit={jest.fn()} />);
    await waitFor(() => {
      expect(getByText(/some-subreddit/i)).toBeInTheDocument();
    });
  });

  it('should call onSelectedSubreddit when a subreddit is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { children: mockSubreddits.map(subreddit => ({ data: subreddit })) } }));
    const mockOnSelectedSubreddit = jest.fn();
    const { getByText } = render(<Subreddits onSelectedSubreddit={mockOnSelectedSubreddit} />);
    await waitFor(() => {
      const subredditButton = getByText(/some-subreddit/i);
      fireEvent.click(subredditButton);
      expect(mockOnSelectedSubreddit).toHaveBeenCalledWith('some-subreddit');
    });
  });
});