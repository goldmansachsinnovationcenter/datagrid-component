import React, { memo, useCallback } from 'react';
import Cell from './Cell';
import EditableCell from './EditableCell';
import { RowProps } from '../types';

const Row: React.FC<RowProps> = ({ 
  rowData, 
  columns, 
  isSelected, 
  onClick, 
  style,
  onCellClick,
  onCellValueChange
}) => {
  // Handle cell click
  const handleCellClick = useCallback((value: any, field: string) => {
    if (onCellClick) {
      onCellClick(value, field, rowData);
    }
  }, [onCellClick, rowData]);

  // Handle cell value change
  const handleCellValueChange = useCallback((newValue: any, field: string) => {
    if (onCellValueChange) {
      onCellValueChange(newValue, field, rowData);
    }
  }, [onCellValueChange, rowData]);

  return (
    <tr 
      className={`data-grid-row ${isSelected ? 'data-grid-row-selected' : ''}`}
      onClick={onClick}
      role="row"
      aria-selected={isSelected}
      style={{
        ...style,
        display: style?.display || 'table-row'  // Use flex layout if specified in style
      }}
    >
      {columns.map((column, index) => {
        const value = rowData[column.field];
        
        // Use EditableCell for editable columns
        if (column.editable) {
          return (
            <EditableCell 
              key={index} 
              value={value} 
              column={column}
              rowData={rowData}
              editable={column.editable}
              onValueChange={(newValue) => handleCellValueChange(newValue, column.field)}
              validate={column.validator}
            />
          );
        }
        
        // Use regular Cell for non-editable columns
        return (
          <Cell 
            key={index} 
            value={value} 
            column={column}
            rowData={rowData}
          />
        );
      })}
    </tr>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Row);
