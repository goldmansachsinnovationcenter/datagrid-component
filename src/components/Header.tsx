import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  const isResizing = useRef(false);
  const lastResizeTime = useRef<number>(0);
  const resizeTimeoutId = useRef<number | null>(null);

  // Define handleResizeMove and handleResizeEnd first as functions
  // so they can be referenced in handleResizeStart
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn || !onResize) return;
    
    // Set the flag to indicate we're actively resizing
    isResizing.current = true;
    
    const diff = e.clientX - initialX;
    const newWidth = Math.max(50, initialWidth + diff); // Minimum width of 50px
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
    
    onResize(resizingColumn, newWidth);
    
    // Prevent any click events during resize
    e.preventDefault();
    e.stopPropagation();
  }, [resizingColumn, initialX, initialWidth, onResize]);

  const handleResizeEnd = useCallback((e: MouseEvent) => {
    // Clear any existing timeout
    if (resizeTimeoutId.current !== null) {
      window.clearTimeout(resizeTimeoutId.current);
    }
    
    setResizingColumn(null);
    
    // Prevent any click events that might trigger sorting
    e.preventDefault();
    e.stopPropagation();
    
    // Remove the data attribute from the document body
    document.body.removeAttribute('data-grid-resizing');
    
    // Remove the class from the document body
    document.body.classList.remove('data-grid-resizing');
    
    // Record the time when resize ended to prevent immediate sort
    lastResizeTime.current = Date.now();
    (window as any).lastResizeTime = Date.now();
    
    // Clean up event listeners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    
    // Add a delay before allowing sort clicks again
    // Use a longer timeout to ensure no accidental sorting happens
    resizeTimeoutId.current = window.setTimeout(() => {
      isResizing.current = false;
      (window as any).isResizingColumn = false;
      resizeTimeoutId.current = null;
    }, 1500); // Increased to 1500ms to ensure no accidental sorting
  }, [handleResizeMove]);

  // Handle sort click
  const handleSortClick = useCallback((field: string) => {
    // Don't trigger sort if we're resizing or just finished resizing
    if (isResizing.current || 
        document.body.getAttribute('data-grid-resizing') === 'true' || 
        (window as any).isResizingColumn === true ||
        Date.now() - ((window as any).lastResizeTime || 0) < 2000) {
      console.log('Ignoring sort click - too close to resize action');
      return;
    }
    
    if (onSort) {
      onSort(field);
    }
  }, [onSort]);
  
  // Prevent sort during resize by setting a longer timeout
  useEffect(() => {
    // Set a global flag to prevent sort during resize
    (window as any).isResizingColumn = false;
    (window as any).lastResizeTime = 0;
    
    return () => {
      // Clean up global flags
      delete (window as any).isResizingColumn;
      delete (window as any).lastResizeTime;
      
      // Clear any existing timeout
      if (resizeTimeoutId.current !== null) {
        window.clearTimeout(resizeTimeoutId.current);
      }
    };
  }, []);
  
  // Prevent sort during resize by setting a longer timeout
  useEffect(() => {
    // Set a global flag to prevent sort during resize
    (window as any).isResizingColumn = false;
    (window as any).lastResizeTime = 0;
    
    return () => {
      // Clean up global flags
      delete (window as any).isResizingColumn;
      delete (window as any).lastResizeTime;
      
      // Clear any existing timeout
      if (resizeTimeoutId.current !== null) {
        window.clearTimeout(resizeTimeoutId.current);
      }
    };
  }, []);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>, field: string, currentWidth: number) => {
    if (!resizableColumns || !onResize) return;
    
    // Set the resizing state immediately
    setResizingColumn(field);
    setInitialX(e.clientX);
    setInitialWidth(currentWidth);
    
    // Set flags to prevent sorting during resize
    isResizing.current = true;
    lastResizeTime.current = Date.now();
    (window as any).isResizingColumn = true;
    (window as any).lastResizeTime = Date.now();
    
    // Prevent triggering sort
    e.preventDefault();
    e.stopPropagation();
    
    // Add a data attribute to the document body to indicate resize is in progress
    document.body.setAttribute('data-grid-resizing', 'true');
    
    // Add a class to the document body to prevent text selection during resize
    document.body.classList.add('data-grid-resizing');
    
    // Set a timeout to ensure resize is completed before allowing sort
    if (resizeTimeoutId.current !== null) {
      window.clearTimeout(resizeTimeoutId.current);
    }
    resizeTimeoutId.current = window.setTimeout(() => {
      // This will be cleared in handleResizeEnd
    }, 2000);
    
    // Add event listeners for mousemove and mouseup
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    
    // Set a data attribute on the specific header cell being resized
    const headerCell = e.currentTarget.closest('th');
    if (headerCell) {
      headerCell.setAttribute('data-resizing', 'true');
    }
  }, [resizableColumns, onResize, handleResizeMove, handleResizeEnd]);

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
            className={`data-grid-header-cell ${isSortable ? 'sortable' : ''} ${resizingColumn === column.field ? 'resizing' : ''}`}
            style={{ 
              width: `${width}px`,
              minWidth: `${width}px`,
              maxWidth: `${width}px`,
              cursor: isSortable && !isResizing.current ? 'pointer' : 'default',
              position: 'relative',
              boxSizing: 'border-box'
            }}
            onClick={(e) => {
              // Only trigger sort if we're not resizing and it's sortable
              if (isSortable && !isResizing.current && 
                  !document.body.hasAttribute('data-grid-resizing') &&
                  !(window as any).isResizingColumn &&
                  Date.now() - lastResizeTime.current > 1500 &&
                  Date.now() - ((window as any).lastResizeTime || 0) > 1500) {
                handleSortClick(column.field);
              }
            }}
            data-resizing={resizingColumn === column.field ? 'true' : 'false'}
            data-field={column.field}
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
