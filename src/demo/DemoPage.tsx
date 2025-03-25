import React, { useState } from 'react';
import Grid from '../components/Grid';
import { ColumnDefinition } from '../types';
import '../styles/docs.css';

// Sample data for the demo
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', isActive: true, joinDate: new Date('2020-01-15') },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', isActive: false, joinDate: new Date('2021-03-20') },
  { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', isActive: true, joinDate: new Date('2019-11-05') },
  { id: 4, name: 'Alice Williams', age: 28, email: 'alice@example.com', isActive: true, joinDate: new Date('2022-02-10') },
  { id: 5, name: 'Charlie Brown', age: 33, email: 'charlie@example.com', isActive: false, joinDate: new Date('2020-07-22') },
];

// Column definitions
const columns: ColumnDefinition[] = [
  { field: 'id', headerName: 'ID', width: 70, type: 'number', sortable: true, resizable: true },
  { field: 'name', headerName: 'Name', width: 150, sortable: true, filter: true, resizable: true },
  { field: 'age', headerName: 'Age', width: 100, type: 'number', sortable: true, filter: true, resizable: true },
  { field: 'email', headerName: 'Email', width: 200, sortable: true, filter: true, resizable: true },
  { 
    field: 'isActive', 
    headerName: 'Status', 
    width: 120, 
    type: 'boolean',
    sortable: true,
    filter: true,
    resizable: true,
    renderCell: (value: boolean) => (
      <span style={{ 
        color: value ? 'green' : 'red',
        fontWeight: 'bold'
      }}>
        {value ? 'Active' : 'Inactive'}
      </span>
    )
  },
  { 
    field: 'joinDate', 
    headerName: 'Join Date', 
    width: 150, 
    type: 'date',
    sortable: true,
    filter: true,
    resizable: true
  },
];

const DemoPage: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [showSorting, setShowSorting] = useState(true);
  const [showFiltering, setShowFiltering] = useState(true);
  const [showPagination, setShowPagination] = useState(false);
  const [showVirtualization, setShowVirtualization] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'none' | 'single' | 'multiple'>('single');
  const [editableGrid, setEditableGrid] = useState(false);
  
  // Generate large dataset for virtualization demo
  const generateLargeDataset = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: `user${index + 1}@example.com`,
      isActive: Math.random() > 0.3,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3))
    }));
  };
  
  // Generate 2,000 rows for virtualization demo as requested
  const largeDataset = React.useMemo(() => generateLargeDataset(2000), []);

  // Create editable columns
  const editableColumns = columns.map(col => ({
    ...col,
    editable: editableGrid
  }));

  const handleRowClick = (rowData: Record<string, any>) => {
    setSelectedRow(rowData);
  };

  const handleCellValueChange = (newValue: any, field: string, rowData: Record<string, any>) => {
    console.log(`Cell value changed: ${field} = ${newValue} in row ${rowData.id}`);
  };

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="docs-container">
      {/* Header */}
      <header className="docs-header">
        <div className="docs-header-content">
          <h1>React Data Grid</h1>
          <p className="docs-subtitle">A high-performance, feature-rich data grid component for React applications</p>
          <div className="docs-badges">
            <span className="docs-badge">React</span>
            <span className="docs-badge">TypeScript</span>
            <span className="docs-badge">v1.0.0</span>
          </div>
          <div className="docs-buttons">
            <button className="docs-button docs-button-primary">Get Started</button>
            <button className="docs-button">View on GitHub</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="docs-layout">
        <nav className="docs-sidebar">
          <div className="docs-nav-section">
            <h3>Getting Started</h3>
            <ul>
              <li className={activeTab === 'overview' ? 'active' : ''}>
                <a href="#overview" onClick={() => setActiveTab('overview')}>Overview</a>
              </li>
              <li className={activeTab === 'installation' ? 'active' : ''}>
                <a href="#installation" onClick={() => setActiveTab('installation')}>Installation</a>
              </li>
              <li className={activeTab === 'quickstart' ? 'active' : ''}>
                <a href="#quickstart" onClick={() => setActiveTab('quickstart')}>Quick Start</a>
              </li>
            </ul>
          </div>
          <div className="docs-nav-section">
            <h3>Features</h3>
            <ul>
              <li className={activeTab === 'sorting' ? 'active' : ''}>
                <a href="#sorting" onClick={() => setActiveTab('sorting')}>Sorting</a>
              </li>
              <li className={activeTab === 'filtering' ? 'active' : ''}>
                <a href="#filtering" onClick={() => setActiveTab('filtering')}>Filtering</a>
              </li>
              <li className={activeTab === 'pagination' ? 'active' : ''}>
                <a href="#pagination" onClick={() => setActiveTab('pagination')}>Pagination</a>
              </li>
              <li className={activeTab === 'virtualization' ? 'active' : ''}>
                <a href="#virtualization" onClick={() => setActiveTab('virtualization')}>Virtualization</a>
              </li>
              <li className={activeTab === 'editing' ? 'active' : ''}>
                <a href="#editing" onClick={() => setActiveTab('editing')}>Cell Editing</a>
              </li>
              <li className={activeTab === 'selection' ? 'active' : ''}>
                <a href="#selection" onClick={() => setActiveTab('selection')}>Row Selection</a>
              </li>
              <li className={activeTab === 'resizing' ? 'active' : ''}>
                <a href="#resizing" onClick={() => setActiveTab('resizing')}>Column Resizing</a>
              </li>
            </ul>
          </div>
          <div className="docs-nav-section">
            <h3>API Reference</h3>
            <ul>
              <li className={activeTab === 'props' ? 'active' : ''}>
                <a href="#props" onClick={() => setActiveTab('props')}>Props</a>
              </li>
              <li className={activeTab === 'methods' ? 'active' : ''}>
                <a href="#methods" onClick={() => setActiveTab('methods')}>Methods</a>
              </li>
              <li className={activeTab === 'types' ? 'active' : ''}>
                <a href="#types" onClick={() => setActiveTab('types')}>TypeScript Types</a>
              </li>
            </ul>
          </div>
          <div className="docs-nav-section">
            <h3>Examples</h3>
            <ul>
              <li className={activeTab === 'basic' ? 'active' : ''}>
                <a href="#basic" onClick={() => setActiveTab('basic')}>Basic Usage</a>
              </li>
              <li className={activeTab === 'advanced' ? 'active' : ''}>
                <a href="#advanced" onClick={() => setActiveTab('advanced')}>Advanced Features</a>
              </li>
              <li className={activeTab === 'customization' ? 'active' : ''}>
                <a href="#customization" onClick={() => setActiveTab('customization')}>Customization</a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="docs-content">
          {/* Overview Page */}
          {activeTab === 'overview' && (
            <section className="docs-section" id="overview">
              <div className="docs-section-header">
                <h2>Overview</h2>
                <p>A comprehensive introduction to the React Data Grid component and its capabilities.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>What is React Data Grid?</h3>
                </div>
                <div className="docs-card-body">
                  <p>React Data Grid is a high-performance, feature-rich grid component built with React and TypeScript. It provides a flexible and efficient way to display and interact with tabular data in your React applications.</p>
                  
                  <p>Designed with performance and usability in mind, this component can handle large datasets while providing a smooth user experience through features like virtualization, efficient rendering, and optimized state management.</p>
                  
                  <h4>Key Benefits</h4>
                  <ul>
                    <li><strong>High Performance:</strong> Efficiently renders thousands of rows with minimal impact on performance</li>
                    <li><strong>Feature Rich:</strong> Includes sorting, filtering, pagination, virtualization, and more</li>
                    <li><strong>Customizable:</strong> Easily customize the appearance and behavior to match your application's needs</li>
                    <li><strong>TypeScript Support:</strong> Built with TypeScript for better type safety and developer experience</li>
                    <li><strong>Accessibility:</strong> Designed with accessibility in mind, following ARIA best practices</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Core Features</h3>
                </div>
                <div className="docs-card-body">
                  <div className="docs-features-grid">
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Sorting</h3>
                      <p>Sort data by any column with support for ascending and descending order.</p>
                    </div>
                    
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Filtering</h3>
                      <p>Filter data using powerful expressions with support for all data types.</p>
                    </div>
                    
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Pagination</h3>
                      <p>Navigate through large datasets with customizable page sizes and controls.</p>
                    </div>
                    
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Virtualization</h3>
                      <p>Efficiently render thousands of rows with minimal performance impact.</p>
                    </div>
                    
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Cell Editing</h3>
                      <p>Edit cell values directly in the grid with validation and change tracking.</p>
                    </div>
                    
                    <div className="docs-feature-card">
                      <div className="docs-feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Row Selection</h3>
                      <p>Select single or multiple rows with customizable selection behavior.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Getting Started</h3>
                </div>
                <div className="docs-card-body">
                  <p>To get started with React Data Grid, follow these steps:</p>
                  
                  <ol>
                    <li>
                      <strong>Installation:</strong> Install the package using npm or yarn.
                      <pre className="docs-code-block">npm install data-grid-component</pre>
                    </li>
                    <li>
                      <strong>Import:</strong> Import the Grid component and styles in your application.
                      <pre className="docs-code-block">import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';</pre>
                    </li>
                    <li>
                      <strong>Basic Usage:</strong> Define your columns and data, then render the Grid component.
                      <pre className="docs-code-block">{`import React from 'react';
import Grid from 'data-grid-component';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' },
];

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
];

const MyComponent = () => {
  return (
    <Grid 
      columns={columns} 
      data={data} 
      sortable={true}
      pagination={true}
    />
  );
};`}</pre>
                    </li>
                  </ol>
                  
                  <p>For more detailed information, check out the <a href="#installation" onClick={() => setActiveTab('installation')}>Installation</a> and <a href="#quickstart" onClick={() => setActiveTab('quickstart')}>Quick Start</a> guides.</p>
                </div>
              </div>
            </section>
          )}
          
          {/* Installation Page */}
          {activeTab === 'installation' && (
            <section className="docs-section" id="installation">
              <div className="docs-section-header">
                <h2>Installation</h2>
                <p>Follow these steps to install and set up the Data Grid component in your project.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Installation Steps</h3>
                </div>
                <div className="docs-card-body">
                  <ol className="docs-installation-steps">
                    <li className="docs-installation-step">
                      <h3>Install the package</h3>
                      <p>Install the package using npm or yarn:</p>
                      <pre className="docs-code-block">npm install data-grid-component</pre>
                      <p>Or using yarn:</p>
                      <pre className="docs-code-block">yarn add data-grid-component</pre>
                    </li>
                    <li className="docs-installation-step">
                      <h3>Import the component</h3>
                      <p>Import the Grid component and styles in your application:</p>
                      <pre className="docs-code-block">import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';</pre>
                    </li>
                    <li className="docs-installation-step">
                      <h3>Import TypeScript types (optional)</h3>
                      <p>If you're using TypeScript, you can import the types:</p>
                      <pre className="docs-code-block">{`import type { ColumnDefinition, GridProps } from 'data-grid-component/types';`}</pre>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Requirements</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component has the following peer dependencies:</p>
                  
                  <ul>
                    <li><strong>React:</strong> 16.8.0 or higher (Hooks support required)</li>
                    <li><strong>React DOM:</strong> 16.8.0 or higher</li>
                  </ul>
                  
                  <p>Make sure these dependencies are installed in your project:</p>
                  
                  <pre className="docs-code-block">npm install react react-dom</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Browser Support</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component supports all modern browsers:</p>
                  
                  <ul>
                    <li>Chrome (latest)</li>
                    <li>Firefox (latest)</li>
                    <li>Safari (latest)</li>
                    <li>Edge (latest)</li>
                  </ul>
                  
                  <p>Internet Explorer is not supported.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Next Steps</h3>
                </div>
                <div className="docs-card-body">
                  <p>Now that you have installed the Data Grid component, you can proceed to the <a href="#quickstart" onClick={() => setActiveTab('quickstart')}>Quick Start</a> guide to learn how to use it in your application.</p>
                </div>
              </div>
            </section>
          )}
          
          {/* Quick Start Page */}
          {activeTab === 'quickstart' && (
            <section className="docs-section" id="quickstart">
              <div className="docs-section-header">
                <h2>Quick Start</h2>
                <p>Get up and running with the Data Grid component in minutes.</p>
              </div>
              
              <div className="docs-quick-start">
                <div className="docs-step-card">
                  <div className="docs-step-number">Step 1</div>
                  <div className="docs-step-content">
                    <h3>Define Your Columns</h3>
                    <p>Create column definitions to specify how your data should be displayed in the grid.</p>
                    <pre className="docs-code-block">{`import { ColumnDefinition } from 'data-grid-component/types';

const columns: ColumnDefinition[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    type: 'number',
    sortable: true
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    sortable: true,
    filter: true
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    width: 100, 
    type: 'number',
    sortable: true,
    filter: true
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    width: 200,
    sortable: true,
    filter: true
  }
];`}</pre>
                    <p>Each column definition can include the following properties:</p>
                    <ul>
                      <li><code>field</code>: The field name in your data object</li>
                      <li><code>headerName</code>: The display name for the column header</li>
                      <li><code>width</code>: The width of the column in pixels</li>
                      <li><code>type</code>: The data type ('string', 'number', 'date', 'boolean')</li>
                      <li><code>sortable</code>: Whether the column can be sorted</li>
                      <li><code>filter</code>: Whether the column can be filtered</li>
                      <li><code>resizable</code>: Whether the column can be resized</li>
                      <li><code>renderCell</code>: Custom cell renderer function</li>
                    </ul>
                  </div>
                </div>
                
                <div className="docs-step-card">
                  <div className="docs-step-number">Step 2</div>
                  <div className="docs-step-content">
                    <h3>Prepare Your Data</h3>
                    <p>Create an array of objects that match your column definitions.</p>
                    <pre className="docs-code-block">{`const data = [
  { 
    id: 1, 
    name: 'John Doe', 
    age: 30, 
    email: 'john@example.com',
    isActive: true,
    joinDate: new Date('2020-01-15')
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    age: 25, 
    email: 'jane@example.com',
    isActive: false,
    joinDate: new Date('2021-03-20')
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    age: 45, 
    email: 'bob@example.com',
    isActive: true,
    joinDate: new Date('2019-11-05')
  }
];`}</pre>
                    <p>The data array should contain objects with properties that match the <code>field</code> values in your column definitions.</p>
                  </div>
                </div>
                
                <div className="docs-step-card">
                  <div className="docs-step-number">Step 3</div>
                  <div className="docs-step-content">
                    <h3>Implement Event Handlers (Optional)</h3>
                    <p>Create event handlers to respond to user interactions with the grid.</p>
                    <pre className="docs-code-block">{`// Handle row click events
const handleRowClick = (rowData) => {
  console.log('Row clicked:', rowData);
  // You can update your application state here
};

// Handle cell value changes (for editable cells)
const handleCellValueChange = (newValue, field, rowData) => {
  console.log(\`Cell value changed: \${field} = \${newValue} in row \${rowData.id}\`);
  // Update your data or make API calls here
};`}</pre>
                  </div>
                </div>
                
                <div className="docs-step-card">
                  <div className="docs-step-number">Step 4</div>
                  <div className="docs-step-content">
                    <h3>Render the Grid Component</h3>
                    <p>Add the Grid component to your React application with your columns, data, and event handlers.</p>
                    <pre className="docs-code-block">{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const MyDataGridComponent = () => {
  return (
    <Grid 
      columns={columns} 
      data={data} 
      onRowClick={handleRowClick}
      onCellValueChange={handleCellValueChange}
      sortable={true}
      filterable={true}
      resizableColumns={true}
      pagination={true}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      maxHeight={400}
    />
  );
};

export default MyDataGridComponent;`}</pre>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Example</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of a basic implementation:</p>
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';
import 'data-grid-component/styles/grid.css';

const BasicExample = () => {
  // Define columns
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', sortable: true },
    { field: 'name', headerName: 'Name', width: 150, sortable: true, filter: true },
    { field: 'age', headerName: 'Age', width: 100, type: 'number', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', width: 200, sortable: true, filter: true }
  ];
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com' }
  ];
  
  // State for selected row
  const [selectedRow, setSelectedRow] = useState(null);
  
  // Handle row click
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };
  
  return (
    <div>
      <Grid 
        columns={columns} 
        data={data} 
        onRowClick={handleRowClick}
        sortable={true}
        filterable={true}
        pagination={true}
        pageSize={10}
      />
      
      {selectedRow && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Row:</h4>
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BasicExample;`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Next Steps</h3>
                </div>
                <div className="docs-card-body">
                  <p>Now that you have a basic implementation, you can explore more advanced features:</p>
                  
                  <ul>
                    <li><a href="#sorting" onClick={() => setActiveTab('sorting')}>Sorting</a> - Learn how to customize sorting behavior</li>
                    <li><a href="#filtering" onClick={() => setActiveTab('filtering')}>Filtering</a> - Explore advanced filtering options</li>
                    <li><a href="#pagination" onClick={() => setActiveTab('pagination')}>Pagination</a> - Customize pagination controls</li>
                    <li><a href="#virtualization" onClick={() => setActiveTab('virtualization')}>Virtualization</a> - Handle large datasets efficiently</li>
                    <li><a href="#editing" onClick={() => setActiveTab('editing')}>Cell Editing</a> - Enable inline editing with validation</li>
                    <li><a href="#selection" onClick={() => setActiveTab('selection')}>Row Selection</a> - Implement single and multiple row selection</li>
                    <li><a href="#customization" onClick={() => setActiveTab('customization')}>Customization</a> - Style and customize the grid to match your application</li>
                  </ul>
                </div>
              </div>
            </section>
          )}
          
          {/* Sorting Page */}
          {activeTab === 'sorting' && (
            <section className="docs-section" id="sorting">
              <div className="docs-section-header">
                <h2>Sorting</h2>
                <p>Learn how to implement and customize sorting functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Sorting</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in sorting functionality that allows users to sort data by clicking on column headers. To enable sorting:</p>
                  
                  <ol>
                    <li>
                      <p>Enable sorting for the entire grid by setting the <code>sortable</code> prop to <code>true</code>:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  sortable={true}
/>`}</pre>
                    </li>
                    <li>
                      <p>Specify which columns should be sortable by setting the <code>sortable</code> property in the column definition:</p>
                      <pre className="docs-code-block">{`const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    type: 'number',
    sortable: true  // This column will be sortable
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    sortable: true  // This column will be sortable
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    width: 200,
    sortable: false  // This column will NOT be sortable
  }
];`}</pre>
                    </li>
                  </ol>
                  
                  <p>When sorting is enabled, users can:</p>
                  <ul>
                    <li>Click on a column header to sort in ascending order</li>
                    <li>Click again to sort in descending order</li>
                    <li>Click a third time to remove sorting</li>
                  </ul>
                  
                  <p>The current sort state is indicated by an arrow icon (▲ for ascending, ▼ for descending) in the column header.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Sort Model</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid uses a sort model to track the current sorting state. The sort model has the following structure:</p>
                  
                  <pre className="docs-code-block">{`interface SortModel {
  field: string;      // The field to sort by
  direction: 'asc' | 'desc';  // The sort direction
}`}</pre>
                  
                  <p>You can control sorting programmatically by providing a <code>sortModel</code> prop and handling sort changes:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const SortingExample = () => {
  const [sortModel, setSortModel] = useState({ field: 'name', direction: 'asc' });
  
  const handleSortChange = (newSortModel) => {
    setSortModel(newSortModel);
    // You can perform additional actions here, such as fetching sorted data from an API
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      sortable={true}
      sortModel={sortModel}
      onSortChange={handleSortChange}
    />
  );
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Sort Functions</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can customize the sorting behavior for specific columns by providing a <code>sortComparator</code> function in the column definition:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: true,
    // Custom sort function for case-insensitive sorting
    sortComparator: (a, b, direction) => {
      const valueA = String(a).toLowerCase();
      const valueB = String(b).toLowerCase();
      
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    }
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    type: 'date',
    sortable: true,
    // Custom sort function for date sorting
    sortComparator: (a, b, direction) => {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
  }
];`}</pre>
                  
                  <p>The <code>sortComparator</code> function receives three parameters:</p>
                  <ul>
                    <li><code>a</code>: The value from the first row</li>
                    <li><code>b</code>: The value from the second row</li>
                    <li><code>direction</code>: The sort direction ('asc' or 'desc')</li>
                  </ul>
                  
                  <p>The function should return:</p>
                  <ul>
                    <li>A negative number if <code>a</code> should come before <code>b</code></li>
                    <li>A positive number if <code>a</code> should come after <code>b</code></li>
                    <li>Zero if <code>a</code> and <code>b</code> are equal</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Multi-Column Sorting</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid also supports sorting by multiple columns. To enable multi-column sorting, set the <code>multiSort</code> prop to <code>true</code>:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  sortable={true}
  multiSort={true}
/>`}</pre>
                  
                  <p>With multi-column sorting enabled, users can:</p>
                  <ul>
                    <li>Hold the Shift key while clicking column headers to add additional sort criteria</li>
                    <li>The grid will sort by the first column, then by the second column for rows with equal values in the first column, and so on</li>
                  </ul>
                  
                  <p>When using multi-column sorting, the <code>sortModel</code> becomes an array of sort criteria:</p>
                  
                  <pre className="docs-code-block">{`const [sortModel, setSortModel] = useState([
  { field: 'category', direction: 'asc' },
  { field: 'name', direction: 'asc' }
]);`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Server-Side Sorting</h3>
                </div>
                <div className="docs-card-body">
                  <p>For large datasets, you may want to implement server-side sorting. To do this:</p>
                  
                  <ol>
                    <li>
                      <p>Set <code>serverSideSort</code> to <code>true</code> to disable client-side sorting:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  sortable={true}
  serverSideSort={true}
  sortModel={sortModel}
  onSortChange={handleSortChange}
/>`}</pre>
                    </li>
                    <li>
                      <p>Implement the <code>onSortChange</code> handler to fetch sorted data from your server:</p>
                      <pre className="docs-code-block">{`const handleSortChange = async (newSortModel) => {
  setSortModel(newSortModel);
  setLoading(true);
  
  try {
    // Fetch sorted data from your API
    const response = await fetch(\`/api/data?sort=\${newSortModel.field}&order=\${newSortModel.direction}\`);
    const sortedData = await response.json();
    
    // Update the data state
    setData(sortedData);
  } catch (error) {
    console.error('Error fetching sorted data:', error);
  } finally {
    setLoading(false);
  }
};`}</pre>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Implementing Sorting</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing sorting functionality:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const SortingExample = () => {
  // Define columns with sorting enabled
  const columns: ColumnDefinition[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70, 
      type: 'number',
      sortable: true
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150,
      sortable: true
    },
    { 
      field: 'age', 
      headerName: 'Age', 
      width: 100, 
      type: 'number',
      sortable: true
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      sortable: true
    }
  ];
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com' }
  ];
  
  // State for sort model
  const [sortModel, setSortModel] = useState({ field: 'name', direction: 'asc' });
  
  // Handle sort changes
  const handleSortChange = (newSortModel) => {
    setSortModel(newSortModel);
    console.log('Sort changed:', newSortModel);
  };
  
  return (
    <div>
      <h3>Current Sort: {sortModel.field} ({sortModel.direction})</h3>
      
      <Grid 
        columns={columns} 
        data={data} 
        sortable={true}
        sortModel={sortModel}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default SortingExample;`}</pre>
                </div>
              </div>
            </section>
          )}
          
          {/* Filtering Page */}
          {activeTab === 'filtering' && (
            <section className="docs-section" id="filtering">
              <div className="docs-section-header">
                <h2>Filtering</h2>
                <p>Learn how to implement and customize filtering functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in filtering functionality that allows users to filter data based on column values. To enable filtering:</p>
                  
                  <ol>
                    <li>
                      <p>Enable filtering for the entire grid by setting the <code>filterable</code> prop to <code>true</code>:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  filterable={true}
/>`}</pre>
                    </li>
                    <li>
                      <p>Specify which columns should be filterable by setting the <code>filter</code> property in the column definition:</p>
                      <pre className="docs-code-block">{`const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    type: 'number',
    filter: true  // This column will be filterable
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    filter: true  // This column will be filterable
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    width: 200,
    filter: false  // This column will NOT be filterable
  }
];`}</pre>
                    </li>
                  </ol>
                  
                  <p>When filtering is enabled, filter input fields will appear in the column headers, allowing users to enter filter criteria for each column.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Expression-Based Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid supports powerful expression-based filtering that allows users to filter data using comparison operators. Users can enter expressions in the filter input fields to perform advanced filtering:</p>
                  
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Operator</th>
                        <th>Description</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>&gt;</code></td>
                        <td>Greater than</td>
                        <td><code>&gt;30</code> (values greater than 30)</td>
                      </tr>
                      <tr>
                        <td><code>&gt;=</code></td>
                        <td>Greater than or equal to</td>
                        <td><code>&gt;=30</code> (values greater than or equal to 30)</td>
                      </tr>
                      <tr>
                        <td><code>&lt;</code></td>
                        <td>Less than</td>
                        <td><code>&lt;30</code> (values less than 30)</td>
                      </tr>
                      <tr>
                        <td><code>&lt;=</code></td>
                        <td>Less than or equal to</td>
                        <td><code>&lt;=30</code> (values less than or equal to 30)</td>
                      </tr>
                      <tr>
                        <td><code>=</code></td>
                        <td>Equal to</td>
                        <td><code>=30</code> (values equal to 30)</td>
                      </tr>
                      <tr>
                        <td><code>!=</code></td>
                        <td>Not equal to</td>
                        <td><code>!=30</code> (values not equal to 30)</td>
                      </tr>
                      <tr>
                        <td>(none)</td>
                        <td>Contains (for strings)</td>
                        <td><code>john</code> (values containing "john")</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <p>The filtering behavior adapts based on the column's data type:</p>
                  <ul>
                    <li><strong>String columns:</strong> Default behavior is "contains" (case-insensitive)</li>
                    <li><strong>Number columns:</strong> Supports all comparison operators</li>
                    <li><strong>Date columns:</strong> Supports all comparison operators (use ISO format: YYYY-MM-DD)</li>
                    <li><strong>Boolean columns:</strong> Supports equality operators (true/false, yes/no, 1/0)</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Filter Model</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid uses a filter model to track the current filtering state. The filter model is an object where keys are column fields and values are filter criteria:</p>
                  
                  <pre className="docs-code-block">{`// Example filter model
const filterModel = {
  age: '>30',
  name: 'john',
  isActive: 'true'
};`}</pre>
                  
                  <p>You can control filtering programmatically by providing a <code>filterModel</code> prop and handling filter changes:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const FilteringExample = () => {
  const [filterModel, setFilterModel] = useState({ age: '>30' });
  
  const handleFilterChange = (newFilterModel) => {
    setFilterModel(newFilterModel);
    // You can perform additional actions here, such as fetching filtered data from an API
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      filterable={true}
      filterModel={filterModel}
      onFilterChange={handleFilterChange}
    />
  );
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Filter Functions</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can customize the filtering behavior for specific columns by providing a <code>filterFunction</code> in the column definition:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    filter: true,
    // Custom filter function for case-sensitive filtering
    filterFunction: (value, filterValue) => {
      if (!filterValue) return true;
      return String(value).includes(filterValue); // Case-sensitive contains
    }
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 200,
    filter: true,
    // Custom filter function for array values
    filterFunction: (value, filterValue) => {
      if (!filterValue || !Array.isArray(value)) return true;
      return value.some(tag => tag.toLowerCase().includes(filterValue.toLowerCase()));
    }
  }
];`}</pre>
                  
                  <p>The <code>filterFunction</code> receives two parameters:</p>
                  <ul>
                    <li><code>value</code>: The cell value to filter</li>
                    <li><code>filterValue</code>: The filter value entered by the user</li>
                  </ul>
                  
                  <p>The function should return <code>true</code> if the row should be included in the filtered results, or <code>false</code> if it should be excluded.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Global Search</h3>
                </div>
                <div className="docs-card-body">
                  <p>In addition to column-specific filtering, the Data Grid also supports global search across all columns. To enable global search:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  enableGlobalSearch={true}
/>`}</pre>
                  
                  <p>You can also provide a custom search function to control how the global search works:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  enableGlobalSearch={true}
  globalSearchFunction={(row, searchTerm) => {
    // Custom implementation to determine if a row matches the search term
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }}
/>`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Server-Side Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>For large datasets, you may want to implement server-side filtering. To do this:</p>
                  
                  <ol>
                    <li>
                      <p>Set <code>serverSideFilter</code> to <code>true</code> to disable client-side filtering:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  filterable={true}
  serverSideFilter={true}
  filterModel={filterModel}
  onFilterChange={handleFilterChange}
/>`}</pre>
                    </li>
                    <li>
                      <p>Implement the <code>onFilterChange</code> handler to fetch filtered data from your server:</p>
                      <pre className="docs-code-block">{`const handleFilterChange = async (newFilterModel) => {
  setFilterModel(newFilterModel);
  setLoading(true);
  
  try {
    // Convert filter model to query parameters
    const filterParams = Object.entries(newFilterModel)
      .map(([field, value]) => \`\${field}=\${encodeURIComponent(value)}\`)
      .join('&');
    
    // Fetch filtered data from your API
    const response = await fetch(\`/api/data?\${filterParams}\`);
    const filteredData = await response.json();
    
    // Update the data state
    setData(filteredData);
  } catch (error) {
    console.error('Error fetching filtered data:', error);
  } finally {
    setLoading(false);
  }
};`}</pre>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Implementing Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing filtering functionality with expression-based filters:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const FilteringExample = () => {
  // Define columns with filtering enabled
  const columns: ColumnDefinition[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70, 
      type: 'number',
      filter: true
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150,
      filter: true
    },
    { 
      field: 'age', 
      headerName: 'Age', 
      width: 100, 
      type: 'number',
      filter: true
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      filter: true
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      type: 'boolean',
      filter: true
    }
  ];
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', isActive: true },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', isActive: false },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', isActive: true },
    { id: 4, name: 'Alice Brown', age: 22, email: 'alice@example.com', isActive: true },
    { id: 5, name: 'Charlie Wilson', age: 37, email: 'charlie@example.com', isActive: false }
  ];
  
  // State for filter model
  const [filterModel, setFilterModel] = useState({
    age: '>30',
    isActive: 'true'
  });
  
  // Handle filter changes
  const handleFilterChange = (newFilterModel) => {
    setFilterModel(newFilterModel);
    console.log('Filter changed:', newFilterModel);
  };
  
  return (
    <div>
      <h3>Current Filters:</h3>
      <pre>{JSON.stringify(filterModel, null, 2)}</pre>
      
      <Grid 
        columns={columns} 
        data={data} 
        filterable={true}
        filterModel={filterModel}
        onFilterChange={handleFilterChange}
      />
      
      <div className="docs-filter-examples">
        <h4>Try these filter expressions:</h4>
        <ul>
          <li>Age: <code>&gt;30</code> (greater than 30)</li>
          <li>Age: <code>&lt;=25</code> (less than or equal to 25)</li>
          <li>Name: <code>jo</code> (contains "jo")</li>
          <li>Status: <code>true</code> or <code>false</code></li>
        </ul>
      </div>
    </div>
  );
};

export default FilteringExample;`}</pre>
                </div>
              </div>
            </section>
          )}
          
          {/* Pagination Page */}
          {activeTab === 'pagination' && (
            <section className="docs-section" id="pagination">
              <div className="docs-section-header">
                <h2>Pagination</h2>
                <p>Learn how to implement and customize pagination functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Pagination</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in pagination functionality that allows users to navigate through large datasets page by page. To enable pagination:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  pagination={true}
  pageSize={10}
/>`}</pre>
                  
                  <p>When pagination is enabled, the grid will display a pagination control at the bottom, allowing users to navigate between pages.</p>
                  
                  <p>The basic pagination props include:</p>
                  <ul>
                    <li><code>pagination</code>: Boolean to enable/disable pagination</li>
                    <li><code>pageSize</code>: Number of rows to display per page (default: 10)</li>
                    <li><code>page</code>: Current page number (0-based, optional for controlled pagination)</li>
                    <li><code>onPageChange</code>: Callback function when page changes (optional for controlled pagination)</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Page Size Options</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can allow users to change the number of rows displayed per page by providing page size options:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  pagination={true}
  pageSize={10}
  pageSizeOptions={[5, 10, 25, 50, 100]}
  onPageSizeChange={(newPageSize) => console.log('Page size changed:', newPageSize)}
/>`}</pre>
                  
                  <p>When <code>pageSizeOptions</code> is provided, a dropdown menu will appear in the pagination control, allowing users to select from the available page sizes.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Controlled Pagination</h3>
                </div>
                <div className="docs-card-body">
                  <p>For more control over pagination behavior, you can implement controlled pagination by managing the page state in your component:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const PaginationExample = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    console.log('Page changed:', newPage);
  };
  
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when page size changes
    console.log('Page size changed:', newPageSize);
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      pagination={true}
      page={page}
      pageSize={pageSize}
      pageSizeOptions={[5, 10, 25, 50]}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};`}</pre>
                  
                  <p>With controlled pagination, you have full control over the current page and page size, allowing you to implement custom pagination logic or integrate with external data sources.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Pagination Component</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can provide a custom pagination component to replace the default pagination control:</p>
                  
                  <pre className="docs-code-block">{`import React from 'react';
import Grid from 'data-grid-component';

// Custom pagination component
const CustomPagination = ({ 
  page, 
  pageSize, 
  totalRows, 
  onPageChange, 
  onPageSizeChange, 
  pageSizeOptions 
}) => {
  const totalPages = Math.ceil(totalRows / pageSize);
  
  return (
    <div className="custom-pagination">
      <button 
        onClick={() => onPageChange(0)} 
        disabled={page === 0}
      >
        First
      </button>
      
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 0}
      >
        Previous
      </button>
      
      <span>
        Page {page + 1} of {totalPages}
      </span>
      
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
      
      <button 
        onClick={() => onPageChange(totalPages - 1)} 
        disabled={page >= totalPages - 1}
      >
        Last
      </button>
      
      <select 
        value={pageSize} 
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {pageSizeOptions.map(option => (
          <option key={option} value={option}>
            {option} rows
          </option>
        ))}
      </select>
    </div>
  );
};

// Usage in Grid
const PaginationExample = () => {
  return (
    <Grid 
      columns={columns} 
      data={data} 
      pagination={true}
      pageSize={10}
      paginationComponent={CustomPagination}
    />
  );
};`}</pre>
                  
                  <p>The custom pagination component receives the following props:</p>
                  <ul>
                    <li><code>page</code>: Current page number (0-based)</li>
                    <li><code>pageSize</code>: Current page size</li>
                    <li><code>totalRows</code>: Total number of rows in the dataset</li>
                    <li><code>onPageChange</code>: Function to call when page changes</li>
                    <li><code>onPageSizeChange</code>: Function to call when page size changes</li>
                    <li><code>pageSizeOptions</code>: Available page size options</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Server-Side Pagination</h3>
                </div>
                <div className="docs-card-body">
                  <p>For large datasets, you may want to implement server-side pagination. To do this:</p>
                  
                  <ol>
                    <li>
                      <p>Set <code>serverSidePagination</code> to <code>true</code> to disable client-side pagination:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={currentPageData} 
  pagination={true}
  serverSidePagination={true}
  page={page}
  pageSize={pageSize}
  totalRows={totalRowCount}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>`}</pre>
                    </li>
                    <li>
                      <p>Implement the page change handlers to fetch data from your server:</p>
                      <pre className="docs-code-block">{`const handlePageChange = async (newPage) => {
  setPage(newPage);
  setLoading(true);
  
  try {
    // Fetch data for the new page from your API
    const response = await fetch(\`/api/data?page=\${newPage}&pageSize=\${pageSize}\`);
    const result = await response.json();
    
    // Update the data state with the new page data
    setCurrentPageData(result.data);
    setTotalRowCount(result.totalCount);
  } catch (error) {
    console.error('Error fetching page data:', error);
  } finally {
    setLoading(false);
  }
};

const handlePageSizeChange = async (newPageSize) => {
  setPageSize(newPageSize);
  setPage(0); // Reset to first page
  setLoading(true);
  
  try {
    // Fetch data with the new page size
    const response = await fetch(\`/api/data?page=0&pageSize=\${newPageSize}\`);
    const result = await response.json();
    
    // Update the data state
    setCurrentPageData(result.data);
    setTotalRowCount(result.totalCount);
  } catch (error) {
    console.error('Error fetching page data:', error);
  } finally {
    setLoading(false);
  }
};`}</pre>
                    </li>
                  </ol>
                  
                  <p>With server-side pagination, you only need to provide the data for the current page to the grid, along with the total row count for proper pagination calculations.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Implementing Pagination</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing pagination functionality:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState, useMemo } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const PaginationExample = () => {
  // Define columns
  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'email', headerName: 'Email', width: 200 }
  ];
  
  // Sample data (100 rows)
  const allData = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: \`Person \${index + 1}\`,
      age: 20 + (index % 30),
      email: \`person\${index + 1}@example.com\`
    }));
  }, []);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when page size changes
  };
  
  return (
    <div>
      <h3>Pagination Example</h3>
      <p>Current Page: {page + 1}, Page Size: {pageSize}</p>
      
      <Grid 
        columns={columns} 
        data={allData} 
        pagination={true}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 25, 50]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      
      <div className="pagination-info">
        <p>
          Showing rows {page * pageSize + 1} to {Math.min((page + 1) * pageSize, allData.length)} of {allData.length}
        </p>
      </div>
    </div>
  );
};

export default PaginationExample;`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Pagination with Sorting and Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>When combining pagination with sorting and filtering, the Data Grid handles these features in the following order:</p>
                  
                  <ol>
                    <li>First, the data is filtered based on the current filter criteria</li>
                    <li>Then, the filtered data is sorted based on the current sort model</li>
                    <li>Finally, the sorted and filtered data is paginated based on the current page and page size</li>
                  </ol>
                  
                  <p>This ensures that pagination works correctly with the filtered and sorted data:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  sortable={true}
  filterable={true}
  pagination={true}
  pageSize={10}
  sortModel={sortModel}
  onSortChange={handleSortChange}
  filterModel={filterModel}
  onFilterChange={handleFilterChange}
  page={page}
  onPageChange={handlePageChange}
/>`}</pre>
                  
                  <p>When using server-side data processing, you'll need to handle the combination of sorting, filtering, and pagination in your API requests:</p>
                  
                  <pre className="docs-code-block">{`const fetchData = async () => {
  setLoading(true);
  
  try {
    // Construct query parameters for sorting, filtering, and pagination
    const params = new URLSearchParams();
    
    // Add pagination parameters
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    // Add sorting parameters
    if (sortModel) {
      params.append('sortField', sortModel.field);
      params.append('sortDirection', sortModel.direction);
    }
    
    // Add filtering parameters
    if (filterModel) {
      Object.entries(filterModel).forEach(([field, value]) => {
        params.append(\`filter[\${field}]\`, value);
      });
    }
    
    // Fetch data from your API
    const response = await fetch(\`/api/data?\${params.toString()}\`);
    const result = await response.json();
    
    // Update the data state
    setData(result.data);
    setTotalRowCount(result.totalCount);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};`}</pre>
                </div>
              </div>
            </section>
          )}
          
          {/* Virtualization Page */}
          {activeTab === 'virtualization' && (
            <section className="docs-section" id="virtualization">
              <div className="docs-section-header">
                <h2>Virtualization</h2>
                <p>Learn how to implement virtualization to efficiently handle large datasets in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>What is Virtualization?</h3>
                </div>
                <div className="docs-card-body">
                  <p>Virtualization is a technique that renders only the visible rows and columns in the viewport, rather than rendering the entire dataset. This significantly improves performance when working with large datasets by:</p>
                  
                  <ul>
                    <li>Reducing the number of DOM elements created and managed</li>
                    <li>Minimizing memory usage</li>
                    <li>Improving rendering and scrolling performance</li>
                    <li>Enabling smooth interaction with datasets containing thousands or even millions of rows</li>
                  </ul>
                  
                  <p>The Data Grid component uses virtualization to efficiently handle large datasets without sacrificing performance or user experience.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Enabling Virtualization</h3>
                </div>
                <div className="docs-card-body">
                  <p>Virtualization is automatically enabled when the number of rows exceeds a certain threshold (default: 100 rows). You can explicitly enable or disable virtualization using the <code>virtualization</code> prop:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={largeDataset} 
  virtualization={true}
  maxHeight={400}
/>`}</pre>
                  
                  <p>Key virtualization props include:</p>
                  <ul>
                    <li><code>virtualization</code>: Boolean to enable/disable virtualization</li>
                    <li><code>maxHeight</code>: Maximum height of the grid in pixels (required for virtualization)</li>
                    <li><code>rowHeight</code>: Fixed height of each row in pixels (default: 35)</li>
                    <li><code>overscanRowCount</code>: Number of additional rows to render above and below the visible area (default: 10)</li>
                  </ul>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> For virtualization to work properly, you must specify a <code>maxHeight</code> for the grid and ensure that rows have a fixed height.
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Fixed Row Height</h3>
                </div>
                <div className="docs-card-body">
                  <p>Virtualization requires a fixed row height to calculate which rows should be rendered. By default, the Data Grid uses a row height of 35 pixels, but you can customize this using the <code>rowHeight</code> prop:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={largeDataset} 
  virtualization={true}
  maxHeight={400}
  rowHeight={50} // Set custom row height to 50 pixels
/>`}</pre>
                  
                  <p>When using a custom row height, make sure that your CSS styles for rows and cells are consistent with this height to avoid layout issues.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Overscan Row Count</h3>
                </div>
                <div className="docs-card-body">
                  <p>The <code>overscanRowCount</code> prop determines how many additional rows are rendered above and below the visible area. This helps prevent blank areas during fast scrolling:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={largeDataset} 
  virtualization={true}
  maxHeight={400}
  overscanRowCount={20} // Render 20 additional rows above and below the visible area
/>`}</pre>
                  
                  <p>A higher overscan value provides smoother scrolling but increases the number of rendered DOM elements. The default value of 10 works well for most use cases, but you can adjust it based on your specific requirements:</p>
                  
                  <ul>
                    <li>Increase the value for smoother scrolling on high-performance devices</li>
                    <li>Decrease the value for better performance on low-end devices</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Horizontal Virtualization</h3>
                </div>
                <div className="docs-card-body">
                  <p>In addition to vertical virtualization (rows), the Data Grid also supports horizontal virtualization (columns) for datasets with many columns. Horizontal virtualization is automatically enabled when the number of columns exceeds a certain threshold (default: 20 columns).</p>
                  
                  <p>You can explicitly enable or disable horizontal virtualization using the <code>horizontalVirtualization</code> prop:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={manyColumns} 
  data={data} 
  virtualization={true}
  horizontalVirtualization={true}
  maxHeight={400}
  maxWidth={800}
/>`}</pre>
                  
                  <p>For horizontal virtualization to work properly, you should:</p>
                  <ul>
                    <li>Specify a <code>maxWidth</code> for the grid</li>
                    <li>Ensure that columns have fixed widths defined in their column definitions</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Performance Considerations</h3>
                </div>
                <div className="docs-card-body">
                  <p>When working with large datasets, consider the following performance tips:</p>
                  
                  <ol>
                    <li>
                      <p><strong>Memoize data and columns:</strong> Use <code>useMemo</code> to prevent unnecessary re-creation of large datasets and column definitions:</p>
                      <pre className="docs-code-block">{`const columns = useMemo(() => [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  // More columns...
], []);

const data = useMemo(() => generateLargeDataset(10000), []);`}</pre>
                    </li>
                    <li>
                      <p><strong>Avoid complex cell renderers:</strong> Keep cell rendering functions simple and efficient:</p>
                      <pre className="docs-code-block">{`// Good - Simple and efficient
const renderCell = (value) => <span className="status">{value ? 'Active' : 'Inactive'}</span>;

// Avoid - Complex and potentially slow
const renderCell = (value) => {
  // Complex calculations or component trees can slow down rendering
  const result = performComplexCalculation(value);
  return (
    <div className="complex-cell">
      <div className="nested">
        <span>{result}</span>
        <OtherComponent />
      </div>
    </div>
  );
};`}</pre>
                    </li>
                    <li>
                      <p><strong>Use server-side operations:</strong> For very large datasets, consider implementing server-side sorting, filtering, and pagination:</p>
                      <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={currentPageData} 
  virtualization={true}
  maxHeight={400}
  serverSideSort={true}
  serverSideFilter={true}
  serverSidePagination={true}
  // Handlers for server-side operations
  onSortChange={handleSortChange}
  onFilterChange={handleFilterChange}
  onPageChange={handlePageChange}
/>`}</pre>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Virtualized Grid with Large Dataset</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing a virtualized grid with a large dataset:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState, useMemo } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const VirtualizationExample = () => {
  // Define columns
  const columns: ColumnDefinition[] = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', sortable: true },
    { field: 'name', headerName: 'Name', width: 150, sortable: true, filter: true },
    { field: 'age', headerName: 'Age', width: 100, type: 'number', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', width: 200, sortable: true, filter: true },
    { field: 'address', headerName: 'Address', width: 250, sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', width: 150, sortable: true, filter: true },
    { field: 'company', headerName: 'Company', width: 180, sortable: true, filter: true },
    { field: 'department', headerName: 'Department', width: 150, sortable: true, filter: true }
  ], []);
  
  // Generate large dataset (2,000 rows)
  const data = useMemo(() => {
    return Array.from({ length: 2000 }, (_, index) => ({
      id: index + 1,
      name: \`Person \${index + 1}\`,
      age: 20 + (index % 40),
      email: \`person\${index + 1}@example.com\`,
      address: \`\${index + 100} Main Street, City \${index % 100}\`,
      phone: \`(555) \${String(index).padStart(3, '0')}-\${String(index + 1000).slice(1)}\`,
      company: \`Company \${index % 50}\`,
      department: \`Department \${index % 10}\`
    }));
  }, []);
  
  // State for sorting
  const [sortModel, setSortModel] = useState({ field: 'id', direction: 'asc' });
  
  // Handle sort changes
  const handleSortChange = (newSortModel) => {
    setSortModel(newSortModel);
  };
  
  return (
    <div>
      <h3>Virtualized Grid with 2,000 Rows</h3>
      <p>This example demonstrates virtualization with a large dataset of 2,000 rows.</p>
      
      <div className="virtualization-stats">
        <p><strong>Total Rows:</strong> {data.length}</p>
        <p><strong>Total Columns:</strong> {columns.length}</p>
        <p><strong>Sorting:</strong> {sortModel.field} ({sortModel.direction})</p>
      </div>
      
      <div className="grid-container" style={{ height: '500px', width: '100%' }}>
        <Grid 
          columns={columns} 
          data={data} 
          virtualization={true}
          maxHeight={450}
          rowHeight={40}
          overscanRowCount={15}
          sortable={true}
          filterable={true}
          resizableColumns={true}
          sortModel={sortModel}
          onSortChange={handleSortChange}
        />
      </div>
      
      <div className="virtualization-note">
        <p>
          <strong>Note:</strong> Even with 2,000 rows, the grid maintains smooth scrolling and 
          responsive interactions thanks to virtualization. Only the visible rows are rendered 
          in the DOM, significantly reducing memory usage and improving performance.
        </p>
      </div>
    </div>
  );
};

export default VirtualizationExample;`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Virtualization with Dynamic Row Heights</h3>
                </div>
                <div className="docs-card-body">
                  <p>While the standard virtualization implementation requires fixed row heights, you can implement dynamic row height virtualization for more complex use cases:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  virtualization={true}
  dynamicRowHeight={true}
  getRowHeight={(rowData) => {
    // Calculate row height based on content
    return rowData.hasDetails ? 80 : 40;
  }}
  maxHeight={400}
/>`}</pre>
                  
                  <p>When using dynamic row heights:</p>
                  <ul>
                    <li>Performance may be slightly reduced compared to fixed row heights</li>
                    <li>The <code>getRowHeight</code> function should be memoized to prevent unnecessary recalculations</li>
                    <li>Row height calculations should be as efficient as possible</li>
                  </ul>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> Dynamic row height virtualization is an advanced feature and may not be necessary for most use cases. Consider using fixed row heights when possible for optimal performance.
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Cell Editing Page */}
          {activeTab === 'cell-editing' && (
            <section className="docs-section" id="cell-editing">
              <div className="docs-section-header">
                <h2>Cell Editing</h2>
                <p>Learn how to implement and customize cell editing functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Cell Editing</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in cell editing functionality that allows users to edit cell values directly in the grid. To enable cell editing:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  editable={true}
  onCellValueChange={handleCellValueChange}
/>`}</pre>
                  
                  <p>When cell editing is enabled, users can double-click on a cell (or press Enter when a cell is focused) to enter edit mode. The edited value is submitted when the user presses Enter or clicks outside the cell.</p>
                  
                  <p>The <code>onCellValueChange</code> callback is called when a cell value is changed, providing the following information:</p>
                  <pre className="docs-code-block">{`const handleCellValueChange = (params) => {
  // params contains:
  // - rowIndex: Index of the edited row
  // - field: Field name of the edited cell
  // - oldValue: Previous value of the cell
  // - newValue: New value of the cell
  // - rowData: Data of the entire row
  
  console.log('Cell value changed:', params);
  
  // Update your data source with the new value
  // For example, if using React state:
  setData(prevData => {
    const newData = [...prevData];
    newData[params.rowIndex][params.field] = params.newValue;
    return newData;
  });
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Column-Specific Editing</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can control which columns are editable by setting the <code>editable</code> property in the column definition:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    editable: false // This column will NOT be editable
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    editable: true // This column will be editable
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    width: 100, 
    type: 'number',
    editable: true // This column will be editable
  }
];`}</pre>
                  
                  <p>When <code>editable</code> is set to <code>true</code> at the grid level, only columns with <code>editable: true</code> will be editable. If <code>editable</code> is not specified for a column, it inherits the grid-level setting.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Edit Types and Validation</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid provides different edit types based on the column's data type. You can also add validation to ensure that edited values meet specific criteria:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    editable: true,
    // Text input validation
    validateCell: (value) => {
      if (!value || value.trim() === '') {
        return { valid: false, message: 'Name cannot be empty' };
      }
      return { valid: true };
    }
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    width: 100, 
    type: 'number',
    editable: true,
    // Number input validation
    validateCell: (value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { valid: false, message: 'Age must be a number' };
      }
      if (numValue < 0 || numValue > 120) {
        return { valid: false, message: 'Age must be between 0 and 120' };
      }
      return { valid: true };
    }
  },
  {
    field: 'isActive',
    headerName: 'Status',
    width: 100,
    type: 'boolean',
    editable: true
    // Boolean values are automatically validated
  },
  {
    field: 'birthDate',
    headerName: 'Birth Date',
    width: 150,
    type: 'date',
    editable: true,
    // Date validation
    validateCell: (value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { valid: false, message: 'Invalid date format' };
      }
      if (date > new Date()) {
        return { valid: false, message: 'Birth date cannot be in the future' };
      }
      return { valid: true };
    }
  }
];`}</pre>
                  
                  <p>The <code>validateCell</code> function receives the edited value and should return an object with:</p>
                  <ul>
                    <li><code>valid</code>: Boolean indicating if the value is valid</li>
                    <li><code>message</code>: Error message to display if the value is invalid</li>
                  </ul>
                  
                  <p>When validation fails, the error message is displayed to the user, and they cannot exit edit mode until they provide a valid value or press Escape to cancel the edit.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Edit Components</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can provide custom edit components for specific columns using the <code>renderEditCell</code> property:</p>
                  
                  <pre className="docs-code-block">{`import React from 'react';
import Grid from 'data-grid-component';
import Select from 'your-select-component';

// Custom dropdown editor component
const DropdownEditor = ({ value, options, onChange, onBlur }) => {
  return (
    <Select
      value={value}
      options={options}
      onChange={(newValue) => onChange(newValue)}
      onBlur={onBlur}
      autoFocus
    />
  );
};

// Usage in column definition
const columns = [
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true,
    renderEditCell: (params) => (
      <DropdownEditor
        value={params.value}
        options={[
          { value: 'electronics', label: 'Electronics' },
          { value: 'clothing', label: 'Clothing' },
          { value: 'books', label: 'Books' },
          { value: 'food', label: 'Food' }
        ]}
        onChange={params.onChange}
        onBlur={params.onBlur}
      />
    )
  }
];`}</pre>
                  
                  <p>The <code>renderEditCell</code> function receives the following parameters:</p>
                  <ul>
                    <li><code>value</code>: Current cell value</li>
                    <li><code>rowData</code>: Data of the entire row</li>
                    <li><code>field</code>: Field name of the cell</li>
                    <li><code>rowIndex</code>: Index of the row</li>
                    <li><code>onChange</code>: Function to call when the value changes</li>
                    <li><code>onBlur</code>: Function to call when the editor loses focus</li>
                  </ul>
                  
                  <p>Your custom edit component should handle focus management, value changes, and blur events to ensure a smooth editing experience.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Edit Events and Callbacks</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid provides several callbacks to handle different stages of the editing process:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  editable={true}
  onCellEditStart={(params) => console.log('Edit started:', params)}
  onCellValueChange={(params) => console.log('Value changed:', params)}
  onCellEditCancel={(params) => console.log('Edit canceled:', params)}
  onCellEditCommit={(params) => console.log('Edit committed:', params)}
/>`}</pre>
                  
                  <p>These callbacks provide fine-grained control over the editing process:</p>
                  <ul>
                    <li><code>onCellEditStart</code>: Called when a cell enters edit mode</li>
                    <li><code>onCellValueChange</code>: Called when a cell value is changed</li>
                    <li><code>onCellEditCancel</code>: Called when editing is canceled (e.g., by pressing Escape)</li>
                    <li><code>onCellEditCommit</code>: Called when editing is committed (e.g., by pressing Enter or clicking outside)</li>
                  </ul>
                  
                  <p>You can use these callbacks to implement custom logic, such as:</p>
                  <ul>
                    <li>Logging edit operations</li>
                    <li>Implementing undo/redo functionality</li>
                    <li>Sending updates to a server</li>
                    <li>Preventing edits under certain conditions</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Controlled Editing</h3>
                </div>
                <div className="docs-card-body">
                  <p>For more control over the editing process, you can implement controlled editing by managing the edit state in your component:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const ControlledEditingExample = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 45 }
  ]);
  
  const [editingCell, setEditingCell] = useState(null);
  
  const handleEditStart = (params) => {
    setEditingCell({ rowIndex: params.rowIndex, field: params.field });
  };
  
  const handleValueChange = (params) => {
    // Update data with the new value
    setData(prevData => {
      const newData = [...prevData];
      newData[params.rowIndex][params.field] = params.newValue;
      return newData;
    });
  };
  
  const handleEditEnd = () => {
    setEditingCell(null);
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      editable={true}
      editingCell={editingCell}
      onCellEditStart={handleEditStart}
      onCellValueChange={handleValueChange}
      onCellEditCommit={handleEditEnd}
      onCellEditCancel={handleEditEnd}
    />
  );
};`}</pre>
                  
                  <p>With controlled editing, you have full control over which cell is in edit mode and how values are updated, allowing for more complex editing scenarios.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Implementing Cell Editing</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing cell editing functionality with validation:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const CellEditingExample = () => {
  // Define columns with editing enabled
  const columns: ColumnDefinition[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70, 
      type: 'number',
      editable: false // ID is not editable
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150,
      editable: true,
      validateCell: (value) => {
        if (!value || value.trim() === '') {
          return { valid: false, message: 'Name cannot be empty' };
        }
        return { valid: true };
      }
    },
    { 
      field: 'age', 
      headerName: 'Age', 
      width: 100, 
      type: 'number',
      editable: true,
      validateCell: (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return { valid: false, message: 'Age must be a number' };
        }
        if (numValue < 0 || numValue > 120) {
          return { valid: false, message: 'Age must be between 0 and 120' };
        }
        return { valid: true };
      }
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      editable: true,
      validateCell: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          return { valid: false, message: 'Please enter a valid email address' };
        }
        return { valid: true };
      }
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      type: 'boolean',
      editable: true,
      renderCell: (value) => (
        <span className={value ? 'status-active' : 'status-inactive'}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];
  
  // Sample data
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', isActive: true },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', isActive: false },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', isActive: true },
    { id: 4, name: 'Alice Brown', age: 22, email: 'alice@example.com', isActive: true },
    { id: 5, name: 'Charlie Wilson', age: 37, email: 'charlie@example.com', isActive: false }
  ]);
  
  // Track edit history for undo functionality
  const [editHistory, setEditHistory] = useState([]);
  
  // Handle cell value changes
  const handleCellValueChange = (params) => {
    // Save the old value to history for undo
    setEditHistory(prev => [...prev, { 
      rowIndex: params.rowIndex, 
      field: params.field, 
      oldValue: params.oldValue 
    }]);
    
    // Update data with the new value
    setData(prevData => {
      const newData = [...prevData];
      newData[params.rowIndex][params.field] = params.newValue;
      return newData;
    });
    
    console.log('Cell value changed:', params);
  };
  
  // Undo the last edit
  const handleUndo = () => {
    if (editHistory.length === 0) return;
    
    const lastEdit = editHistory[editHistory.length - 1];
    
    // Restore the old value
    setData(prevData => {
      const newData = [...prevData];
      newData[lastEdit.rowIndex][lastEdit.field] = lastEdit.oldValue;
      return newData;
    });
    
    // Remove the last edit from history
    setEditHistory(prev => prev.slice(0, -1));
  };
  
  return (
    <div>
      <h3>Cell Editing Example</h3>
      <p>Double-click on a cell or press Enter when a cell is focused to edit its value.</p>
      
      <div className="edit-controls">
        <button 
          onClick={handleUndo} 
          disabled={editHistory.length === 0}
        >
          Undo Last Edit
        </button>
        <span className="edit-count">
          {editHistory.length} {editHistory.length === 1 ? 'edit' : 'edits'} made
        </span>
      </div>
      
      <Grid 
        columns={columns} 
        data={data} 
        editable={true}
        onCellValueChange={handleCellValueChange}
      />
      
      <div className="edit-instructions">
        <h4>Try editing these cells:</h4>
        <ul>
          <li>Name: Cannot be empty</li>
          <li>Age: Must be a number between 0 and 120</li>
          <li>Email: Must be a valid email address</li>
          <li>Status: Toggle between Active and Inactive</li>
        </ul>
      </div>
    </div>
  );
};

export default CellEditingExample;`}</pre>
                </div>
              </div>
            </section>
          )}
          
          {/* Row Selection Page */}
          {activeTab === 'row-selection' && (
            <section className="docs-section" id="row-selection">
              <div className="docs-section-header">
                <h2>Row Selection</h2>
                <p>Learn how to implement and customize row selection functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Row Selection</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in row selection functionality that allows users to select one or multiple rows. To enable row selection:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row" // Enable row selection
  onRowSelect={handleRowSelect}
/>`}</pre>
                  
                  <p>When row selection is enabled, users can click on a row to select it. The selected row will be highlighted with a different background color.</p>
                  
                  <p>The <code>onRowSelect</code> callback is called when a row is selected, providing the following information:</p>
                  <pre className="docs-code-block">{`const handleRowSelect = (params) => {
  // params contains:
  // - rowIndex: Index of the selected row
  // - rowData: Data of the selected row
  // - isSelected: Whether the row is selected or deselected
  // - selectedRows: Array of all currently selected row indices
  
  console.log('Row selected:', params);
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Selection Modes</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid supports different selection modes to control how rows can be selected:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row"
  selectionMode="single" // or "multiple" or "none"
  onRowSelect={handleRowSelect}
/>`}</pre>
                  
                  <p>Available selection modes:</p>
                  <ul>
                    <li><code>single</code>: Only one row can be selected at a time (default)</li>
                    <li><code>multiple</code>: Multiple rows can be selected using Ctrl/Cmd+Click or Shift+Click</li>
                    <li><code>none</code>: Row selection is disabled</li>
                  </ul>
                  
                  <p>In multiple selection mode, users can:</p>
                  <ul>
                    <li>Click on a row to select it (deselecting any previously selected rows)</li>
                    <li>Ctrl/Cmd+Click to toggle selection of a row without affecting other selections</li>
                    <li>Shift+Click to select a range of rows between the last selected row and the clicked row</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Checkbox Selection</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can add checkboxes to rows for a more explicit selection UI:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row"
  selectionMode="multiple"
  checkboxSelection={true}
  onRowSelect={handleRowSelect}
/>`}</pre>
                  
                  <p>When <code>checkboxSelection</code> is enabled:</p>
                  <ul>
                    <li>A checkbox column is added as the first column in the grid</li>
                    <li>Users can select rows by clicking on the checkboxes</li>
                    <li>A header checkbox is added that allows selecting/deselecting all rows</li>
                  </ul>
                  
                  <p>You can customize the checkbox column:</p>
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row"
  selectionMode="multiple"
  checkboxSelection={true}
  checkboxColumn={{
    width: 50,
    headerName: '',
    field: 'selection',
    headerCheckbox: true, // Show header checkbox
    resizable: false
  }}
  onRowSelect={handleRowSelect}
/>`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Controlled Selection</h3>
                </div>
                <div className="docs-card-body">
                  <p>For more control over the selection state, you can implement controlled selection by managing the selected rows in your component:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const ControlledSelectionExample = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 45 }
  ]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleRowSelect = (params) => {
    if (params.isSelected) {
      setSelectedRows(params.selectedRows);
    } else {
      setSelectedRows(selectedRows.filter(rowIndex => rowIndex !== params.rowIndex));
    }
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      selectionModel="row"
      selectionMode="multiple"
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
    />
  );
};`}</pre>
                  
                  <p>With controlled selection, you have full control over which rows are selected, allowing for more complex selection scenarios.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Row Selection Events</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid provides several callbacks to handle different aspects of row selection:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row"
  selectionMode="multiple"
  onRowSelect={handleRowSelect}
  onRowClick={handleRowClick}
  onSelectionChange={handleSelectionChange}
/>`}</pre>
                  
                  <p>These callbacks provide fine-grained control over the selection process:</p>
                  <ul>
                    <li><code>onRowSelect</code>: Called when a row is selected or deselected</li>
                    <li><code>onRowClick</code>: Called when a row is clicked, regardless of selection state</li>
                    <li><code>onSelectionChange</code>: Called when the selection state changes, providing the complete list of selected rows</li>
                  </ul>
                  
                  <p>Example implementation:</p>
                  <pre className="docs-code-block">{`const handleRowSelect = (params) => {
  console.log('Row selected:', params.rowData);
  console.log('Is selected:', params.isSelected);
};

const handleRowClick = (params) => {
  console.log('Row clicked:', params.rowData);
};

const handleSelectionChange = (selectedRows) => {
  console.log('Selected rows:', selectedRows);
  console.log('Number of selected rows:', selectedRows.length);
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Disabling Selection for Specific Rows</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can disable selection for specific rows using the <code>isRowSelectable</code> prop:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="row"
  selectionMode="multiple"
  isRowSelectable={(rowData) => rowData.status !== 'locked'}
  onRowSelect={handleRowSelect}
/>`}</pre>
                  
                  <p>The <code>isRowSelectable</code> function receives the row data and should return a boolean indicating whether the row can be selected. In the example above, rows with a status of 'locked' cannot be selected.</p>
                  
                  <p>Non-selectable rows can be styled differently using CSS:</p>
                  <pre className="docs-code-block">{`.data-grid-row.non-selectable {
  opacity: 0.7;
  cursor: not-allowed;
}

.data-grid-row.non-selectable:hover {
  background-color: inherit; /* Prevent hover effect */
}`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Working with Selected Rows</h3>
                </div>
                <div className="docs-card-body">
                  <p>Once rows are selected, you can perform various operations on them:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const RowSelectionExample = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, status: 'active' },
    { id: 2, name: 'Jane Smith', age: 25, status: 'inactive' },
    { id: 3, name: 'Bob Johnson', age: 45, status: 'active' },
    { id: 4, name: 'Alice Brown', age: 22, status: 'active' },
    { id: 5, name: 'Charlie Wilson', age: 37, status: 'inactive' }
  ]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleSelectionChange = (selected) => {
    setSelectedRows(selected);
  };
  
  const handleDeleteSelected = () => {
    // Get the indices of selected rows
    const selectedIndices = selectedRows.map(rowIndex => rowIndex);
    
    // Filter out the selected rows
    const newData = data.filter((_, index) => !selectedIndices.includes(index));
    
    // Update the data
    setData(newData);
    
    // Clear selection
    setSelectedRows([]);
  };
  
  const handleActivateSelected = () => {
    // Create a new array with updated status for selected rows
    const newData = [...data];
    selectedRows.forEach(rowIndex => {
      newData[rowIndex] = { ...newData[rowIndex], status: 'active' };
    });
    
    // Update the data
    setData(newData);
  };
  
  return (
    <div>
      <div className="selection-controls">
        <button 
          onClick={handleDeleteSelected} 
          disabled={selectedRows.length === 0}
        >
          Delete Selected ({selectedRows.length})
        </button>
        <button 
          onClick={handleActivateSelected} 
          disabled={selectedRows.length === 0}
        >
          Activate Selected
        </button>
      </div>
      
      <Grid 
        columns={columns} 
        data={data} 
        selectionModel="row"
        selectionMode="multiple"
        checkboxSelection={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
      />
      
      {selectedRows.length > 0 && (
        <div className="selection-summary">
          <h4>Selected Rows:</h4>
          <ul>
            {selectedRows.map(rowIndex => (
              <li key={rowIndex}>
                {data[rowIndex].name} (ID: {data[rowIndex].id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};`}</pre>
                  
                  <p>This example demonstrates how to:</p>
                  <ul>
                    <li>Track selected rows using state</li>
                    <li>Perform bulk operations on selected rows (delete, update status)</li>
                    <li>Display a summary of selected rows</li>
                    <li>Enable/disable action buttons based on selection state</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Row and Cell Selection</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid also supports cell selection, which can be used alongside row selection:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  selectionModel="both" // Enable both row and cell selection
  selectionMode="multiple"
  onRowSelect={handleRowSelect}
  onCellSelect={handleCellSelect}
/>`}</pre>
                  
                  <p>Available selection models:</p>
                  <ul>
                    <li><code>row</code>: Only row selection is enabled</li>
                    <li><code>cell</code>: Only cell selection is enabled</li>
                    <li><code>both</code>: Both row and cell selection are enabled</li>
                    <li><code>none</code>: Selection is disabled</li>
                  </ul>
                  
                  <p>When both row and cell selection are enabled:</p>
                  <ul>
                    <li>Clicking on a row selects the entire row</li>
                    <li>Clicking on a cell selects that specific cell</li>
                    <li>Shift+Click can be used to select a range of cells</li>
                  </ul>
                  
                  <p>The <code>onCellSelect</code> callback provides information about the selected cell:</p>
                  <pre className="docs-code-block">{`const handleCellSelect = (params) => {
  // params contains:
  // - rowIndex: Index of the row containing the selected cell
  // - colIndex: Index of the column containing the selected cell
  // - field: Field name of the selected cell
  // - value: Value of the selected cell
  // - rowData: Data of the row containing the selected cell
  
  console.log('Cell selected:', params);
};`}</pre>
                </div>
              </div>
            </section>
          )}
          
          {/* Column Resizing Page */}
          {activeTab === 'column-resizing' && (
            <section className="docs-section" id="column-resizing">
              <div className="docs-section-header">
                <h2>Column Resizing</h2>
                <p>Learn how to implement and customize column resizing functionality in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Basic Column Resizing</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component provides built-in column resizing functionality that allows users to adjust column widths by dragging the column headers. To enable column resizing:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  resizableColumns={true}
/>`}</pre>
                  
                  <p>When column resizing is enabled, users can drag the right edge of a column header to adjust its width. A resize handle will appear when hovering over the edge of a column header.</p>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> Column resizing is disabled by default. You need to explicitly set <code>resizableColumns</code> to <code>true</code> to enable it.
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Column-Specific Resizing</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can control which columns are resizable by setting the <code>resizable</code> property in the column definition:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    resizable: false // This column will NOT be resizable
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    resizable: true // This column will be resizable
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    width: 100, 
    resizable: true // This column will be resizable
  }
];`}</pre>
                  
                  <p>When <code>resizableColumns</code> is set to <code>true</code> at the grid level, only columns with <code>resizable: true</code> will be resizable. If <code>resizable</code> is not specified for a column, it inherits the grid-level setting.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Resize Constraints</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can set minimum and maximum width constraints for resizable columns:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    resizable: true,
    minWidth: 100, // Minimum width in pixels
    maxWidth: 300  // Maximum width in pixels
  }
];`}</pre>
                  
                  <p>You can also set grid-level constraints that apply to all resizable columns:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  resizableColumns={true}
  minColumnWidth={80}  // Minimum width for all columns
  maxColumnWidth={500} // Maximum width for all columns
/>`}</pre>
                  
                  <p>Column-specific constraints take precedence over grid-level constraints. If both are specified, the more restrictive constraint is applied.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Resize Events</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid provides callbacks to handle column resize events:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  resizableColumns={true}
  onColumnResize={handleColumnResize}
  onColumnResizeStart={handleColumnResizeStart}
  onColumnResizeEnd={handleColumnResizeEnd}
/>`}</pre>
                  
                  <p>These callbacks provide information about the resize operation:</p>
                  <ul>
                    <li><code>onColumnResizeStart</code>: Called when a column resize operation starts</li>
                    <li><code>onColumnResize</code>: Called continuously during the resize operation</li>
                    <li><code>onColumnResizeEnd</code>: Called when a column resize operation ends</li>
                  </ul>
                  
                  <p>Example implementation:</p>
                  <pre className="docs-code-block">{`const handleColumnResize = (params) => {
  // params contains:
  // - field: Field name of the resized column
  // - width: New width of the column
  // - deltaX: Change in width from the original width
  
  console.log('Column resized:', params);
};

const handleColumnResizeStart = (params) => {
  console.log('Column resize started:', params);
};

const handleColumnResizeEnd = (params) => {
  console.log('Column resize ended:', params);
  
  // Update column widths in state if needed
  setColumnWidths(prevWidths => ({
    ...prevWidths,
    [params.field]: params.width
  }));
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Controlled Column Widths</h3>
                </div>
                <div className="docs-card-body">
                  <p>For more control over column widths, you can implement controlled column resizing by managing the column widths in your component:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState } from 'react';
import Grid from 'data-grid-component';

const ControlledResizingExample = () => {
  // Initial column definitions
  const initialColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 }
  ];
  
  // State to track column widths
  const [columns, setColumns] = useState(initialColumns);
  
  // Handle column resize
  const handleColumnResize = (params) => {
    setColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.field === params.field) {
          return { ...col, width: params.width };
        }
        return col;
      });
    });
  };
  
  return (
    <Grid 
      columns={columns} 
      data={data} 
      resizableColumns={true}
      onColumnResizeEnd={handleColumnResize}
    />
  );
};`}</pre>
                  
                  <p>With controlled column widths, you have full control over how column widths are updated, allowing for more complex scenarios such as:</p>
                  <ul>
                    <li>Persisting column widths between sessions</li>
                    <li>Implementing undo/redo functionality for resize operations</li>
                    <li>Synchronizing column widths across multiple grids</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Auto-Sizing Columns</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid provides auto-sizing functionality to automatically adjust column widths based on content:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  resizableColumns={true}
  autoSizeColumns={true} // Enable auto-sizing for all columns
/>`}</pre>
                  
                  <p>You can also auto-size specific columns:</p>
                  
                  <pre className="docs-code-block">{`const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    autoSize: true // This column will be auto-sized
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150 // This column will have a fixed width
  }
];`}</pre>
                  
                  <p>Auto-sizing can be triggered programmatically:</p>
                  
                  <pre className="docs-code-block">{`// Auto-size all columns
gridRef.current.autoSizeAllColumns();

// Auto-size a specific column
gridRef.current.autoSizeColumn('name');`}</pre>
                  
                  <p>Auto-sizing takes into account:</p>
                  <ul>
                    <li>Header content width</li>
                    <li>Cell content width for visible rows</li>
                    <li>Minimum and maximum width constraints</li>
                  </ul>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Resize Handle Customization</h3>
                </div>
                <div className="docs-card-body">
                  <p>You can customize the appearance of the resize handle using CSS:</p>
                  
                  <pre className="docs-code-block">{`.data-grid-resize-handle {
  width: 8px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  cursor: col-resize;
  z-index: 1;
}

.data-grid-resize-handle .resize-indicator {
  width: 2px;
  height: 100%;
  background-color: #ccc;
  margin: 0 auto;
  transition: background-color 0.2s;
}

.data-grid-resize-handle:hover .resize-indicator {
  background-color: #2196f3;
}`}</pre>
                  
                  <p>You can also provide a custom resize handle component:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={data} 
  resizableColumns={true}
  resizeHandleComponent={CustomResizeHandle}
/>`}</pre>
                  
                  <pre className="docs-code-block">{`const CustomResizeHandle = ({ onMouseDown }) => {
  return (
    <div 
      className="custom-resize-handle"
      onMouseDown={onMouseDown}
    >
      <div className="custom-resize-indicator" />
    </div>
  );
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Example: Implementing Column Resizing</h3>
                </div>
                <div className="docs-card-body">
                  <p>Here's a complete example of implementing column resizing functionality with persistence:</p>
                  
                  <pre className="docs-code-block">{`import React, { useState, useEffect, useRef } from 'react';
import Grid from 'data-grid-component';
import { ColumnDefinition } from 'data-grid-component/types';

const ColumnResizingExample = () => {
  // Initial column definitions
  const initialColumns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: 70, resizable: true },
    { field: 'name', headerName: 'Name', width: 150, resizable: true },
    { field: 'age', headerName: 'Age', width: 100, resizable: true },
    { field: 'email', headerName: 'Email', width: 200, resizable: true },
    { field: 'address', headerName: 'Address', width: 250, resizable: true }
  ];
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', address: '456 Oak Ave' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', address: '789 Pine Rd' },
    { id: 4, name: 'Alice Brown', age: 22, email: 'alice@example.com', address: '101 Maple Dr' },
    { id: 5, name: 'Charlie Wilson', age: 37, email: 'charlie@example.com', address: '202 Cedar Ln' }
  ];
  
  // Load saved column widths from localStorage
  const loadSavedWidths = () => {
    try {
      const savedWidths = localStorage.getItem('columnWidths');
      return savedWidths ? JSON.parse(savedWidths) : {};
    } catch (error) {
      console.error('Error loading saved column widths:', error);
      return {};
    }
  };
  
  // State to track column widths
  const [columnWidths, setColumnWidths] = useState(loadSavedWidths());
  
  // Apply saved widths to columns
  const columns = initialColumns.map(col => ({
    ...col,
    width: columnWidths[col.field] || col.width
  }));
  
  // Grid reference for auto-sizing
  const gridRef = useRef(null);
  
  // Handle column resize
  const handleColumnResize = (params) => {
    const newWidths = {
      ...columnWidths,
      [params.field]: params.width
    };
    
    setColumnWidths(newWidths);
    
    // Save to localStorage
    try {
      localStorage.setItem('columnWidths', JSON.stringify(newWidths));
    } catch (error) {
      console.error('Error saving column widths:', error);
    }
  };
  
  // Reset column widths to default
  const handleResetWidths = () => {
    setColumnWidths({});
    localStorage.removeItem('columnWidths');
  };
  
  // Auto-size all columns
  const handleAutoSizeAll = () => {
    if (gridRef.current) {
      gridRef.current.autoSizeAllColumns();
    }
  };
  
  // Track resize history for undo functionality
  const [resizeHistory, setResizeHistory] = useState([]);
  
  const handleColumnResizeStart = (params) => {
    // Save the original width before resize
    setResizeHistory(prev => [...prev, { 
      field: params.field, 
      width: params.width 
    }]);
  };
  
  // Undo the last resize
  const handleUndo = () => {
    if (resizeHistory.length === 0) return;
    
    const lastResize = resizeHistory[resizeHistory.length - 1];
    
    // Restore the original width
    const newWidths = {
      ...columnWidths,
      [lastResize.field]: lastResize.width
    };
    
    setColumnWidths(newWidths);
    localStorage.setItem('columnWidths', JSON.stringify(newWidths));
    
    // Remove the last resize from history
    setResizeHistory(prev => prev.slice(0, -1));
  };
  
  return (
    <div>
      <h3>Column Resizing Example</h3>
      <p>Drag the edge of a column header to resize it. Changes are automatically saved to localStorage.</p>
      
      <div className="resize-controls">
        <button onClick={handleResetWidths}>
          Reset to Default Widths
        </button>
        <button onClick={handleAutoSizeAll}>
          Auto-Size All Columns
        </button>
        <button 
          onClick={handleUndo} 
          disabled={resizeHistory.length === 0}
        >
          Undo Last Resize
        </button>
      </div>
      
      <Grid 
        ref={gridRef}
        columns={columns} 
        data={data} 
        resizableColumns={true}
        minColumnWidth={50}
        onColumnResizeStart={handleColumnResizeStart}
        onColumnResizeEnd={handleColumnResize}
      />
      
      <div className="resize-info">
        <h4>Current Column Widths:</h4>
        <pre className="docs-code-block">
          {JSON.stringify(columnWidths, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ColumnResizingExample;`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Column Resizing with Virtualization</h3>
                </div>
                <div className="docs-card-body">
                  <p>When using column resizing with virtualization, it's important to ensure that column widths are properly synchronized between the header and body sections:</p>
                  
                  <pre className="docs-code-block">{`<Grid 
  columns={columns} 
  data={largeDataset} 
  resizableColumns={true}
  virtualization={true}
  horizontalVirtualization={true}
  maxHeight={400}
  maxWidth={800}
  onColumnResize={handleColumnResize}
/>`}</pre>
                  
                  <p>The Data Grid component automatically handles the synchronization between header and body sections when using virtualization. However, there are a few considerations to keep in mind:</p>
                  
                  <ul>
                    <li>Column widths should be explicitly defined for all columns when using horizontal virtualization</li>
                    <li>The <code>onColumnResize</code> callback should update the column widths in your state to ensure consistent rendering</li>
                    <li>When using controlled column widths, make sure to update the column definitions passed to the grid</li>
                  </ul>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> For optimal performance with large datasets, consider debouncing the column resize updates to reduce the number of re-renders during resize operations.
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Props API Reference Page */}
          {activeTab === 'props' && (
            <section className="docs-section" id="props">
              <div className="docs-section-header">
                <h2>Props API Reference</h2>
                <p>Comprehensive reference for all available props in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Core Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>These are the essential props required for basic grid functionality:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>columns</code></td>
                        <td><code>ColumnDefinition[]</code></td>
                        <td>Required</td>
                        <td>Array of column definitions that specify how to display and interact with data.</td>
                      </tr>
                      <tr>
                        <td><code>data</code></td>
                        <td><code>T[]</code></td>
                        <td>Required</td>
                        <td>Array of data objects to display in the grid.</td>
                      </tr>
                      <tr>
                        <td><code>id</code></td>
                        <td><code>string</code></td>
                        <td><code>'data-grid'</code></td>
                        <td>Unique identifier for the grid.</td>
                      </tr>
                      <tr>
                        <td><code>className</code></td>
                        <td><code>string</code></td>
                        <td><code>''</code></td>
                        <td>Additional CSS class name to apply to the grid container.</td>
                      </tr>
                      <tr>
                        <td><code>style</code></td>
                        <td><code>React.CSSProperties</code></td>
                        <td><code>{}</code></td>
                        <td>Inline styles to apply to the grid container.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* More sections will be added here */}
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Sizing and Layout Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Control the dimensions and layout of the grid:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>width</code></td>
                        <td><code>number | string</code></td>
                        <td><code>'100%'</code></td>
                        <td>Width of the grid. Can be a number (pixels) or a string (CSS value).</td>
                      </tr>
                      <tr>
                        <td><code>height</code></td>
                        <td><code>number | string</code></td>
                        <td><code>'auto'</code></td>
                        <td>Height of the grid. Can be a number (pixels) or a string (CSS value).</td>
                      </tr>
                      <tr>
                        <td><code>maxHeight</code></td>
                        <td><code>number | string</code></td>
                        <td><code>undefined</code></td>
                        <td>Maximum height of the grid. Useful when using virtualization.</td>
                      </tr>
                      <tr>
                        <td><code>maxWidth</code></td>
                        <td><code>number | string</code></td>
                        <td><code>undefined</code></td>
                        <td>Maximum width of the grid. Useful when using horizontal virtualization.</td>
                      </tr>
                      <tr>
                        <td><code>autoHeight</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>When true, the grid's height will adjust to fit all rows without scrolling.</td>
                      </tr>
                      <tr>
                        <td><code>headerHeight</code></td>
                        <td><code>number</code></td>
                        <td><code>40</code></td>
                        <td>Height of the header row in pixels.</td>
                      </tr>
                      <tr>
                        <td><code>rowHeight</code></td>
                        <td><code>number</code></td>
                        <td><code>35</code></td>
                        <td>Height of each data row in pixels.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Feature Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Enable and configure grid features:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>sortable</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable sorting for all columns. Can be overridden at the column level.</td>
                      </tr>
                      <tr>
                        <td><code>sortModel</code></td>
                        <td><code>{'{ field: string; direction: "asc" | "desc" }'}</code></td>
                        <td><code>undefined</code></td>
                        <td>Controlled sort state. Specify the field to sort by and the direction.</td>
                      </tr>
                      <tr>
                        <td><code>filterable</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable filtering for all columns. Can be overridden at the column level.</td>
                      </tr>
                      <tr>
                        <td><code>filters</code></td>
                        <td><code>{'Record<string, any>'}</code></td>
                        <td><code>{'{}'}</code></td>
                        <td>Controlled filter state. Object with field names as keys and filter values as values.</td>
                      </tr>
                      <tr>
                        <td><code>resizableColumns</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable column resizing for all columns. Can be overridden at the column level.</td>
                      </tr>
                      <tr>
                        <td><code>pagination</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable pagination for the grid.</td>
                      </tr>
                      <tr>
                        <td><code>virtualization</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable virtualization for vertical scrolling. Recommended for large datasets.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Selection Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Configure row and cell selection behavior:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>selectionModel</code></td>
                        <td><code>'row' | 'cell' | 'both' | 'none'</code></td>
                        <td><code>'none'</code></td>
                        <td>Type of selection to enable in the grid.</td>
                      </tr>
                      <tr>
                        <td><code>selectionMode</code></td>
                        <td><code>'single' | 'multiple' | 'none'</code></td>
                        <td><code>'single'</code></td>
                        <td>Whether to allow single or multiple selections.</td>
                      </tr>
                      <tr>
                        <td><code>selectedRows</code></td>
                        <td><code>number[]</code></td>
                        <td><code>[]</code></td>
                        <td>Controlled row selection state. Array of row indices that are selected.</td>
                      </tr>
                      <tr>
                        <td><code>checkboxSelection</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Add a checkbox column for row selection.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Editing Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Configure cell editing behavior:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>editable</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Enable editing for all cells. Can be overridden at the column level.</td>
                      </tr>
                      <tr>
                        <td><code>editMode</code></td>
                        <td><code>'cell' | 'row'</code></td>
                        <td><code>'cell'</code></td>
                        <td>Whether to edit cells individually or entire rows at once.</td>
                      </tr>
                      <tr>
                        <td><code>editOnClick</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Start editing a cell on single click instead of double click.</td>
                      </tr>
                      <tr>
                        <td><code>isCellEditable</code></td>
                        <td><code>{'(params: { rowData: T; field: string; rowIndex: number }) => boolean'}</code></td>
                        <td><code>{'() => true'}</code></td>
                        <td>Function to determine if a cell can be edited based on its data and position.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Event Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Callbacks for various grid events:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>onRowClick</code></td>
                        <td><code>{'(params: { rowData: T; rowIndex: number; event: React.MouseEvent }) => void'}</code></td>
                        <td>Called when a row is clicked.</td>
                      </tr>
                      <tr>
                        <td><code>onCellClick</code></td>
                        <td><code>{'(params: { rowData: T; field: string; value: any; rowIndex: number; colIndex: number; event: React.MouseEvent }) => void'}</code></td>
                        <td>Called when a cell is clicked.</td>
                      </tr>
                      <tr>
                        <td><code>onRowSelect</code></td>
                        <td><code>{'(params: { rowData: T; rowIndex: number; isSelected: boolean; selectedRows: number[] }) => void'}</code></td>
                        <td>Called when a row is selected or deselected.</td>
                      </tr>
                      <tr>
                        <td><code>onSort</code></td>
                        <td><code>{'(field: string) => void'}</code></td>
                        <td>Called when a column header is clicked for sorting.</td>
                      </tr>
                      <tr>
                        <td><code>onFilterChange</code></td>
                        <td><code>{'(field: string, value: any) => void'}</code></td>
                        <td>Called when a filter value changes.</td>
                      </tr>
                      <tr>
                        <td><code>onColumnResize</code></td>
                        <td><code>{'(params: { field: string; width: number; deltaX: number }) => void'}</code></td>
                        <td>Called during column resize.</td>
                      </tr>
                      <tr>
                        <td><code>onCellEditChange</code></td>
                        <td><code>{'(params: { rowData: T; field: string; value: any; newValue: any; rowIndex: number; colIndex: number }) => void'}</code></td>
                        <td>Called when the value in an editable cell changes.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card" id="column-props">
                <div className="docs-card-header">
                  <h3>Column Definition Props</h3>
                </div>
                <div className="docs-card-body">
                  <p>Properties available in the <code>ColumnDefinition</code> object:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>field</code></td>
                        <td><code>string</code></td>
                        <td>Required</td>
                        <td>Field name in the data object that this column displays.</td>
                      </tr>
                      <tr>
                        <td><code>headerName</code></td>
                        <td><code>string</code></td>
                        <td>Same as <code>field</code></td>
                        <td>Display name for the column header.</td>
                      </tr>
                      <tr>
                        <td><code>width</code></td>
                        <td><code>number</code></td>
                        <td><code>100</code></td>
                        <td>Width of the column in pixels.</td>
                      </tr>
                      <tr>
                        <td><code>type</code></td>
                        <td><code>'string' | 'number' | 'boolean' | 'date'</code></td>
                        <td><code>'string'</code></td>
                        <td>Data type of the column. Affects sorting, filtering, and formatting.</td>
                      </tr>
                      <tr>
                        <td><code>sortable</code></td>
                        <td><code>boolean</code></td>
                        <td>Inherits from grid</td>
                        <td>Whether this column can be sorted.</td>
                      </tr>
                      <tr>
                        <td><code>filter</code></td>
                        <td><code>boolean</code></td>
                        <td>Inherits from grid</td>
                        <td>Whether this column can be filtered.</td>
                      </tr>
                      <tr>
                        <td><code>resizable</code></td>
                        <td><code>boolean</code></td>
                        <td>Inherits from grid</td>
                        <td>Whether this column can be resized.</td>
                      </tr>
                      <tr>
                        <td><code>editable</code></td>
                        <td><code>boolean</code></td>
                        <td>Inherits from grid</td>
                        <td>Whether cells in this column can be edited.</td>
                      </tr>
                      <tr>
                        <td><code>renderCell</code></td>
                        <td><code>{'(value: any, rowData: T) => React.ReactNode'}</code></td>
                        <td><code>undefined</code></td>
                        <td>Custom renderer for cell content.</td>
                      </tr>
                      <tr>
                        <td><code>renderHeader</code></td>
                        <td><code>{'(column: ColumnDefinition) => React.ReactNode'}</code></td>
                        <td><code>undefined</code></td>
                        <td>Custom renderer for header content.</td>
                      </tr>
                      <tr>
                        <td><code>valueFormatter</code></td>
                        <td><code>{'(value: any) => string'}</code></td>
                        <td><code>undefined</code></td>
                        <td>Function to format the cell value for display.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
          
          {/* Methods API Reference Page */}
          {activeTab === 'methods' && (
            <section className="docs-section" id="methods">
              <div className="docs-section-header">
                <h2>Methods API Reference</h2>
                <p>Comprehensive reference for all available methods in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Grid Methods</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component exposes several methods that can be called using a ref. These methods allow you to programmatically control the grid's behavior:</p>
                  
                  <table className="docs-api-table">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Parameters</th>
                        <th>Return Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>scrollToRow</code></td>
                        <td><code>(rowIndex: number, options?: &#123; behavior: 'auto' | 'smooth' &#125;)</code></td>
                        <td><code>void</code></td>
                        <td>Scrolls the grid to make the specified row visible. Useful for programmatically navigating to specific rows.</td>
                      </tr>
                      <tr>
                        <td><code>getSelectedRows</code></td>
                        <td><code>()</code></td>
                        <td><code>Record&lt;string, any&gt;[]</code></td>
                        <td>Returns an array of currently selected row data objects. Works with both single and multiple selection modes.</td>
                      </tr>
                      <tr>
                        <td><code>startEditingCell</code></td>
                        <td><code>(rowIndex: number, field: string)</code></td>
                        <td><code>void</code></td>
                        <td>Programmatically puts a specific cell into edit mode. The cell must be in an editable column.</td>
                      </tr>
                      <tr>
                        <td><code>selectAllRows</code></td>
                        <td><code>(selected: boolean = true)</code></td>
                        <td><code>void</code></td>
                        <td>Selects or deselects all rows in the grid. Only works when <code>selectionMode</code> is set to <code>'multiple'</code>.</td>
                      </tr>
                      <tr>
                        <td><code>refreshData</code></td>
                        <td><code>()</code></td>
                        <td><code>void</code></td>
                        <td>Forces the grid to re-render with the current data. Useful after external data modifications.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Using Grid Methods</h3>
                </div>
                <div className="docs-card-body">
                  <p>To use these methods, you need to create a ref and pass it to the Grid component:</p>
                  
                  <pre className="docs-code-block">{`import React, { useRef } from 'react';
import Grid from 'data-grid-component';

const MyComponent = () => {
  // Create a ref to access grid methods
  const gridRef = useRef(null);
  
  // Example function that uses grid methods
  const handleJumpToRow = (rowIndex) => {
    // Call the scrollToRow method
    gridRef.current.scrollToRow(rowIndex, { behavior: 'smooth' });
  };
  
  // Example function to get selected rows
  const handleGetSelected = () => {
    const selectedRows = gridRef.current.getSelectedRows();
    console.log('Selected rows:', selectedRows);
  };
  
  return (
    <div>
      <button onClick={() => handleJumpToRow(10)}>Jump to Row 10</button>
      <button onClick={handleGetSelected}>Log Selected Rows</button>
      
      <Grid 
        ref={gridRef}
        columns={columns}
        data={data}
        selectionMode="multiple"
      />
    </div>
  );
};`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Method Examples</h3>
                </div>
                <div className="docs-card-body">
                  <h4>Programmatic Cell Editing</h4>
                  <p>You can programmatically start editing a cell:</p>
                  
                  <pre className="docs-code-block">{`// Start editing the "name" field in the first row
gridRef.current.startEditingCell(0, 'name');`}</pre>
                  
                  <h4>Working with Selection</h4>
                  <p>Select or deselect all rows and retrieve selected rows:</p>
                  
                  <pre className="docs-code-block">{`// Select all rows
gridRef.current.selectAllRows(true);

// Deselect all rows
gridRef.current.selectAllRows(false);

// Get all selected rows
const selectedRows = gridRef.current.getSelectedRows();`}</pre>
                  
                  <h4>Refreshing the Grid</h4>
                  <p>Force the grid to refresh after external data changes:</p>
                  
                  <pre className="docs-code-block">{`// Update data externally
data[0].name = 'Updated Name';

// Refresh the grid to reflect changes
gridRef.current.refreshData();`}</pre>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Best Practices</h3>
                </div>
                <div className="docs-card-body">
                  <ul>
                    <li><strong>Check for Ref Existence:</strong> Always verify that the ref exists before calling methods on it.</li>
                    <li><strong>Error Handling:</strong> Wrap method calls in try-catch blocks to handle potential errors gracefully.</li>
                    <li><strong>Performance Considerations:</strong> Methods like <code>scrollToRow</code> and <code>refreshData</code> can trigger re-renders, so use them judiciously.</li>
                    <li><strong>Memoization:</strong> When using methods in event handlers, consider memoizing the handlers with <code>useCallback</code> to prevent unnecessary re-renders.</li>
                  </ul>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> Grid methods are only available after the component has mounted. Attempting to call methods during the initial render will result in errors.
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* TypeScript Types Section */}
          {activeTab === 'types' && (
            <section className="docs-section" id="types">
              <div className="docs-section-header">
                <h2>TypeScript Types</h2>
                <p>Comprehensive reference for all TypeScript types and interfaces used in the Data Grid component.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Core Types</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component is built with TypeScript to provide type safety and better developer experience. Below are the core types used throughout the component:</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`// Column Definition
export interface ColumnDefinition {
  field: string;
  headerName: string;
  width?: number;
  type?: 'string' | 'number' | 'date' | 'boolean';
  sortable?: boolean;
  filter?: boolean;
  resizable?: boolean;
  editable?: boolean;
  renderCell?: (value: any, rowData: any) => React.ReactNode;
  renderHeader?: (column: ColumnDefinition) => React.ReactNode;
  valueGetter?: (params: ValueGetterParams) => any;
  valueSetter?: (params: ValueSetterParams) => boolean;
}`}
                    </pre>
                  </div>
                  
                  <p>The <code>ColumnDefinition</code> interface defines the structure and behavior of each column in the grid.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`// Grid Props
export interface GridProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnDefinition[];
  height?: string | number;
  width?: string | number;
  rowHeight?: number;
  headerHeight?: number;
  onRowClick?: (rowData: T, index: number) => void;
  onCellClick?: (value: any, field: string, rowData: T) => void;
  onCellValueChange?: (newValue: any, field: string, rowData: T) => void;
  sortable?: boolean;
  filterable?: boolean;
  resizableColumns?: boolean;
  selectable?: boolean;
  editable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  virtualization?: boolean;
  className?: string;
  style?: React.CSSProperties;
}`}
                    </pre>
                  </div>
                  
                  <p>The <code>GridProps</code> interface defines all the props that can be passed to the Grid component.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Event Types</h3>
                </div>
                <div className="docs-card-body">
                  <p>The following types are used for event handling and callbacks:</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`// Value Getter/Setter Params
export interface ValueGetterParams {
  value: any;
  field: string;
  rowData: Record<string, any>;
}

export interface ValueSetterParams {
  value: any;
  field: string;
  rowData: Record<string, any>;
  newValue: any;
}

// Sort Model
export interface SortModel {
  field: string;
  direction: 'asc' | 'desc';
}

// Cell Props
export interface CellProps {
  value: any;
  column: ColumnDefinition;
  rowData: Record<string, any>;
  isEditable?: boolean;
  onValueChange?: (newValue: any) => void;
}

// Row Props
export interface RowProps {
  data: Record<string, any>;
  columns: ColumnDefinition[];
  index: number;
  isSelected?: boolean;
  onClick?: (data: Record<string, any>, index: number) => void;
  onCellClick?: (value: any, field: string, rowData: Record<string, any>) => void;
  onCellValueChange?: (newValue: any, field: string, rowData: Record<string, any>) => void;
  editable?: boolean;
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Virtualization Types</h3>
                </div>
                <div className="docs-card-body">
                  <p>Types related to the virtualization feature for handling large datasets:</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`// Virtualization Types
export interface VirtualizationProps {
  totalItems: number;
  itemHeight: number;
  visibleHeight: number;
  overscan?: number;
  scrollTop?: number;
}

export interface VirtualizationResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number;
  totalHeight: number;
  offsetY: number;
}`}
                    </pre>
                  </div>
                  
                  <p>These types are used internally by the virtualization module to calculate which rows should be rendered based on the current scroll position.</p>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Using TypeScript with the Grid</h3>
                </div>
                <div className="docs-card-body">
                  <p>The Data Grid component is fully typed, allowing you to leverage TypeScript's type checking in your application:</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`// Example of using the Grid with TypeScript
import React from 'react';
import Grid from './components/Grid';
import { ColumnDefinition } from './types';

// Define your data type
interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  joinDate: Date;
}

// Sample data
const users: User[] = [
  { id: 1, name: 'John', age: 30, isActive: true, joinDate: new Date('2020-01-15') },
  { id: 2, name: 'Alice', age: 25, isActive: false, joinDate: new Date('2021-03-20') },
];

// Column definitions with proper typing
const columns: ColumnDefinition[] = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'name', headerName: 'Name', type: 'string' },
  { field: 'age', headerName: 'Age', type: 'number' },
  { field: 'isActive', headerName: 'Status', type: 'boolean' },
  { field: 'joinDate', headerName: 'Join Date', type: 'date' },
];

const App: React.FC = () => {
  // Type-safe event handlers
  const handleRowClick = (rowData: User, index: number) => {
    console.log(\`Row clicked: \${rowData.name} at index \${index}\`);
  };

  return (
    <Grid<User>
      data={users}
      columns={columns}
      onRowClick={handleRowClick}
      sortable
      filterable
      height={400}
    />
  );
};

export default App;`}
                    </pre>
                  </div>
                  
                  <div className="docs-note">
                    <strong>Note:</strong> The Grid component accepts a generic type parameter that defines the shape of your data. This provides type safety for callbacks and ensures that your column definitions match your data structure.
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Basic Usage Examples Section */}
          {activeTab === 'basic' && (
            <section className="docs-section" id="basic">
              <div className="docs-section-header">
                <h2>Basic Usage Examples</h2>
                <p>Learn how to implement the Data Grid component with these basic usage examples.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Simple Data Grid</h3>
                </div>
                <div className="docs-card-body">
                  <p>The most basic implementation of the Data Grid component requires just two props: <code>data</code> and <code>columns</code>.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const SimpleExample = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering' },
    { id: 2, name: 'Jane Smith', age: 28, department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance' },
    { id: 4, name: 'Alice Williams', age: 32, department: 'Product' },
    { id: 5, name: 'Charlie Brown', age: 29, department: 'Engineering' },
  ];

  // Column definitions
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'department', headerName: 'Department', width: 150 },
  ];

  return (
    <Grid
      data={data}
      columns={columns}
      height={400}
    />
  );
};

export default SimpleExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        {/* Grid component would render here in a real application */}
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            {columns.slice(0, 4).map(col => (
                              <div key={col.field} className="grid-header-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                {col.headerName}
                              </div>
                            ))}
                          </div>
                          <div className="grid-body">
                            {sampleData.slice(0, 5).map((row: any, rowIndex) => (
                              <div key={rowIndex} className="grid-row">
                                {columns.slice(0, 4).map(col => (
                                  <div key={col.field} className="grid-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                    {String(row[col.field] || '')}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Grid with Sorting and Filtering</h3>
                </div>
                <div className="docs-card-body">
                  <p>Enable sorting and filtering capabilities by adding the <code>sortable</code> and <code>filterable</code> props.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const SortFilterExample = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering' },
    { id: 2, name: 'Jane Smith', age: 28, department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance' },
    { id: 4, name: 'Alice Williams', age: 32, department: 'Product' },
    { id: 5, name: 'Charlie Brown', age: 29, department: 'Engineering' },
  ];

  // Column definitions with sorting and filtering enabled
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 200, sortable: true, filter: true },
    { field: 'age', headerName: 'Age', width: 100, type: 'number', sortable: true, filter: true },
    { field: 'department', headerName: 'Department', width: 150, sortable: true, filter: true },
  ];

  return (
    <Grid
      data={data}
      columns={columns}
      height={400}
      sortable
      filterable
    />
  );
};

export default SortFilterExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        {/* Grid component would render here in a real application */}
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            {columns.slice(0, 4).map(col => (
                              <div key={col.field} className="grid-header-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                {col.headerName}
                                <span className="sort-icon">▼</span>
                                <div className="filter-input">
                                  <input type="text" placeholder="Filter..." />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="grid-body">
                            {sampleData.slice(0, 5).map((row: any, rowIndex) => (
                              <div key={rowIndex} className="grid-row">
                                {columns.slice(0, 4).map(col => (
                                  <div key={col.field} className="grid-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                    {String(row[col.field] || '')}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="docs-example-instructions">
                      <p><strong>Try it:</strong> Click on column headers to sort. Use the filter inputs to filter data (e.g., try "&gt;30" in the Age column).</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Grid with Pagination</h3>
                </div>
                <div className="docs-card-body">
                  <p>Add pagination to your grid by setting the <code>pagination</code> prop and optionally specifying a <code>pageSize</code>.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const PaginationExample = () => {
  // Sample data (more rows to demonstrate pagination)
  const data = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering' },
    { id: 2, name: 'Jane Smith', age: 28, department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance' },
    { id: 4, name: 'Alice Williams', age: 32, department: 'Product' },
    { id: 5, name: 'Charlie Brown', age: 29, department: 'Engineering' },
    { id: 6, name: 'Eva Davis', age: 31, department: 'HR' },
    { id: 7, name: 'Frank Miller', age: 33, department: 'Sales' },
    { id: 8, name: 'Grace Lee', age: 27, department: 'Marketing' },
    { id: 9, name: 'Henry Wilson', age: 36, department: 'Engineering' },
    { id: 10, name: 'Ivy Clark', age: 34, department: 'Finance' },
    { id: 11, name: 'Jack Taylor', age: 29, department: 'Product' },
    { id: 12, name: 'Karen White', age: 32, department: 'HR' },
  ];

  // Column definitions
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'department', headerName: 'Department', width: 150 },
  ];

  return (
    <Grid
      data={data}
      columns={columns}
      height={400}
      pagination
      pageSize={5}
    />
  );
};

export default PaginationExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        {/* Grid component would render here in a real application */}
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            {columns.slice(0, 4).map(col => (
                              <div key={col.field} className="grid-header-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                {col.headerName}
                              </div>
                            ))}
                          </div>
                          <div className="grid-body">
                            {sampleData.slice(0, 5).map((row: any, rowIndex) => (
                              <div key={rowIndex} className="grid-row">
                                {columns.slice(0, 4).map(col => (
                                  <div key={col.field} className="grid-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                    {String(row[col.field] || '')}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                          <div className="grid-pagination">
                            <button className="pagination-button">Previous</button>
                            <span className="pagination-info">Page 1 of 3</span>
                            <button className="pagination-button">Next</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="docs-example-instructions">
                      <p><strong>Try it:</strong> Navigate between pages using the pagination controls at the bottom of the grid.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Grid with Row Selection</h3>
                </div>
                <div className="docs-card-body">
                  <p>Enable row selection and handle row click events with the <code>selectable</code> and <code>onRowClick</code> props.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const SelectionExample = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering' },
    { id: 2, name: 'Jane Smith', age: 28, department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance' },
    { id: 4, name: 'Alice Williams', age: 32, department: 'Product' },
    { id: 5, name: 'Charlie Brown', age: 29, department: 'Engineering' },
  ];

  // Column definitions
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'department', headerName: 'Department', width: 150 },
  ];

  // Handle row click
  const handleRowClick = (rowData, index) => {
    setSelectedRow(rowData);
    console.log('Selected row:', rowData);
  };

  return (
    <div>
      <Grid
        data={data}
        columns={columns}
        height={300}
        selectable
        onRowClick={handleRowClick}
      />
      
      {selectedRow && (
        <div className="selection-info">
          <h4>Selected Row:</h4>
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SelectionExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        {/* Grid component would render here in a real application */}
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            {columns.slice(0, 4).map(col => (
                              <div key={col.field} className="grid-header-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                {col.headerName}
                              </div>
                            ))}
                          </div>
                          <div className="grid-body">
                            {sampleData.slice(0, 5).map((row: any, rowIndex) => (
                              <div key={rowIndex} className={`grid-row ${rowIndex === 1 ? 'selected' : ''}`}>
                                {columns.slice(0, 4).map(col => (
                                  <div key={col.field} className="grid-cell" style={{width: col.width ? `${col.width}px` : '100px'}}>
                                    {String(row[col.field] || '')}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="docs-example-instructions">
                      <p><strong>Try it:</strong> Click on a row to select it. The selected row will be highlighted.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Advanced Features Examples Section */}
          {activeTab === 'advanced' && (
            <section className="docs-section" id="advanced">
              <div className="docs-section-header">
                <h2>Advanced Features Examples</h2>
                <p>Explore advanced capabilities of the Data Grid component with these comprehensive examples.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Cell Renderers</h3>
                </div>
                <div className="docs-card-body">
                  <p>Customize the appearance and behavior of cells using the <code>renderCell</code> prop in column definitions.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const CustomCellExample = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', status: 'active', progress: 75, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', status: 'inactive', progress: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', status: 'pending', progress: 50, email: 'bob@example.com' },
    { id: 4, name: 'Alice Williams', status: 'active', progress: 90, email: 'alice@example.com' },
    { id: 5, name: 'Charlie Brown', status: 'inactive', progress: 10, email: 'charlie@example.com' },
  ];

  // Custom cell renderers
  const StatusCell = (value) => {
    const statusStyles = {
      active: { backgroundColor: '#e6f7e6', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px' },
      inactive: { backgroundColor: '#ffebee', color: '#c62828', padding: '4px 8px', borderRadius: '4px' },
      pending: { backgroundColor: '#fff8e1', color: '#f57f17', padding: '4px 8px', borderRadius: '4px' },
    };
    
    return (
      <span style={statusStyles[value] || {}}>
        {value}
      </span>
    );
  };
  
  const ProgressCell = (value) => {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ 
          height: '10px', 
          width: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '5px' 
        }}>
          <div style={{ 
            height: '100%', 
            width: \`\${value}%\`, 
            backgroundColor: value > 70 ? '#4caf50' : value > 30 ? '#ff9800' : '#f44336',
            borderRadius: '5px'
          }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '4px' }}>{value}%</div>
      </div>
    );
  };
  
  const EmailCell = (value) => {
    return (
      <a href={\`mailto:\${value}\`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        {value}
      </a>
    );
  };

  // Column definitions with custom renderers
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (value) => StatusCell(value)
    },
    { 
      field: 'progress', 
      headerName: 'Progress', 
      width: 150, 
      type: 'number',
      renderCell: (value) => ProgressCell(value)
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      renderCell: (value) => EmailCell(value)
    },
  ];

  return (
    <Grid
      data={data}
      columns={columns}
      height={400}
    />
  );
};

export default CustomCellExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            <div className="grid-header-cell" style={{width: '70px'}}>ID</div>
                            <div className="grid-header-cell" style={{width: '180px'}}>Name</div>
                            <div className="grid-header-cell" style={{width: '120px'}}>Status</div>
                            <div className="grid-header-cell" style={{width: '150px'}}>Progress</div>
                            <div className="grid-header-cell" style={{width: '200px'}}>Email</div>
                          </div>
                          <div className="grid-body">
                            <div className="grid-row">
                              <div className="grid-cell" style={{width: '70px'}}>1</div>
                              <div className="grid-cell" style={{width: '180px'}}>John Doe</div>
                              <div className="grid-cell" style={{width: '120px'}}>
                                <span style={{backgroundColor: '#e6f7e6', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px'}}>active</span>
                              </div>
                              <div className="grid-cell" style={{width: '150px'}}>
                                <div style={{width: '100%'}}>
                                  <div style={{height: '10px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px'}}>
                                    <div style={{height: '100%', width: '75%', backgroundColor: '#4caf50', borderRadius: '5px'}}></div>
                                  </div>
                                  <div style={{textAlign: 'center', marginTop: '4px'}}>75%</div>
                                </div>
                              </div>
                              <div className="grid-cell" style={{width: '200px'}}>
                                <a href="mailto:john@example.com" style={{color: '#1976d2', textDecoration: 'none'}}>john@example.com</a>
                              </div>
                            </div>
                            <div className="grid-row">
                              <div className="grid-cell" style={{width: '70px'}}>2</div>
                              <div className="grid-cell" style={{width: '180px'}}>Jane Smith</div>
                              <div className="grid-cell" style={{width: '120px'}}>
                                <span style={{backgroundColor: '#ffebee', color: '#c62828', padding: '4px 8px', borderRadius: '4px'}}>inactive</span>
                              </div>
                              <div className="grid-cell" style={{width: '150px'}}>
                                <div style={{width: '100%'}}>
                                  <div style={{height: '10px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px'}}>
                                    <div style={{height: '100%', width: '30%', backgroundColor: '#ff9800', borderRadius: '5px'}}></div>
                                  </div>
                                  <div style={{textAlign: 'center', marginTop: '4px'}}>30%</div>
                                </div>
                              </div>
                              <div className="grid-cell" style={{width: '200px'}}>
                                <a href="mailto:jane@example.com" style={{color: '#1976d2', textDecoration: 'none'}}>jane@example.com</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Inline Cell Editing</h3>
                </div>
                <div className="docs-card-body">
                  <p>Enable inline editing of cell values with validation using the <code>editable</code> prop and <code>onCellValueChange</code> callback.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React, { useState } from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const EditingExample = () => {
  // Sample data with state to track changes
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 28, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
    { id: 4, name: 'Alice Williams', age: 32, email: 'alice@example.com' },
    { id: 5, name: 'Charlie Brown', age: 29, email: 'charlie@example.com' },
  ]);

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  };
  
  const validateAge = (age) => {
    return !isNaN(age) && age > 0 && age < 120;
  };

  // Column definitions with validation
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 180, 
      editable: true 
    },
    { 
      field: 'age', 
      headerName: 'Age', 
      width: 100, 
      type: 'number',
      editable: true,
      validator: validateAge
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 220,
      editable: true,
      validator: validateEmail
    },
  ];

  // Handle cell value changes
  const handleCellValueChange = (newValue, field, rowData) => {
    // Update the data state with the new value
    const updatedData = data.map(row => {
      if (row.id === rowData.id) {
        return { ...row, [field]: newValue };
      }
      return row;
    });
    
    setData(updatedData);
    console.log(\`Cell value changed: \${field} = \${newValue}\`);
  };

  return (
    <div>
      <Grid
        data={data}
        columns={columns}
        height={300}
        editable
        onCellValueChange={handleCellValueChange}
      />
      
      <div className="edit-instructions">
        <p><strong>Instructions:</strong> Double-click on any editable cell to start editing. Press Enter to save or Escape to cancel.</p>
        <p><strong>Validation:</strong> Age must be a number between 1-120. Email must be in a valid format.</p>
      </div>
      
      <div className="current-data">
        <h4>Current Data:</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditingExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container">
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            <div className="grid-header-cell" style={{width: '70px'}}>ID</div>
                            <div className="grid-header-cell" style={{width: '180px'}}>Name</div>
                            <div className="grid-header-cell" style={{width: '100px'}}>Age</div>
                            <div className="grid-header-cell" style={{width: '220px'}}>Email</div>
                          </div>
                          <div className="grid-body">
                            <div className="grid-row">
                              <div className="grid-cell" style={{width: '70px'}}>1</div>
                              <div className="grid-cell editable" style={{width: '180px'}}>John Doe</div>
                              <div className="grid-cell editable" style={{width: '100px'}}>30</div>
                              <div className="grid-cell editable" style={{width: '220px'}}>john@example.com</div>
                            </div>
                            <div className="grid-row">
                              <div className="grid-cell" style={{width: '70px'}}>2</div>
                              <div className="grid-cell editable" style={{width: '180px'}}>Jane Smith</div>
                              <div className="grid-cell editable" style={{width: '100px'}}>28</div>
                              <div className="grid-cell editable" style={{width: '220px'}}>jane@example.com</div>
                            </div>
                            <div className="grid-row">
                              <div className="grid-cell" style={{width: '70px'}}>3</div>
                              <div className="grid-cell editable" style={{width: '180px'}}>Bob Johnson</div>
                              <div className="grid-cell editable" style={{width: '100px'}}>35</div>
                              <div className="grid-cell editable" style={{width: '220px'}}>bob@example.com</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="docs-example-instructions">
                        <p><strong>Note:</strong> In a real implementation, double-clicking on editable cells would open an inline editor.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Virtualized Grid for Large Datasets</h3>
                </div>
                <div className="docs-card-body">
                  <p>Handle large datasets efficiently with virtualization, rendering only the visible rows for optimal performance.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React, { useState, useEffect } from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

const VirtualizationExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Generate a large dataset
  useEffect(() => {
    const generateLargeDataset = () => {
      const result = [];
      for (let i = 1; i <= 10000; i++) {
        result.push({
          id: i,
          name: \`User \${i}\`,
          email: \`user\${i}@example.com\`,
          age: Math.floor(Math.random() * 50) + 20,
          department: ['Engineering', 'Marketing', 'Finance', 'HR', 'Product'][Math.floor(Math.random() * 5)],
          joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5)).toISOString().split('T')[0],
        });
      }
      return result;
    };
    
    // Simulate loading delay
    setTimeout(() => {
      setData(generateLargeDataset());
      setLoading(false);
    }, 500);
  }, []);

  // Column definitions
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'age', headerName: 'Age', width: 80, type: 'number' },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'joinDate', headerName: 'Join Date', width: 120, type: 'date' },
  ];

  // Performance metrics
  const [metrics, setMetrics] = useState({ renderTime: 0, visibleRows: 0 });
  
  const handleRender = (renderTime, visibleRows) => {
    setMetrics({ renderTime, visibleRows });
  };

  return (
    <div>
      {loading ? (
        <div className="loading-indicator">Loading 10,000 rows of data...</div>
      ) : (
        <>
          <div className="performance-metrics">
            <div className="metric">
              <span className="metric-label">Total Rows:</span>
              <span className="metric-value">{data.length.toLocaleString()}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Visible Rows:</span>
              <span className="metric-value">{metrics.visibleRows}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Render Time:</span>
              <span className="metric-value">{metrics.renderTime}ms</span>
            </div>
          </div>
          
          <Grid
            data={data}
            columns={columns}
            height={400}
            virtualization
            sortable
            filterable
            onRender={handleRender}
          />
          
          <div className="virtualization-note">
            <p><strong>Note:</strong> With virtualization enabled, only the rows visible in the viewport are rendered, 
            allowing the grid to handle large datasets with minimal performance impact.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default VirtualizationExample;`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="performance-metrics">
                        <div className="metric">
                          <span className="metric-label">Total Rows:</span>
                          <span className="metric-value">10,000</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Visible Rows:</span>
                          <span className="metric-value">15</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Render Time:</span>
                          <span className="metric-value">12ms</span>
                        </div>
                      </div>
                      
                      <div className="grid-container">
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            <div className="grid-header-cell" style={{width: '80px'}}>ID</div>
                            <div className="grid-header-cell" style={{width: '180px'}}>Name</div>
                            <div className="grid-header-cell" style={{width: '220px'}}>Email</div>
                            <div className="grid-header-cell" style={{width: '80px'}}>Age</div>
                            <div className="grid-header-cell" style={{width: '150px'}}>Department</div>
                            <div className="grid-header-cell" style={{width: '120px'}}>Join Date</div>
                          </div>
                          <div className="grid-body">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className="grid-row">
                                <div className="grid-cell" style={{width: '80px'}}>{i + 1}</div>
                                <div className="grid-cell" style={{width: '180px'}}>User {i + 1}</div>
                                <div className="grid-cell" style={{width: '220px'}}>user{i + 1}@example.com</div>
                                <div className="grid-cell" style={{width: '80px'}}>{Math.floor(Math.random() * 50) + 20}</div>
                                <div className="grid-cell" style={{width: '150px'}}>
                                  {['Engineering', 'Marketing', 'Finance', 'HR', 'Product'][Math.floor(Math.random() * 5)]}
                                </div>
                                <div className="grid-cell" style={{width: '120px'}}>
                                  {new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5)).toISOString().split('T')[0]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="docs-example-instructions">
                        <p><strong>Note:</strong> In a real implementation, scrolling would dynamically load and unload rows as needed.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Customization Examples Section */}
          {activeTab === 'customization' && (
            <section className="docs-section" id="customization">
              <div className="docs-section-header">
                <h2>Customization</h2>
                <p>Learn how to customize and extend the Data Grid component to match your application's design and requirements.</p>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Styling</h3>
                </div>
                <div className="docs-card-body">
                  <p>Customize the appearance of the grid using CSS variables or by overriding the default styles.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`/* Custom CSS for the Data Grid */
:root {
  /* Grid colors */
  --grid-border-color: #e0e0e0;
  --grid-header-bg: #f5f5f5;
  --grid-header-text: #333;
  --grid-row-hover-bg: #f9f9f9;
  --grid-row-selected-bg: #e8f4fd;
  --grid-cell-padding: 8px 12px;
  
  /* Typography */
  --grid-font-family: 'Roboto', sans-serif;
  --grid-font-size: 14px;
  
  /* Borders and shadows */
  --grid-border-radius: 4px;
  --grid-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Custom grid container */
.data-grid-container {
  border: 1px solid var(--grid-border-color);
  border-radius: var(--grid-border-radius);
  box-shadow: var(--grid-box-shadow);
  font-family: var(--grid-font-family);
  font-size: var(--grid-font-size);
}

/* Custom header styling */
.data-grid-header-cell {
  background-color: var(--grid-header-bg);
  color: var(--grid-header-text);
  font-weight: 600;
  padding: var(--grid-cell-padding);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Custom row styling */
.data-grid-row:hover {
  background-color: var(--grid-row-hover-bg);
}

.data-grid-row.selected {
  background-color: var(--grid-row-selected-bg);
}

/* Custom cell styling */
.data-grid-cell {
  padding: var(--grid-cell-padding);
  border-bottom: 1px solid var(--grid-border-color);
}

/* Custom pagination styling */
.data-grid-pagination {
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grid-header-bg);
  border-top: 1px solid var(--grid-border-color);
}

.pagination-button {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover {
  background-color: #f0f0f0;
}

.pagination-button.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}`}
                    </pre>
                  </div>
                  
                  <p>Apply these styles by importing them after the default grid styles:</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import 'data-grid-component/styles/grid.css';
import './custom-grid-styles.css'; // Your custom styles`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="grid-container custom-styled">
                        <div className="grid-placeholder">
                          <div className="grid-header">
                            <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>ID</div>
                            <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Name</div>
                            <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Email</div>
                            <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Status</div>
                          </div>
                          <div className="grid-body">
                            {sampleData.slice(0, 3).map((row: any, rowIndex) => (
                              <div key={rowIndex} className={`grid-row ${rowIndex === 1 ? 'selected' : ''}`} style={{backgroundColor: rowIndex === 1 ? '#e8f4fd' : 'white'}}>
                                <div className="grid-cell">{row.id}</div>
                                <div className="grid-cell">{row.name}</div>
                                <div className="grid-cell">{row.email}</div>
                                <div className="grid-cell">{row.isActive ? 'Active' : 'Inactive'}</div>
                              </div>
                            ))}
                          </div>
                          <div className="grid-pagination" style={{padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0'}}>
                            <button className="pagination-button" style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '6px 12px', margin: '0 4px'}}>Previous</button>
                            <button className="pagination-button active" style={{backgroundColor: '#1976d2', color: 'white', border: '1px solid #1976d2', borderRadius: '4px', padding: '6px 12px', margin: '0 4px'}}>1</button>
                            <button className="pagination-button" style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '6px 12px', margin: '0 4px'}}>2</button>
                            <button className="pagination-button" style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '6px 12px', margin: '0 4px'}}>Next</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Themes</h3>
                </div>
                <div className="docs-card-body">
                  <p>Create and apply different themes to the grid by changing CSS variables.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`/* Theme definitions */
.data-grid-container.theme-light {
  --grid-border-color: #e0e0e0;
  --grid-header-bg: #f5f5f5;
  --grid-header-text: #333;
  --grid-row-hover-bg: #f9f9f9;
  --grid-row-selected-bg: #e8f4fd;
}

.data-grid-container.theme-dark {
  --grid-border-color: #444;
  --grid-header-bg: #333;
  --grid-header-text: #fff;
  --grid-row-hover-bg: #3a3a3a;
  --grid-row-selected-bg: #2c5282;
  --grid-cell-bg: #222;
  --grid-cell-text: #eee;
}

.data-grid-container.theme-blue {
  --grid-border-color: #bbdefb;
  --grid-header-bg: #2196f3;
  --grid-header-text: white;
  --grid-row-hover-bg: #e3f2fd;
  --grid-row-selected-bg: #bbdefb;
}

/* Apply theme in your component */
const MyGridComponent = () => {
  const [theme, setTheme] = useState('light');
  
  return (
    <div>
      <div className="theme-selector">
        <button onClick={() => setTheme('light')}>Light Theme</button>
        <button onClick={() => setTheme('dark')}>Dark Theme</button>
        <button onClick={() => setTheme('blue')}>Blue Theme</button>
      </div>
      
      <Grid
        className={\`theme-\${theme}\`}
        data={data}
        columns={columns}
      />
    </div>
  );
};`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Theme Examples:</h4>
                    <div className="theme-examples">
                      <div className="theme-example">
                        <h5>Light Theme</h5>
                        <div className="grid-container theme-light">
                          <div className="grid-placeholder">
                            <div className="grid-header">
                              <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333'}}>ID</div>
                              <div className="grid-header-cell" style={{backgroundColor: '#f5f5f5', color: '#333'}}>Name</div>
                            </div>
                            <div className="grid-body">
                              <div className="grid-row">
                                <div className="grid-cell" style={{backgroundColor: 'white', color: '#333'}}>1</div>
                                <div className="grid-cell" style={{backgroundColor: 'white', color: '#333'}}>John Doe</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="theme-example">
                        <h5>Dark Theme</h5>
                        <div className="grid-container theme-dark">
                          <div className="grid-placeholder">
                            <div className="grid-header">
                              <div className="grid-header-cell" style={{backgroundColor: '#333', color: '#fff'}}>ID</div>
                              <div className="grid-header-cell" style={{backgroundColor: '#333', color: '#fff'}}>Name</div>
                            </div>
                            <div className="grid-body">
                              <div className="grid-row">
                                <div className="grid-cell" style={{backgroundColor: '#222', color: '#eee'}}>1</div>
                                <div className="grid-cell" style={{backgroundColor: '#222', color: '#eee'}}>John Doe</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="theme-example">
                        <h5>Blue Theme</h5>
                        <div className="grid-container theme-blue">
                          <div className="grid-placeholder">
                            <div className="grid-header">
                              <div className="grid-header-cell" style={{backgroundColor: '#2196f3', color: 'white'}}>ID</div>
                              <div className="grid-header-cell" style={{backgroundColor: '#2196f3', color: 'white'}}>Name</div>
                            </div>
                            <div className="grid-body">
                              <div className="grid-row">
                                <div className="grid-cell" style={{backgroundColor: 'white', color: '#333'}}>1</div>
                                <div className="grid-cell" style={{backgroundColor: 'white', color: '#333'}}>John Doe</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="docs-card">
                <div className="docs-card-header">
                  <h3>Custom Components</h3>
                </div>
                <div className="docs-card-body">
                  <p>Extend the grid with custom components for specialized functionality.</p>
                  
                  <div className="docs-code-block-wrapper">
                    <pre className="docs-code-block">
{`import React from 'react';
import Grid from 'data-grid-component';
import 'data-grid-component/styles/grid.css';

// Custom toolbar component
const CustomToolbar = ({ onSearch, onExport, onRefresh }) => {
  return (
    <div className="custom-grid-toolbar">
      <div className="toolbar-search">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
      <div className="toolbar-actions">
        <button onClick={onExport} className="toolbar-button">
          <span className="icon">📥</span> Export
        </button>
        <button onClick={onRefresh} className="toolbar-button">
          <span className="icon">🔄</span> Refresh
        </button>
      </div>
    </div>
  );
};

// Custom footer component
const CustomFooter = ({ totalRows, selectedRows, pageInfo }) => {
  return (
    <div className="custom-grid-footer">
      <div className="footer-info">
        <span>Total: {totalRows} rows</span>
        {selectedRows > 0 && <span>Selected: {selectedRows} rows</span>}
      </div>
      <div className="footer-pagination">
        <span>Page {pageInfo.current} of {pageInfo.total}</span>
      </div>
    </div>
  );
};

// Custom grid with toolbar and footer
const CustomGridExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(sampleData);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter data based on search term
    // ...
  };
  
  const handleExport = () => {
    // Export data to CSV
    const csv = convertToCSV(data);
    downloadCSV(csv, 'grid-data.csv');
  };
  
  const handleRefresh = () => {
    // Refresh data
    fetchData().then(newData => setData(newData));
  };
  
  const handleRowSelect = (rowData, isSelected) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, rowData.id]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowData.id));
    }
  };
  
  return (
    <div className="custom-grid-wrapper">
      <CustomToolbar 
        onSearch={handleSearch}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />
      
      <Grid
        data={data}
        columns={columns}
        height={400}
        selectable
        onRowSelect={handleRowSelect}
        pagination
        pageSize={10}
      />
      
      <CustomFooter 
        totalRows={data.length}
        selectedRows={selectedRows.length}
        pageInfo={{ current: 1, total: Math.ceil(data.length / 10) }}
      />
    </div>
  );
};`}
                    </pre>
                  </div>
                  
                  <div className="docs-example-preview">
                    <h4>Result:</h4>
                    <div className="docs-example-container">
                      <div className="custom-grid-wrapper">
                        <div className="custom-grid-toolbar" style={{display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px 4px 0 0'}}>
                          <div className="toolbar-search">
                            <input type="text" placeholder="Search..." style={{padding: '6px 10px', borderRadius: '4px', border: '1px solid #ddd'}} />
                          </div>
                          <div className="toolbar-actions" style={{display: 'flex', gap: '10px'}}>
                            <button className="toolbar-button" style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px'}}>
                              <span className="icon">📥</span> Export
                            </button>
                            <button className="toolbar-button" style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px'}}>
                              <span className="icon">🔄</span> Refresh
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid-container">
                          <div className="grid-placeholder">
                            <div className="grid-header">
                              <div className="grid-header-cell">ID</div>
                              <div className="grid-header-cell">Name</div>
                              <div className="grid-header-cell">Email</div>
                              <div className="grid-header-cell">Status</div>
                            </div>
                            <div className="grid-body">
                              {sampleData.slice(0, 3).map((row: any, rowIndex) => (
                                <div key={rowIndex} className={`grid-row ${rowIndex === 0 ? 'selected' : ''}`}>
                                  <div className="grid-cell">{row.id}</div>
                                  <div className="grid-cell">{row.name}</div>
                                  <div className="grid-cell">{row.email}</div>
                                  <div className="grid-cell">{row.isActive ? 'Active' : 'Inactive'}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="custom-grid-footer" style={{display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '0 0 4px 4px'}}>
                          <div className="footer-info" style={{display: 'flex', gap: '15px'}}>
                            <span>Total: {sampleData.length} rows</span>
                            <span>Selected: 1 row</span>
                          </div>
                          <div className="footer-pagination">
                            <span>Page 1 of 3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Interactive Demo Section */}
          <section className="docs-section" id="interactive-demo">
            <div className="docs-section-header">
              <h2>Interactive Demo</h2>
              <p>Explore the grid's capabilities by toggling features and interacting with the data.</p>
            </div>

            <div className="docs-card">
              <div className="docs-card-header">
                <h3>Feature Configuration</h3>
              </div>
              <div className="docs-card-body">
                <div className="docs-controls-grid">
                  <div className="docs-control">
                    <label className="docs-switch">
                      <input 
                        type="checkbox" 
                        checked={showSorting} 
                        onChange={() => setShowSorting(!showSorting)} 
                      />
                      <span className="docs-slider"></span>
                    </label>
                    <span>Sorting</span>
                  </div>
                  
                  <div className="docs-control">
                    <label className="docs-switch">
                      <input 
                        type="checkbox" 
                        checked={showFiltering} 
                        onChange={() => setShowFiltering(!showFiltering)} 
                      />
                      <span className="docs-slider"></span>
                    </label>
                    <span>Filtering</span>
                  </div>
                  
                  <div className="docs-control">
                    <label className="docs-switch">
                      <input 
                        type="checkbox" 
                        checked={showPagination} 
                        onChange={() => setShowPagination(!showPagination)} 
                      />
                      <span className="docs-slider"></span>
                    </label>
                    <span>Pagination</span>
                  </div>
                  
                  <div className="docs-control">
                    <label className="docs-switch">
                      <input 
                        type="checkbox" 
                        checked={showVirtualization} 
                        onChange={() => setShowVirtualization(!showVirtualization)} 
                      />
                      <span className="docs-slider"></span>
                    </label>
                    <span>Virtualization</span>
                  </div>
                  
                  <div className="docs-control">
                    <label className="docs-switch">
                      <input 
                        type="checkbox" 
                        checked={editableGrid} 
                        onChange={() => setEditableGrid(!editableGrid)} 
                      />
                      <span className="docs-slider"></span>
                    </label>
                    <span>Cell Editing</span>
                  </div>
                  
                  <div className="docs-control docs-select-control">
                    <label>Selection Mode:</label>
                    <select 
                      className="docs-select"
                      value={selectionMode} 
                      onChange={(e) => setSelectionMode(e.target.value as 'none' | 'single' | 'multiple')}
                    >
                      <option value="none">None</option>
                      <option value="single">Single</option>
                      <option value="multiple">Multiple</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-card">
              <div className="docs-card-header">
                <h3>Grid Demo</h3>
                <div className="docs-card-header-actions">
                  <span className="docs-tag">Interactive</span>
                </div>
              </div>
              <div className="docs-card-body">
                <div className="docs-grid-container">
                  <Grid 
                    columns={editableColumns} 
                    data={showVirtualization ? largeDataset : sampleData} 
                    onRowClick={handleRowClick}
                    onCellValueChange={handleCellValueChange}
                    sortable={showSorting}
                    filterable={showFiltering}
                    resizableColumns={true}
                    pagination={showPagination}
                    virtualized={showVirtualization}
                    selectionMode={selectionMode}
                    maxHeight={400}
                    pageSize={10}
                    pageSizeOptions={[5, 10, 25, 50]}
                  />
                </div>
                
                {selectedRow && (
                  <div className="docs-selected-row">
                    <h4>Selected Row Data</h4>
                    <pre className="docs-code-block">{JSON.stringify(selectedRow, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          </section>
            
          {/* Feature Highlights */}
          <section className="docs-section" id="feature-highlights">
            <div className="docs-section-header">
              <h2>Feature Highlights</h2>
              <p>Explore the powerful features that make this data grid component stand out.</p>
            </div>

            <div className="docs-features-grid">
              <div className="docs-feature-card">
                <div className="docs-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Virtualization</h3>
                <p>Efficiently render thousands of rows with minimal performance impact using virtualized rendering.</p>
              </div>
              
              <div className="docs-feature-card">
                <div className="docs-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L11 13.17l7.59-7.59L20 7l-8 8z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Advanced Filtering</h3>
                <p>Filter data using powerful expressions like &gt;30, &lt;=25, or =Active with support for all data types.</p>
              </div>
              
              <div className="docs-feature-card">
                <div className="docs-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Sorting</h3>
                <p>Sort data by any column with support for ascending and descending order, including custom sort functions.</p>
              </div>
              
              <div className="docs-feature-card">
                <div className="docs-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Inline Editing</h3>
                <p>Edit cell values directly in the grid with validation and change tracking capabilities.</p>
              </div>
            </div>
          </section>
          
          {/* Code Example */}
          <section className="docs-section" id="code-example">
            <div className="docs-section-header">
              <h2>Code Example</h2>
              <p>Get started quickly with this basic implementation example.</p>
            </div>
            
            <div className="docs-card">
              <div className="docs-card-header">
                <h3>Basic Usage</h3>
                <div className="docs-card-header-actions">
                  <span className="docs-tag">TypeScript</span>
                </div>
              </div>
              <div className="docs-card-body">
                <pre className="docs-code-block">{`import React from 'react';
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
};`}</pre>
              </div>
            </div>
          </section>

          {/* Virtualization Demo */}
          <section className="docs-section" id="virtualization-demo">
            <div className="docs-section-header">
              <h2>Virtualization Performance Demo (2,000 Rows)</h2>
              <p>This grid demonstrates the virtualization capability with 2,000 rows of data. Notice how scrolling remains smooth and responsive.</p>
            </div>
            
            <div className="docs-card">
              <div className="docs-card-header">
                <h3>Performance Demo</h3>
                <div className="docs-card-header-actions">
                  <span className="docs-tag">2,000 Rows</span>
                </div>
              </div>
              <div className="docs-card-body">
                <div className="docs-grid-container">
                  <Grid 
                    columns={columns} 
                    data={largeDataset} 
                    virtualized={true}
                    sortable={true}
                    filterable={true}
                    resizableColumns={true}
                    maxHeight={400}
                    rowHeight={40}
                  />
                </div>
                
                <div className="docs-metrics">
                  <h4>Performance Metrics</h4>
                  <ul>
                    <li><strong>Initial render time:</strong> ~50ms (compared to ~300ms without virtualization)</li>
                    <li><strong>Memory usage:</strong> Only visible rows are rendered in the DOM</li>
                    <li><strong>Scroll performance:</strong> Maintains 60fps even with thousands of rows</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Advanced Filtering Demo */}
          <section className="docs-section" id="advanced-filtering">
            <div className="docs-section-header">
              <h2>Advanced Filtering Demo</h2>
              <p>The grid supports powerful expression-based filtering across all data types.</p>
            </div>
            
            <div className="docs-card">
              <div className="docs-card-header">
                <h3>Expression Filtering</h3>
                <div className="docs-card-header-actions">
                  <span className="docs-tag">New Feature</span>
                </div>
              </div>
              <div className="docs-card-body">
                <div className="docs-example-box">
                  <h4>Try these expressions in the filter inputs:</h4>
                  <div className="docs-expression-examples">
                    <div className="docs-expression">
                      <code>&gt;30</code>
                      <span>Show ages greater than 30</span>
                    </div>
                    <div className="docs-expression">
                      <code>&lt;=25</code>
                      <span>Show ages less than or equal to 25</span>
                    </div>
                    <div className="docs-expression">
                      <code>=Active</code>
                      <span>Show exact matches for "Active"</span>
                    </div>
                    <div className="docs-expression">
                      <code>!=true</code>
                      <span>Show where status is not true</span>
                    </div>
                  </div>
                </div>
                
                <div className="docs-grid-container">
                  <Grid 
                    columns={columns} 
                    data={sampleData} 
                    sortable={true}
                    filterable={true}
                    resizableColumns={true}
                    maxHeight={300}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DemoPage;
