import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from '../components/Cell';
import { ColumnDefinition } from '../types';

describe('Cell Component', () => {
  const rowData = { id: 1, name: 'John Doe', age: 30, isActive: true, joinDate: new Date('2022-01-01') };
  
  test('renders string value correctly', () => {
    const column: ColumnDefinition = { field: 'name', headerName: 'Name' };
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={rowData.name} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  test('renders number value correctly', () => {
    const column: ColumnDefinition = { field: 'age', headerName: 'Age', type: 'number' };
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={rowData.age} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    expect(screen.getByText('30')).toBeInTheDocument();
  });
  
  test('renders boolean value correctly', () => {
    const column: ColumnDefinition = { field: 'isActive', headerName: 'Status', type: 'boolean' };
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={rowData.isActive} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });
  
  test('renders date value correctly', () => {
    const column: ColumnDefinition = { field: 'joinDate', headerName: 'Join Date', type: 'date' };
    const dateString = rowData.joinDate.toLocaleDateString();
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={rowData.joinDate} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    expect(screen.getByText(dateString)).toBeInTheDocument();
  });
  
  test('renders custom cell renderer correctly', () => {
    const column: ColumnDefinition = { 
      field: 'isActive', 
      headerName: 'Status', 
      renderCell: (value) => (
        <span data-testid="custom-cell">{value ? 'Active' : 'Inactive'}</span>
      )
    };
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={rowData.isActive} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    expect(screen.getByTestId('custom-cell')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
  
  test('renders empty string for null or undefined values', () => {
    const column: ColumnDefinition = { field: 'nonExistent', headerName: 'Non-existent' };
    
    render(
      <table>
        <tbody>
          <tr>
            <Cell value={undefined} column={column} rowData={rowData} />
          </tr>
        </tbody>
      </table>
    );
    
    const cell = screen.getByRole('gridcell');
    expect(cell.textContent).toBe('');
  });
});
