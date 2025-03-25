import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Row from '../components/Row';
import { ColumnDefinition } from '../types';

describe('Row Component', () => {
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];

  const rowData = { id: 1, name: 'John Doe', age: 30 };
  const onClick = jest.fn();

  test('renders cells with correct data', () => {
    render(
      <table>
        <tbody>
          <Row 
            rowData={rowData} 
            columns={columns} 
            isSelected={false} 
            onClick={onClick} 
          />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  test('applies selected class when isSelected is true', () => {
    const { rerender } = render(
      <table>
        <tbody>
          <Row 
            rowData={rowData} 
            columns={columns} 
            isSelected={false} 
            onClick={onClick} 
          />
        </tbody>
      </table>
    );
    
    let row = screen.getByRole('row');
    expect(row).not.toHaveClass('data-grid-row-selected');
    
    rerender(
      <table>
        <tbody>
          <Row 
            rowData={rowData} 
            columns={columns} 
            isSelected={true} 
            onClick={onClick} 
          />
        </tbody>
      </table>
    );
    
    row = screen.getByRole('row');
    expect(row).toHaveClass('data-grid-row-selected');
    expect(row).toHaveAttribute('aria-selected', 'true');
  });

  test('calls onClick when row is clicked', () => {
    render(
      <table>
        <tbody>
          <Row 
            rowData={rowData} 
            columns={columns} 
            isSelected={false} 
            onClick={onClick} 
          />
        </tbody>
      </table>
    );
    
    const row = screen.getByRole('row');
    fireEvent.click(row);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
