import React from 'react';

// Define types for the grid component
export interface ColumnDefinition {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  resizable?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean';
  renderCell?: (value: any, rowData: any) => React.ReactNode;
  renderHeader?: (column: ColumnDefinition) => React.ReactNode;
  filter?: boolean;
  editable?: boolean;
  validator?: (value: any) => { valid: boolean; message?: string };
}

export interface SortModel {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterModel {
  [field: string]: any;
}

export interface GridProps {
  columns: ColumnDefinition[];
  data: Record<string, any>[];
  className?: string;
  onRowClick?: (rowData: Record<string, any>, index: number) => void;
  onCellClick?: (value: any, field: string, rowData: Record<string, any>) => void;
  onCellValueChange?: (newValue: any, field: string, rowData: Record<string, any>) => void;
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  sortable?: boolean;
  filterable?: boolean;
  resizableColumns?: boolean;
  virtualized?: boolean;
  rowHeight?: number;
  maxHeight?: number;
  loading?: boolean;
  loadingText?: string;
  noRowsText?: string;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  selectionMode?: 'none' | 'single' | 'multiple';
  rowIdField?: string;
}

export interface HeaderProps {
  columns: ColumnDefinition[];
  sortModel?: SortModel;
  onSort?: (field: string) => void;
  onResize?: (field: string, width: number) => void;
  resizableColumns?: boolean;
  filters?: FilterModel;
  onFilterChange?: (field: string, value: any) => void;
}

export interface RowProps {
  rowData: Record<string, any>;
  columns: ColumnDefinition[];
  isSelected: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  onCellClick?: (value: any, field: string, rowData: Record<string, any>) => void;
  onCellValueChange?: (newValue: any, field: string, rowData: Record<string, any>) => void;
}

export interface CellProps {
  value: any;
  column: ColumnDefinition;
  rowData: Record<string, any>;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SelectionState {
  selectedRows: Set<string | number>;
  lastSelectedRow: string | number | null;
}
