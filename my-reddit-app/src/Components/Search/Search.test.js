import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  it('should call onSearch with the query on form submit', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, container } = render(<Search onSearch={mockOnSearch} />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(container.querySelector('form'));
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});