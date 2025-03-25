import { ColumnDefinition } from '../types';

/**
 * Sort data based on a column field and direction
 * @param data The data array to sort
 * @param field The field to sort by
 * @param direction The sort direction ('asc' or 'desc')
 * @param columnType The data type of the column
 * @returns Sorted data array
 */
export const sortData = <T extends Record<string, any>>(
  data: T[],
  field: string,
  direction: 'asc' | 'desc',
  columnType?: string
): T[] => {
  if (!field) return [...data];

  return [...data].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    // Handle null/undefined values
    if (valueA === null || valueA === undefined) return direction === 'asc' ? -1 : 1;
    if (valueB === null || valueB === undefined) return direction === 'asc' ? 1 : -1;

    // Sort based on column type
    switch (columnType) {
      case 'number':
        valueA = Number(valueA);
        valueB = Number(valueB);
        break;
      case 'date':
        valueA = valueA instanceof Date ? valueA : new Date(valueA);
        valueB = valueB instanceof Date ? valueB : new Date(valueB);
        break;
      case 'boolean':
        valueA = Boolean(valueA);
        valueB = Boolean(valueB);
        break;
      default:
        // Convert to string for string comparison
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
    }

    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Parse filter expression to extract operator and value
 * @param filterValue The filter expression string (e.g., "> 30", "< 100", etc.)
 * @returns Object containing operator and value
 */
export const parseFilterExpression = (filterValue: string): { operator: string; value: string } => {
  // Default to contains/equals if no operator is specified
  const operators = ['>=', '<=', '>', '<', '=', '!='];
  let operator = '';
  let value = filterValue.trim();

  // Check for operators at the beginning of the string
  for (const op of operators) {
    if (value.startsWith(op)) {
      operator = op;
      value = value.substring(op.length).trim();
      break;
    }
  }

  return { operator, value };
};

/**
 * Compare values based on operator
 * @param value The actual value
 * @param filterValue The filter value
 * @param operator The comparison operator
 * @param type The data type
 * @returns Boolean indicating if the value matches the filter criteria
 */
export const compareValues = (
  value: any,
  filterValue: any,
  operator: string,
  type: string
): boolean => {
  // Convert values based on type
  let typedValue: any;
  let typedFilterValue: any;

  switch (type) {
    case 'number':
      typedValue = Number(value);
      typedFilterValue = Number(filterValue);
      break;
    case 'date':
      typedValue = value instanceof Date ? value : new Date(value);
      typedFilterValue = filterValue instanceof Date ? filterValue : new Date(filterValue);
      typedValue = typedValue.getTime();
      typedFilterValue = typedFilterValue.getTime();
      break;
    case 'boolean':
      typedValue = Boolean(value);
      typedFilterValue = typeof filterValue === 'string' 
        ? ['true', 'yes', '1'].includes(filterValue.toLowerCase())
        : Boolean(filterValue);
      break;
    default:
      // String comparison (case insensitive)
      typedValue = String(value).toLowerCase();
      typedFilterValue = String(filterValue).toLowerCase();
  }

  // Compare based on operator
  switch (operator) {
    case '>':
      return typedValue > typedFilterValue;
    case '>=':
      return typedValue >= typedFilterValue;
    case '<':
      return typedValue < typedFilterValue;
    case '<=':
      return typedValue <= typedFilterValue;
    case '=':
      return typedValue === typedFilterValue;
    case '!=':
      return typedValue !== typedFilterValue;
    default:
      // Default behavior for strings is 'contains'
      if (type === 'string') {
        return typedValue.includes(typedFilterValue);
      }
      // Default behavior for other types is 'equals'
      return typedValue === typedFilterValue;
  }
};

/**
 * Filter data based on filter criteria
 * @param data The data array to filter
 * @param filters Object containing filter criteria for each field
 * @param columns Column definitions to determine data types
 * @returns Filtered data array
 */
export const filterData = <T extends Record<string, any>>(
  data: T[],
  filters: Record<string, any>,
  columns: ColumnDefinition[]
): T[] => {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter(row => {
    return Object.entries(filters).every(([field, filterValue]) => {
      if (filterValue === undefined || filterValue === null || filterValue === '') {
        return true;
      }

      const value = row[field];
      if (value === undefined || value === null) {
        return false;
      }

      // Find column definition to determine type
      const column = columns.find(col => col.field === field);
      const type = column?.type || 'string';

      // Handle filter expressions
      if (typeof filterValue === 'string') {
        const { operator, value: parsedValue } = parseFilterExpression(filterValue);
        return compareValues(value, parsedValue, operator, type);
      }

      // Handle non-string filter values (direct comparison)
      return compareValues(value, filterValue, '=', type);
    });
  });
};

/**
 * Search data across all fields
 * @param data The data array to search
 * @param searchTerm The search term
 * @returns Filtered data array matching the search term
 */
export const searchData = <T extends Record<string, any>>(
  data: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();
  return data.filter(row => {
    return Object.values(row).some(value => {
      if (value === null || value === undefined) return false;
      
      if (value instanceof Date) {
        return value.toLocaleDateString().toLowerCase().includes(term) ||
               value.toLocaleTimeString().toLowerCase().includes(term);
      }
      
      return String(value).toLowerCase().includes(term);
    });
  });
};
