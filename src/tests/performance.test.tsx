import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from '../components/Grid';
import { ColumnDefinition } from '../types';

describe('Grid Performance Tests', () => {
  // Generate large datasets of different sizes
  const generateDataset = (size: number) => {
    return Array.from({ length: size }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: `user${index + 1}@example.com`,
      isActive: Math.random() > 0.3,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3))
    }));
  };

  // Column definitions
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isActive', headerName: 'Status', width: 120, type: 'boolean' },
    { field: 'joinDate', headerName: 'Join Date', width: 150, type: 'date' }
  ];

  test('renders small dataset (100 rows) efficiently', () => {
    const data = generateDataset(100);
    
    const startTime = performance.now();
    
    const { container } = render(
      <Grid columns={columns} data={data} />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Render time for 100 rows: ${renderTime.toFixed(2)}ms`);
    
    // Verify that the grid rendered correctly
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    
    // Set a reasonable performance threshold (adjust based on your requirements)
    expect(renderTime).toBeLessThan(500); // 500ms is a reasonable threshold for 100 rows
  });

  test('renders medium dataset (1,000 rows) with virtualization efficiently', () => {
    const data = generateDataset(1000);
    
    const startTime = performance.now();
    
    const { container } = render(
      <Grid 
        columns={columns} 
        data={data} 
        virtualized={true}
        rowHeight={40}
        maxHeight={400}
      />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Render time for 1,000 rows with virtualization: ${renderTime.toFixed(2)}ms`);
    
    // Verify that not all rows were rendered (virtualization)
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeLessThan(data.length);
    
    // Set a reasonable performance threshold
    expect(renderTime).toBeLessThan(1000); // 1000ms is a reasonable threshold for 1000 rows with virtualization
  });

  test('renders large dataset (10,000 rows) with virtualization efficiently', () => {
    const data = generateDataset(10000);
    
    const startTime = performance.now();
    
    const { container } = render(
      <Grid 
        columns={columns} 
        data={data} 
        virtualized={true}
        rowHeight={40}
        maxHeight={400}
      />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Render time for 10,000 rows with virtualization: ${renderTime.toFixed(2)}ms`);
    
    // Verify that not all rows were rendered (virtualization)
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeLessThan(data.length);
    
    // Set a reasonable performance threshold
    expect(renderTime).toBeLessThan(2000); // 2000ms is a reasonable threshold for 10000 rows with virtualization
  });

  test('sorting performance with large dataset', () => {
    const data = generateDataset(5000);
    
    // First render the grid
    const { container } = render(
      <Grid 
        columns={columns} 
        data={data} 
        virtualized={true}
        sortable={true}
      />
    );
    
    // Find the age header
    const ageHeader = Array.from(container.querySelectorAll('th')).find(
      th => th.textContent === 'Age'
    );
    
    if (ageHeader) {
      // Measure sorting performance
      const startTime = performance.now();
      
      // Trigger sort
      ageHeader.click();
      
      const endTime = performance.now();
      const sortTime = endTime - startTime;
      
      console.log(`Sort time for 5,000 rows: ${sortTime.toFixed(2)}ms`);
      
      // Set a reasonable performance threshold for sorting
      expect(sortTime).toBeLessThan(500); // 500ms is a reasonable threshold for sorting 5000 rows
    }
  });

  test('filtering performance with large dataset', () => {
    const data = generateDataset(5000);
    
    // First render the grid
    const { container } = render(
      <Grid 
        columns={columns} 
        data={data} 
        virtualized={true}
        filterable={true}
      />
    );
    
    // Find the filter input
    const filterInput = container.querySelector('input[placeholder="Filter..."]');
    
    if (filterInput) {
      // Measure filtering performance
      const startTime = performance.now();
      
      // Trigger filter
      fireEvent.change(filterInput, { target: { value: 'true' } });
      
      const endTime = performance.now();
      const filterTime = endTime - startTime;
      
      console.log(`Filter time for 5,000 rows: ${filterTime.toFixed(2)}ms`);
      
      // Set a reasonable performance threshold for filtering
      expect(filterTime).toBeLessThan(500); // 500ms is a reasonable threshold for filtering 5000 rows
    }
  });

  test('re-rendering performance when data changes', () => {
    let data = generateDataset(1000);
    
    // First render
    const { rerender } = render(
      <Grid 
        columns={columns} 
        data={data} 
        virtualized={true}
      />
    );
    
    // Create updated data (add one row)
    const updatedData = [
      ...data,
      {
        id: data.length + 1,
        name: `New User`,
        age: 25,
        email: `newuser@example.com`,
        isActive: true,
        joinDate: new Date()
      }
    ];
    
    // Measure re-render performance
    const startTime = performance.now();
    
    // Trigger re-render with new data
    rerender(
      <Grid 
        columns={columns} 
        data={updatedData} 
        virtualized={true}
      />
    );
    
    const endTime = performance.now();
    const reRenderTime = endTime - startTime;
    
    console.log(`Re-render time after data change: ${reRenderTime.toFixed(2)}ms`);
    
    // Set a reasonable performance threshold for re-rendering
    expect(reRenderTime).toBeLessThan(200); // 200ms is a reasonable threshold for re-rendering
  });

  test('memory usage with large dataset', () => {
    // This is a basic test to ensure the grid doesn't crash with very large datasets
    // For actual memory profiling, you would need to use browser dev tools or a profiler
    
    const data = generateDataset(20000);
    
    // Should render without errors
    expect(() => {
      render(
        <Grid 
          columns={columns} 
          data={data} 
          virtualized={true}
          rowHeight={40}
          maxHeight={400}
        />
      );
    }).not.toThrow();
  });
});
