import React, { useState, useEffect, useRef } from 'react';
import { CellProps } from '../types';

interface EditableCellProps extends CellProps {
  editable?: boolean;
  onValueChange?: (newValue: any, field: string, rowData: Record<string, any>) => void;
  validate?: (value: any) => { valid: boolean; message?: string };
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  column,
  rowData,
  editable = true,
  onValueChange,
  validate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<any>(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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

  // Handle cell click to enter edit mode
  const handleCellClick = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    
    // Clear previous error
    setError(null);
  };

  // Handle blur to exit edit mode
  const handleBlur = () => {
    if (!isEditing) return;
    
    // Validate the value if a validator is provided
    if (validate) {
      const result = validate(editValue);
      if (!result.valid) {
        setError(result.message || 'Invalid value');
        return;
      }
    }

    // Convert value based on column type
    let finalValue = editValue;
    if (column.type === 'number') {
      finalValue = parseFloat(editValue);
      if (isNaN(finalValue)) {
        setError('Please enter a valid number');
        return;
      }
    } else if (column.type === 'date') {
      const date = new Date(editValue);
      if (isNaN(date.getTime())) {
        setError('Please enter a valid date');
        return;
      }
      finalValue = date;
    } else if (column.type === 'boolean') {
      const lowerValue = String(editValue).toLowerCase();
      if (['true', 'yes', '1'].includes(lowerValue)) {
        finalValue = true;
      } else if (['false', 'no', '0'].includes(lowerValue)) {
        finalValue = false;
      } else {
        setError('Please enter Yes/No or True/False');
        return;
      }
    }

    // Call the onValueChange callback
    if (onValueChange) {
      onValueChange(finalValue, column.field, rowData);
    }

    // Exit edit mode
    setIsEditing(false);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      // Cancel editing and revert to original value
      setEditValue(value);
      setIsEditing(false);
      setError(null);
    }
  };

  return (
    <td 
      className={`data-grid-cell ${editable ? 'editable' : ''} ${isEditing ? 'editing' : ''} ${error ? 'error' : ''}`}
      style={{ 
        width: column.width ? `${column.width}px` : 'auto',
        minWidth: column.width ? `${column.width}px` : 'auto',
        flex: column.width ? `0 0 ${column.width}px` : '1 1 auto'
      }}
      onClick={handleCellClick}
      role="gridcell"
      aria-readonly={!editable}
    >
      {isEditing ? (
        <div className="data-grid-cell-editor">
          <input
            ref={inputRef}
            type={column.type === 'date' ? 'date' : 'text'}
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            className={error ? 'error' : ''}
          />
          {error && <div className="data-grid-cell-error">{error}</div>}
        </div>
      ) : (
        <div className="data-grid-cell-content">
          {formatValue()}
          {editable && <div className="data-grid-cell-edit-indicator" />}
        </div>
      )}
    </td>
  );
};

export default EditableCell;
