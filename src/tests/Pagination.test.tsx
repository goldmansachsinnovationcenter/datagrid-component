import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  test('renders pagination with correct number of pages', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    // Should have 10 pages (100 items / 10 per page)
    const pageButtons = container.querySelectorAll('.data-grid-pagination-button');
    
    // +2 for prev/next buttons
    expect(pageButtons.length).toBe(12);
  });

  test('highlights current page', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    const activeButton = container.querySelector('.data-grid-pagination-button.active');
    expect(activeButton).toHaveTextContent('3');
  });

  test('disables previous button on first page', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const prevButton = container.querySelector('.data-grid-pagination-button:first-child');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={10}
        onPageChange={onPageChange}
      />
    );

    const buttons = container.querySelectorAll('.data-grid-pagination-button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange when page button is clicked', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    // Click on page 3
    const pageButtons = container.querySelectorAll('.data-grid-pagination-button');
    fireEvent.click(pageButtons[3]); // 0=prev, 1=1, 2=2, 3=3

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange when next button is clicked', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    const buttons = container.querySelectorAll('.data-grid-pagination-button');
    const nextButton = buttons[buttons.length - 1];
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  test('calls onPageChange when previous button is clicked', () => {
    const { container } = render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    const prevButton = container.querySelector('.data-grid-pagination-button:first-child');
    if (prevButton) fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('shows ellipsis for large number of pages', () => {
    const { container } = render(
      <Pagination
        totalItems={200}
        itemsPerPage={10}
        currentPage={10}
        onPageChange={onPageChange}
        siblingCount={1}
      />
    );

    const ellipsis = container.querySelectorAll('.data-grid-pagination-ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  test('does not render when there is only one page', () => {
    const { container } = render(
      <Pagination
        totalItems={10}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
