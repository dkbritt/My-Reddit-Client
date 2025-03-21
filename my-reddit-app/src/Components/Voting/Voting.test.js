import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Voting from './Voting';

describe('Voting Component', () => {
  it('should render without errors', () => {
    const { getByText } = render(<Voting initialVoteScore={10} />);
    expect(getByText('10')).toBeInTheDocument();
  });

  it('should increment vote score when upvote button is clicked', () => {
    const { getByText, container } = render(<Voting initialVoteScore={10} />);
    const upvoteButton = container.querySelector('.vote-button.upvote');
    fireEvent.click(upvoteButton);
    expect(getByText('11')).toBeInTheDocument();
  });

  it('should decrement vote score when downvote button is clicked', () => {
    const { getByText, container } = render(<Voting initialVoteScore={10} />);
    const downvoteButton = container.querySelector('.vote-button.downvote');
    fireEvent.click(downvoteButton);
    expect(getByText('9')).toBeInTheDocument();
  });
});