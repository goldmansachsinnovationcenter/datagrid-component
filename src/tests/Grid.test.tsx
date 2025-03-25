import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Grid from '../components/Grid';
import { ColumnDefinition } from '../types';

describe('Grid Component', () => {
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
  ];

  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
  ];

  test('renders the grid with correct headers', () => {
    render(<Grid columns={columns} data={data} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    render(<Grid columns={columns} data={data} />);
    
    // Check for the data in the rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Count the rows (excluding header row)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3); // 2 data rows + 1 header row
  });

  test('handles row click events', () => {
    const onRowClick = jest.fn();
    render(<Grid columns={columns} data={data} onRowClick={onRowClick} />);
    
    // Click on the first row
    const rows = screen.getAllByRole('row');
    fireEvent.click(rows[1]); // Index 1 because index 0 is the header row
    
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  test('applies selected class to clicked row', () => {
    render(<Grid columns={columns} data={data} />);
    
    // Click on the first row
    const rows = screen.getAllByRole('row');
    fireEvent.click(rows[1]); // Index 1 because index 0 is the header row
    
    // Check that the row has the selected class
    expect(rows[1]).toHaveClass('data-grid-row-selected');
    expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  });
});
