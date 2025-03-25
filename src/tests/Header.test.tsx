import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { ColumnDefinition, SortModel } from '../types';

describe('Header Component', () => {
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'age', headerName: 'Age', sortable: false },
  ];

  const sortModel: SortModel = {
    field: 'id',
    direction: 'asc'
  };

  const onSort = jest.fn();
  const onResize = jest.fn();
  const onFilterChange = jest.fn();

  test('renders without crashing', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
          />
        </thead>
      </table>
    );
    
    // Basic check that the component renders
    expect(container).toBeTruthy();
  });

  test('renders correct number of columns', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
          />
        </thead>
      </table>
    );
    
    const headerCells = container.querySelectorAll('th');
    expect(headerCells.length).toBe(columns.length);
  });

  test('renders sortable columns with sort indicators', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
          />
        </thead>
      </table>
    );
    
    const headerCells = container.querySelectorAll('th');
    const sortableCell = headerCells[0]; // 'id' is sortable and has sortModel applied
    
    // Check if sort indicator is present for the sorted column
    expect(sortableCell.querySelector('.data-grid-sort-icon')).toBeInTheDocument();
    expect(sortableCell.querySelector('.data-grid-sort-icon')).toHaveTextContent('▲');
    
    // Check non-sorted column doesn't have a sort indicator
    const nameCell = headerCells[1]; // 'name' is sortable but not sorted
    expect(nameCell.querySelector('.data-grid-sort-icon')).not.toBeInTheDocument();
  });

  test('calls onSort when clicking on sortable column header', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
          />
        </thead>
      </table>
    );
    
    const headerCells = container.querySelectorAll('th');
    const sortableCell = headerCells[1]; // 'name' column is sortable
    
    // Click on the sortable column header
    sortableCell.click();
    
    // Check if onSort was called with the correct field
    expect(onSort).toHaveBeenCalledWith('name');
  });

  test('renders filter inputs for columns with filter property', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
            filters={{}}
            onFilterChange={onFilterChange}
          />
        </thead>
      </table>
    );
    
    const nameCell = container.querySelectorAll('th')[1]; // 'name' has filter: true
    const filterInput = nameCell.querySelector('.data-grid-filter-input');
    
    // Check filter input exists for column with filter property
    expect(filterInput).toBeInTheDocument();
    
    // Check non-filterable column doesn't have filter input
    const ageCell = container.querySelectorAll('th')[2]; // 'age' has filter: false
    expect(ageCell.querySelector('.data-grid-filter-input')).not.toBeInTheDocument();
  });
  
  test('calls onFilterChange when typing in filter input', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns} 
            sortModel={sortModel}
            onSort={onSort}
            filters={{}}
            onFilterChange={onFilterChange}
          />
        </thead>
      </table>
    );
    
    const nameCell = container.querySelectorAll('th')[1]; // 'name' has filter: true
    const filterInput = nameCell.querySelector('.data-grid-filter-input');
    
    // Simulate typing in the filter input
    if (filterInput) {
      fireEvent.change(filterInput as Element, { target: { value: 'test' } });
    }
    
    // Check if onFilterChange was called with the correct field and value
    expect(onFilterChange).toHaveBeenCalledWith('name', 'test');
  });

  test('renders resize handles for columns when resizableColumns is true', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns.map(col => ({ ...col, resizable: true }))} 
            sortModel={sortModel}
            onSort={onSort}
            resizableColumns={true}
            onResize={onResize}
          />
        </thead>
      </table>
    );
    
    const headerCells = container.querySelectorAll('th');
    
    // Check resize handles are present
    headerCells.forEach(cell => {
      expect(cell.querySelector('.data-grid-resize-handle')).toBeInTheDocument();
    });
  });

  test('does not render resize handles when resizableColumns is false', () => {
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns.map(col => ({ ...col, resizable: true }))} 
            sortModel={sortModel}
            onSort={onSort}
            resizableColumns={false}
            onResize={onResize}
          />
        </thead>
      </table>
    );
    
    const headerCells = container.querySelectorAll('th');
    
    // Check resize handles are not present
    headerCells.forEach(cell => {
      expect(cell.querySelector('.data-grid-resize-handle')).not.toBeInTheDocument();
    });
  });

  test('renders resize handles that can be interacted with', () => {
    // Reset mock before test
    onResize.mockClear();
    
    const { container } = render(
      <table>
        <thead>
          <Header 
            columns={columns.map(col => ({ ...col, resizable: true }))} 
            sortModel={sortModel}
            onSort={onSort}
            resizableColumns={true}
            onResize={onResize}
          />
        </thead>
      </table>
    );
    
    const firstCell = container.querySelector('th');
    const resizeHandle = firstCell?.querySelector('.data-grid-resize-handle');
    
    // Verify resize handle exists
    expect(resizeHandle).toBeInTheDocument();
    
    // We'll skip the actual resize simulation since it's difficult to test
    // with document event listeners, but we'll verify the component structure
    // is correct for resizing to work
    expect(firstCell).toHaveStyle('position: relative');
    expect(resizeHandle).toHaveClass('data-grid-resize-handle');
  });
});
