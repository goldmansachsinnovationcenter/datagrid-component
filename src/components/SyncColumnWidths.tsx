import React, { useEffect, useRef } from 'react';

interface SyncColumnWidthsProps {
  headerRef: React.RefObject<HTMLDivElement>;
  bodyRef: React.RefObject<HTMLDivElement>;
  enabled: boolean;
}

/**
 * Component to synchronize column widths between header and body
 * This is especially important for virtualized grids
 */
const SyncColumnWidths: React.FC<SyncColumnWidthsProps> = ({ 
  headerRef, 
  bodyRef, 
  enabled 
}) => {
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  
  useEffect(() => {
    if (!enabled || !headerRef.current || !bodyRef.current) return;
    
    const headerContainer = headerRef.current;
    const bodyContainer = bodyRef.current;
    
    // Function to sync column widths
    const syncColumnWidths = () => {
      const headerTable = headerContainer.querySelector('table');
      const bodyTable = bodyContainer.querySelector('table');
      
      if (!headerTable || !bodyTable) return;
      
      // Get header cells and first row cells
      const headerCells = headerTable.querySelectorAll('th');
      const firstRow = bodyTable.querySelector('tr');
      
      if (!firstRow) return;
      
      const firstRowCells = firstRow.querySelectorAll('td');
      
      // Ensure we have cells to sync
      if (headerCells.length === 0 || firstRowCells.length === 0) return;
      
      // Create or update colgroup elements for better width control
      let headerColgroup = headerTable.querySelector('colgroup');
      let bodyColgroup = bodyTable.querySelector('colgroup');
      
      if (!headerColgroup) {
        headerColgroup = document.createElement('colgroup');
        headerTable.prepend(headerColgroup);
      } else {
        headerColgroup.innerHTML = '';
      }
      
      if (!bodyColgroup) {
        bodyColgroup = document.createElement('colgroup');
        bodyTable.prepend(bodyColgroup);
      } else {
        bodyColgroup.innerHTML = '';
      }
      
      // Sync widths using CSS variables for better consistency
      for (let i = 0; i < Math.min(headerCells.length, firstRowCells.length); i++) {
        const cellWidth = headerCells[i].getBoundingClientRect().width;
        const width = `${cellWidth}px`;
        
        // Set CSS variable on cells
        headerCells[i].style.setProperty('--col-width', width);
        firstRowCells[i].style.setProperty('--col-width', width);
        
        // Set data attribute for width tracking
        headerCells[i].setAttribute('data-width', `${cellWidth}`);
        firstRowCells[i].setAttribute('data-width', `${cellWidth}`);
        
        // Create col elements for both tables
        const headerCol = document.createElement('col');
        const bodyCol = document.createElement('col');
        
        headerCol.style.width = width;
        bodyCol.style.width = width;
        
        headerColgroup.appendChild(headerCol);
        bodyColgroup.appendChild(bodyCol);
      }
      
      // Ensure header and body tables have the same width
      const bodyWidth = bodyTable.offsetWidth;
      if (bodyWidth > 0 && !isNaN(bodyWidth)) {
        headerTable.style.width = bodyWidth + 'px';
        headerTable.style.minWidth = bodyWidth + 'px';
      }
    };
    
    // Set up resize observer to detect size changes
    resizeObserverRef.current = new ResizeObserver(() => {
      requestAnimationFrame(syncColumnWidths);
    });
    
    // Set up mutation observer to detect DOM changes
    mutationObserverRef.current = new MutationObserver(() => {
      requestAnimationFrame(syncColumnWidths);
    });
    
    // Observe both header and body containers
    resizeObserverRef.current.observe(headerContainer);
    resizeObserverRef.current.observe(bodyContainer);
    
    // Observe for attribute changes that might affect layout
    mutationObserverRef.current.observe(headerContainer, { 
      attributes: true, 
      childList: true, 
      subtree: true,
      attributeFilter: ['style', 'class', 'data-width']
    });
    
    mutationObserverRef.current.observe(bodyContainer, { 
      attributes: true, 
      childList: true, 
      subtree: true,
      attributeFilter: ['style', 'class', 'data-width']
    });
    
    // Initial sync
    syncColumnWidths();
    
    // Sync on scroll to ensure header stays aligned with body
    const handleScroll = () => {
      if (headerContainer) {
        headerContainer.scrollLeft = bodyContainer.scrollLeft;
      }
    };
    
    bodyContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      // Clean up observers and event listeners
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
      
      bodyContainer.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, headerRef, bodyRef]);
  
  // This component doesn't render anything
  return null;
};

export default SyncColumnWidths;
