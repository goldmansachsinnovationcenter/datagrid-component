import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from '../components/Grid';
import { ColumnDefinition } from '../types';

describe('Grid Integration Tests', () => {
  // Sample data for testing
  const testData = [
    { id: 1, name: 'John Doe', age: 30, isActive: true },
    { id: 2, name: 'Jane Smith', age: 25, isActive: false },
    { id: 3, name: 'Bob Johnson', age: 45, isActive: true },
    { id: 4, name: 'Alice Williams', age: 28, isActive: true },
    { id: 5, name: 'Charlie Brown', age: 33, isActive: false },
  ];

  // Column definitions
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number', sortable: true },
    { field: 'isActive', headerName: 'Status', width: 120, type: 'boolean' },
  ];

  test('renders grid with correct number of rows and columns', () => {
    const { container } = render(
      <Grid columns={columns} data={testData} />
    );
    
    // Check headers
    const headerCells = container.querySelectorAll('th.data-grid-header-cell');
    expect(headerCells).toHaveLength(columns.length);
    
    // Check rows
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(testData.length);
    
    // Check cells in first row
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells).toHaveLength(columns.length);
  });

  test('sorts data when header is clicked', () => {
    const { container } = render(
      <Grid columns={columns} data={testData} sortable={true} />
    );
    
    // Find the age header and click it
    const ageHeader = Array.from(container.querySelectorAll('th')).find(
      th => th.textContent === 'Age'
    );
    
    if (ageHeader) {
      fireEvent.click(ageHeader);
      
      // Check if the first row contains the youngest person (Jane Smith, 25)
      const firstRowAfterSort = container.querySelector('tbody tr');
      const cells = firstRowAfterSort?.querySelectorAll('td');
      
      expect(cells?.[0].textContent).toBe('2'); // ID of Jane Smith
      expect(cells?.[1].textContent).toBe('Jane Smith');
      expect(cells?.[2].textContent).toBe('25');
      
      // Click again to sort in descending order
      fireEvent.click(ageHeader);
      
      // Check if the first row contains the oldest person (Bob Johnson, 45)
      const firstRowAfterSecondSort = container.querySelector('tbody tr');
      const cellsAfterSecondSort = firstRowAfterSecondSort?.querySelectorAll('td');
      
      expect(cellsAfterSecondSort?.[0].textContent).toBe('3'); // ID of Bob Johnson
      expect(cellsAfterSecondSort?.[1].textContent).toBe('Bob Johnson');
      expect(cellsAfterSecondSort?.[2].textContent).toBe('45');
    }
  });

  test('selects row when clicked', () => {
    const handleRowClick = jest.fn();
    const { container } = render(
      <Grid 
        columns={columns} 
        data={testData} 
        onRowClick={handleRowClick}
        selectionMode="single"
      />
    );
    
    // Click the first row
    const firstRow = container.querySelector('tbody tr');
    if (firstRow) {
      fireEvent.click(firstRow);
      
      // Check if the row has the selected class
      expect(firstRow).toHaveClass('data-grid-row-selected');
      
      // Check if the callback was called with the correct data
      expect(handleRowClick).toHaveBeenCalledWith(testData[0], 0);
    }
  });

  test('paginates data correctly', () => {
    const { container } = render(
      <Grid 
        columns={columns} 
        data={testData} 
        pagination={true}
        pageSize={2}
      />
    );
    
    // Initially should show first 2 rows
    let rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);
    
    // Find and click the next page button
    const paginationButtons = container.querySelectorAll('.data-grid-pagination-button');
    const nextButton = paginationButtons[paginationButtons.length - 1];
    
    fireEvent.click(nextButton);
    
    // Should now show the next 2 rows
    rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);
    
    // Check if the first row on page 2 is the third item in the data
    const firstRowOnPage2 = rows[0];
    const cells = firstRowOnPage2.querySelectorAll('td');
    
    expect(cells[0].textContent).toBe('3'); // ID of the third item
    expect(cells[1].textContent).toBe('Bob Johnson');
  });

  test('filters data correctly', () => {
    const { container } = render(
      <Grid 
        columns={columns} 
        data={testData} 
        filterable={true}
      />
    );
    
    // Simulate filtering for active users
    const filterInput = container.querySelector('input[placeholder="Filter..."]');
    if (filterInput) {
      fireEvent.change(filterInput, { target: { value: 'true' } });
      
      // Should show only active users (3 in our test data)
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(3);
    }
  });

  test('handles cell editing', () => {
    const handleCellValueChange = jest.fn();
    const { container } = render(
      <Grid 
        columns={columns.map(col => ({ ...col, editable: true }))} 
        data={testData} 
        onCellValueChange={handleCellValueChange}
      />
    );
    
    // Find a cell and click to edit
    const nameCell = container.querySelector('td[data-field="name"]');
    if (nameCell) {
      fireEvent.click(nameCell);
      
      // Should show an input
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      
      // Change the value
      if (input) {
        fireEvent.change(input, { target: { value: 'New Name' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        // Check if the callback was called with the correct data
        expect(handleCellValueChange).toHaveBeenCalledWith(
          'New Name', 
          'name', 
          expect.objectContaining({ id: expect.any(Number) })
        );
      }
    }
  });

  test('handles large datasets with virtualization', () => {
    // Generate large dataset
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
      isActive: Math.random() > 0.5
    }));
    
    const { container } = render(
      <Grid 
        columns={columns} 
        data={largeData} 
        virtualized={true}
        rowHeight={40}
        maxHeight={400}
      />
    );
    
    // Should not render all 1000 rows, but only those visible in the viewport
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeLessThan(largeData.length);
    expect(rows.length).toBeGreaterThan(0);
  });

  test('resizes columns when drag handle is used', () => {
    const { container } = render(
      <Grid 
        columns={columns} 
        data={testData} 
        resizableColumns={true}
      />
    );
    
    // Find the resize handle for the first column
    const firstHeader = container.querySelector('th');
    const resizeHandle = firstHeader?.querySelector('.column-resize-handle');
    
    if (resizeHandle) {
      // Get initial width
      const initialWidth = firstHeader?.getBoundingClientRect().width;
      
      // Simulate drag to resize
      fireEvent.mouseDown(resizeHandle);
      fireEvent.mouseMove(document, { clientX: 200 });
      fireEvent.mouseUp(document);
      
      // Get new width
      const newWidth = firstHeader?.getBoundingClientRect().width;
      
      // Width should have changed
      expect(newWidth).not.toBe(initialWidth);
    }
  });

  test('renders custom cell content', () => {
    // Add a column with custom cell renderer
    const columnsWithCustomRenderer = [
      ...columns,
      {
        field: 'custom',
        headerName: 'Custom',
        renderCell: () => <button data-testid="custom-button">Click Me</button>
      }
    ];
    
    const dataWithCustom = testData.map(item => ({ ...item, custom: 'custom value' }));
    
    render(
      <Grid 
        columns={columnsWithCustomRenderer} 
        data={dataWithCustom}
      />
    );
    
    // Check if custom button is rendered
    const customButtons = screen.getAllByTestId('custom-button');
    expect(customButtons.length).toBe(dataWithCustom.length);
    
    // Check if button is clickable
    const buttonClickHandler = jest.fn();
    customButtons[0].addEventListener('click', buttonClickHandler);
    fireEvent.click(customButtons[0]);
    expect(buttonClickHandler).toHaveBeenCalled();
  });
});
