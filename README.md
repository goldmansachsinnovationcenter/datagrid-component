# React Data Grid Component

A high-performance, modular data grid component built with React and TypeScript.

## Features

- 📊 Efficient rendering of large datasets with virtualization
- 🔍 Sorting and filtering capabilities
- 📱 Responsive design for both desktop and mobile
- ✏️ Inline cell editing with validation
- 🎨 Customizable cell and header rendering
- 📄 Pagination support
- 🔄 Dynamic data updates
- ⌨️ Keyboard navigation and accessibility features
- 🎯 Row selection (single/multiple)
- 📏 Column resizing

## Installation

```bash
npm install data-grid-component
# or
yarn add data-grid-component
```

## Basic Usage

```jsx
import React from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

// Define your columns
const columns: ColumnDefinition[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' },
  // Add more columns as needed
];

// Your data
const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  // Add more data as needed
];

const MyComponent = () => {
  const handleRowClick = (rowData) => {
    console.log('Row clicked:', rowData);
  };

  return (
    <Grid 
      columns={columns} 
      data={data} 
      onRowClick={handleRowClick}
      sortable={true}
      pagination={true}
      pageSize={10}
    />
  );
};
```

## API Reference

### Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDefinition[]` | Required | Array of column definitions |
| `data` | `Record<string, any>[]` | Required | Array of data objects |
| `className` | `string` | `''` | Additional CSS class for the grid container |
| `onRowClick` | `(rowData: Record<string, any>, index: number) => void` | - | Callback fired when a row is clicked |
| `onCellClick` | `(value: any, field: string, rowData: Record<string, any>) => void` | - | Callback fired when a cell is clicked |
| `onCellValueChange` | `(newValue: any, field: string, rowData: Record<string, any>) => void` | - | Callback fired when a cell value changes |
| `onSelectionChange` | `(selectedRows: Record<string, any>[]) => void` | - | Callback fired when row selection changes |
| `sortable` | `boolean` | `true` | Whether columns can be sorted |
| `filterable` | `boolean` | `false` | Whether columns can be filtered |
| `resizableColumns` | `boolean` | `true` | Whether columns can be resized |
| `virtualized` | `boolean` | `false` | Whether to use virtualization for large datasets |
| `rowHeight` | `number` | `40` | Height of each row in pixels |
| `maxHeight` | `number` | `400` | Maximum height of the grid in pixels |
| `loading` | `boolean` | `false` | Whether the grid is in a loading state |
| `loadingText` | `string` | `'Loading...'` | Text to display when loading |
| `noRowsText` | `string` | `'No rows to display'` | Text to display when there are no rows |
| `pagination` | `boolean` | `false` | Whether to enable pagination |
| `pageSize` | `number` | `10` | Number of rows per page |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50, 100]` | Available page size options |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Row selection mode |
| `rowIdField` | `string` | `'id'` | Field to use as unique identifier for rows |

### Column Definition

```typescript
interface ColumnDefinition {
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
```

## Customization

### Custom Cell Rendering

You can customize how cells are rendered by providing a `renderCell` function in the column definition:

```jsx
const columns = [
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (value, rowData) => (
      <span style={{ 
        color: value === 'active' ? 'green' : 'red',
        fontWeight: 'bold'
      }}>
        {value.toUpperCase()}
      </span>
    )
  }
];
```

### Custom Header Rendering

Similarly, you can customize headers with the `renderHeader` function:

```jsx
const columns = [
  {
    field: 'priority',
    headerName: 'Priority',
    renderHeader: (column) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{column.headerName}</span>
        <InfoIcon title="Task priority level" />
      </div>
    )
  }
];
```

### Styling

The grid comes with default styling, but you can customize it by overriding CSS variables:

```css
:root {
  --data-grid-border-color: #e0e0e0;
  --data-grid-header-bg: #f5f5f5;
  --data-grid-header-text: #333;
  --data-grid-row-hover-bg: #f9f9f9;
  --data-grid-selected-row-bg: #e8f0fe;
  --data-grid-cell-padding: 8px 12px;
  --data-grid-font-size: 14px;
}
```

## Advanced Usage

### Virtualization for Large Datasets

For optimal performance with large datasets, enable virtualization:

```jsx
<Grid
  columns={columns}
  data={largeDataset} // thousands of rows
  virtualized={true}
  rowHeight={40}
  maxHeight={600}
/>
```

### Cell Editing with Validation

Enable inline editing with validation:

```jsx
const columns = [
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    validator: (value) => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return {
        valid,
        message: valid ? '' : 'Please enter a valid email address'
      };
    }
  }
];
```

## Performance Tips

- Use virtualization for datasets larger than 100 rows
- Implement memoization for expensive operations
- Use the `rowIdField` prop to specify a unique identifier for rows
- Avoid unnecessary re-renders by using React.memo for custom cell renderers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
