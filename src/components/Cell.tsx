import React, { memo } from 'react';
import { CellProps } from '../types';

const Cell: React.FC<CellProps> = ({ value, column, rowData }) => {
  // Format the cell value based on the column type
  const formatValue = () => {
    if (value === undefined || value === null) {
      return '';
    }

    if (column.renderCell) {
      return column.renderCell(value, rowData);
    }

    switch (column.type) {
      case 'number':
        return typeof value === 'number' ? value.toString() : value;
      case 'date':
        return value instanceof Date ? value.toLocaleDateString() : value;
      case 'boolean':
        return value === true ? 'Yes' : value === false ? 'No' : value;
      default:
        return value;
    }
  };

  return (
    <td 
      className="data-grid-cell"
      style={{ 
        width: column.width ? `${column.width}px` : 'auto',
        minWidth: column.width ? `${column.width}px` : 'auto',
        flex: column.width ? `0 0 ${column.width}px` : '1 1 auto'
      }}
      role="gridcell"
    >
      {formatValue()}
    </td>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Cell);
