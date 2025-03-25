import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/grid.css';

// This will be our main export for the library
export { default as Grid } from './components/Grid';

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
