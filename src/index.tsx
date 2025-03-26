import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/grid.css';
import './styles/pivot.css';
import './styles/grid-fixes.css';
import './styles/grid-additional-fixes.css';
import './styles/sticky-headers.css';
import './styles/column-sync.css';

// This will be our main export for the library
export { default as Grid } from './components/Grid';
export { default as PivotControls } from './components/PivotControls';

// For demo purposes, we'll render the demo page
import DemoPage from './demo/DemoPage';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <DemoPage />
    </React.StrictMode>
  );
}
