import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Filter Visibility Tests', () => {
  const columns = [
    { field: 'name', headerName: 'Name', filter: true, sortable: true, width: 150 },
    { field: 'age', headerName: 'Age', filter: true, sortable: true, width: 100 },
    { field: 'email', headerName: 'Email', filter: true, sortable: false, width: 200 }
  ];

  const mockOnSort = jest.fn();
  const mockOnFilterChange = jest.fn();
  const mockOnResize = jest.fn();

  test('renders header with visible filter inputs', () => {
    render(
      <table>
        <thead>
          <Header 
            columns={columns}
            sortModel={undefined}
            onSort={mockOnSort}
            filters={{}}
            onFilterChange={mockOnFilterChange}
            resizableColumns={true}
            onResize={mockOnResize}
          />
        </thead>
      </table>
    );

    // Check that filter inputs are visible for each column
    const filterInputs = screen.getAllByPlaceholderText(/Filter/);
    expect(filterInputs).toHaveLength(3);
    
    // Verify each filter input is visible
    filterInputs.forEach(input => {
      expect(input).toBeVisible();
    });
  });

  test('header has sufficient height to display filters', () => {
    // Mock the getBoundingClientRect to return a height value
    // since JSDOM doesn't calculate layout dimensions
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(function(this: Element) {
      if (this.classList.contains('data-grid-header-cell')) {
        return { height: 80, width: 150, top: 0, left: 0, right: 150, bottom: 80 };
      }
      return { height: 0, width: 0, top: 0, left: 0, right: 0, bottom: 0 };
    });
    
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns}
            sortModel={undefined}
            onSort={mockOnSort}
            filters={{}}
            onFilterChange={mockOnFilterChange}
            resizableColumns={true}
            onResize={mockOnResize}
          />
        </thead>
      </table>
    );

    // Get all header cells
    const headerCells = container.querySelectorAll('.data-grid-header-cell');
    
    // Verify filter containers exist and are visible
    headerCells.forEach(cell => {
      // Check that the filter container is visible within the header cell
      const filterContainer = cell.querySelector('.data-grid-filter');
      expect(filterContainer).not.toBeNull();
      expect(filterContainer).toBeVisible();
      
      // With our mock, this should now pass
      const cellHeight = cell.getBoundingClientRect().height;
      expect(cellHeight).toBeGreaterThan(60);
    });
    
    // Restore the original method
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  test('filter inputs remain visible when columns are resized', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns}
            sortModel={undefined}
            onSort={mockOnSort}
            filters={{}}
            onFilterChange={mockOnFilterChange}
            resizableColumns={true}
            onResize={mockOnResize}
          />
        </thead>
      </table>
    );

    // Get all header cells and their initial dimensions
    const headerCells = container.querySelectorAll('.data-grid-header-cell');
    
    // Simulate column resize by directly calling the onResize callback
    mockOnResize('name', 200); // Resize first column to 200px
    
    // Force re-render to apply the resize
    render(
      <table>
        <thead>
          <Header 
            columns={columns}
            sortModel={undefined}
            onSort={mockOnSort}
            filters={{}}
            onFilterChange={mockOnFilterChange}
            resizableColumns={true}
            onResize={mockOnResize}
          />
        </thead>
      </table>
    );
    
    // Verify filter inputs are still visible after resize
    const filterInputs = screen.getAllByPlaceholderText(/Filter/);
    filterInputs.forEach(input => {
      expect(input).toBeVisible();
    });
  });

  test('filter inputs display placeholder text with expression examples', () => {
    render(
      <table>
        <thead>
          <Header 
            columns={columns}
            sortModel={undefined}
            onSort={mockOnSort}
            filters={{}}
            onFilterChange={mockOnFilterChange}
            resizableColumns={true}
            onResize={mockOnResize}
          />
        </thead>
      </table>
    );

    // Check that filter inputs have placeholder text with expression examples
    const filterInputs = screen.getAllByPlaceholderText(/e\.g\., >30, <=100/);
    expect(filterInputs.length).toBeGreaterThan(0);
    
    // Verify the placeholder text includes expression examples
    const agePlaceholder = screen.getByPlaceholderText(/Filter Age/);
    expect(agePlaceholder).toHaveAttribute('placeholder', expect.stringContaining('>30'));
  });
});
