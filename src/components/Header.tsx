import React, { useState, useCallback, useEffect } from 'react';
import { HeaderProps, ColumnDefinition } from '../types';

/**
 * Header component for the data grid
 * Renders column headers with sorting, filtering, and resizing capabilities
 */
const Header: React.FC<HeaderProps> = ({ 
  columns, 
  sortModel, 
  onSort, 
  onResize,
  resizableColumns,
  filters = {},
  onFilterChange
}) => {
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [initialX, setInitialX] = useState<number>(0);
  const [initialWidth, setInitialWidth] = useState<number>(0);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Handle sort click
  const handleSortClick = useCallback((field: string) => {
    if (onSort) {
      onSort(field);
    }
  }, [onSort]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>, field: string, currentWidth: number) => {
    if (!resizableColumns || !onResize) return;
    
    setResizingColumn(field);
    setInitialX(e.clientX);
    setInitialWidth(currentWidth);
    
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering sort
  }, [resizableColumns, onResize]);

  // Handle resize move
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn || !onResize) return;
    
    const diff = e.clientX - initialX;
    const newWidth = Math.max(50, initialWidth + diff); // Minimum width of 50px
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
    
    onResize(resizingColumn, newWidth);
  }, [resizingColumn, initialX, initialWidth, onResize]);

  // Handle resize end
  const handleResizeEnd = useCallback((e: MouseEvent) => {
    setResizingColumn(null);
    e.stopPropagation(); // Prevent triggering sort after resize ends
  }, []);

  // Add and remove event listeners for resize
  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  // Handle filter change
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (onFilterChange) {
      onFilterChange(field, e.target.value);
    }
    e.stopPropagation(); // Prevent triggering sort
  }, [onFilterChange]);

  // Prevent click propagation for filter inputs
  const handleFilterClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <tr className="data-grid-header-row">
      {columns.map((column, index) => {
        const width = columnWidths[column.field] || column.width || 100;
        const isSortable = column.sortable && onSort;
        const isFiltering = column.filter && onFilterChange;
        const isResizable = resizableColumns && column.resizable && onResize;
        
        // Determine sort direction
        const sortDirection = sortModel && sortModel.field === column.field 
          ? sortModel.direction 
          : 'none';
        
        return (
          <th
            key={`header-${column.field}-${index}`}
            className={`data-grid-header-cell ${isSortable ? 'sortable' : ''}`}
            style={{ 
              width: `${width}px`,
              cursor: isSortable ? 'pointer' : 'default',
              position: 'relative'
            }}
            onClick={isSortable && !resizingColumn ? () => handleSortClick(column.field) : undefined}
          >
            <div className="data-grid-header-content">
              {column.renderHeader ? column.renderHeader(column) : column.headerName}
              {isSortable && sortDirection !== 'none' && (
                <span className="data-grid-sort-icon">
                  {sortDirection === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </div>
            
            {isFiltering && (
              <div className="data-grid-filter">
                <input
                  type="text"
                  className="data-grid-filter-input"
                  placeholder={`Filter ${column.headerName} (e.g., >30, <=100)`}
                  value={filters[column.field] || ''}
                  onChange={(e) => handleFilterChange(e, column.field)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {isResizable && (
              <div 
                className="data-grid-resize-handle"
                onMouseDown={(e) => handleResizeStart(e, column.field, width)}
                onClick={(e) => e.stopPropagation()}
                title="Drag to resize column"
              >
                <div className="resize-indicator"></div>
              </div>
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default Header;
