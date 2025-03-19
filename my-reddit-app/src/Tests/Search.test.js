import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './../Components/Search/Search';

describe('Search Component', () => {
  it('should render without errors', () => {
    const { getByPlaceholderText } = render(<Search onSearch={jest.fn()} />);
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('should update state on input change', () => {
    const { getByPlaceholderText } = render(<Search onSearch={jest.fn()} />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  it('should call onSearch with the query on form submit', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<Search onSearch={mockOnSearch} />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(getByRole('form'));
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});