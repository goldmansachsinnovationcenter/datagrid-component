import { sortData, filterData, searchData } from '../modules/dataHandler';
import { ColumnDefinition } from '../types';

describe('dataHandler module', () => {
  const testData = [
    { id: 1, name: 'John', age: 30, isActive: true, joinDate: new Date('2020-01-15') },
    { id: 2, name: 'Alice', age: 25, isActive: false, joinDate: new Date('2021-03-20') },
    { id: 3, name: 'Bob', age: 45, isActive: true, joinDate: new Date('2019-11-05') },
    { id: 4, name: 'Zoe', age: 28, isActive: true, joinDate: new Date('2022-02-10') },
  ];

  const columns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
    { field: 'name', headerName: 'Name', type: 'string' },
    { field: 'age', headerName: 'Age', type: 'number' },
    { field: 'isActive', headerName: 'Status', type: 'boolean' },
    { field: 'joinDate', headerName: 'Join Date', type: 'date' },
  ];

  describe('sortData', () => {
    test('sorts string data in ascending order', () => {
      const sorted = sortData(testData, 'name', 'asc', 'string');
      expect(sorted[0].name).toBe('Alice');
      expect(sorted[3].name).toBe('Zoe');
    });

    test('sorts string data in descending order', () => {
      const sorted = sortData(testData, 'name', 'desc', 'string');
      expect(sorted[0].name).toBe('Zoe');
      expect(sorted[3].name).toBe('Alice');
    });

    test('sorts number data in ascending order', () => {
      const sorted = sortData(testData, 'age', 'asc', 'number');
      expect(sorted[0].age).toBe(25);
      expect(sorted[3].age).toBe(45);
    });

    test('sorts number data in descending order', () => {
      const sorted = sortData(testData, 'age', 'desc', 'number');
      expect(sorted[0].age).toBe(45);
      expect(sorted[3].age).toBe(25);
    });

    test('sorts date data in ascending order', () => {
      const sorted = sortData(testData, 'joinDate', 'asc', 'date');
      expect(sorted[0].joinDate).toEqual(new Date('2019-11-05'));
      expect(sorted[3].joinDate).toEqual(new Date('2022-02-10'));
    });

    test('sorts boolean data', () => {
      const sorted = sortData(testData, 'isActive', 'asc', 'boolean');
      expect(sorted[0].isActive).toBe(false);
      expect(sorted[1].isActive).toBe(true);
    });

    test('handles null or undefined values', () => {
      const dataWithNull = [
        ...testData,
        { id: 5, name: null, age: 33, isActive: true, joinDate: new Date('2020-05-15') },
      ];
      const sorted = sortData(dataWithNull, 'name', 'asc', 'string');
      expect(sorted[0].name).toBe(null);
    });
  });

  describe('filterData', () => {
    test('filters by string value', () => {
      const filtered = filterData(testData, { name: 'bob' }, columns);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Bob');
    });

    test('filters by number value', () => {
      const filtered = filterData(testData, { age: 30 }, columns);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('John');
    });

    test('filters by boolean value', () => {
      const filtered = filterData(testData, { isActive: false }, columns);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Alice');
    });

    test('filters by multiple criteria', () => {
      const filtered = filterData(testData, { isActive: true, age: 30 }, columns);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('John');
    });

    test('returns all data when no filters provided', () => {
      const filtered = filterData(testData, {}, columns);
      expect(filtered.length).toBe(testData.length);
    });

    test('returns empty array when no matches found', () => {
      const filtered = filterData(testData, { name: 'NonExistent' }, columns);
      expect(filtered.length).toBe(0);
    });

    // Tests for expression filtering
    describe('expression filtering', () => {
      test('filters with greater than operator', () => {
        const filtered = filterData(testData, { age: '>30' }, columns);
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('Bob');
        expect(filtered[0].age).toBe(45);
      });

      test('filters with less than operator', () => {
        const filtered = filterData(testData, { age: '<30' }, columns);
        expect(filtered.length).toBe(2);
        expect(filtered.map(item => item.name).sort()).toEqual(['Alice', 'Zoe']);
      });

      test('filters with greater than or equal operator', () => {
        const filtered = filterData(testData, { age: '>=30' }, columns);
        expect(filtered.length).toBe(2);
        expect(filtered.map(item => item.name).sort()).toEqual(['Bob', 'John']);
      });

      test('filters with less than or equal operator', () => {
        const filtered = filterData(testData, { age: '<=28' }, columns);
        expect(filtered.length).toBe(2);
        expect(filtered.map(item => item.name).sort()).toEqual(['Alice', 'Zoe']);
      });

      test('filters with equals operator', () => {
        const filtered = filterData(testData, { age: '=30' }, columns);
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('John');
      });

      test('filters with not equals operator', () => {
        const filtered = filterData(testData, { age: '!=30' }, columns);
        expect(filtered.length).toBe(3);
        expect(filtered.map(item => item.name).sort()).toEqual(['Alice', 'Bob', 'Zoe']);
      });

      test('filters dates with greater than operator', () => {
        const filtered = filterData(testData, { joinDate: '>2020-12-31' }, columns);
        expect(filtered.length).toBe(2);
        expect(filtered.map(item => item.name).sort()).toEqual(['Alice', 'Zoe']);
      });

      test('combines expression filters with regular filters', () => {
        const filtered = filterData(testData, { age: '>25', isActive: true }, columns);
        expect(filtered.length).toBe(3);
        expect(filtered.map(item => item.name).sort()).toEqual(['Bob', 'John', 'Zoe']);
      });
    });
  });

  describe('searchData', () => {
    test('searches across all fields', () => {
      const searched = searchData(testData, 'john');
      expect(searched.length).toBe(1);
      expect(searched[0].name).toBe('John');
    });

    test('searches partial matches', () => {
      const searched = searchData(testData, 'o');
      expect(searched.length).toBe(3); // John, Bob, and Zoe
    });

    test('searches in number fields', () => {
      const searched = searchData(testData, '30');
      expect(searched.length).toBe(1);
      expect(searched[0].age).toBe(30);
    });

    test('searches in date fields', () => {
      const searched = searchData(testData, '2020');
      expect(searched.length).toBe(1);
      expect(searched[0].name).toBe('John');
    });

    test('returns all data when search term is empty', () => {
      const searched = searchData(testData, '');
      expect(searched.length).toBe(testData.length);
    });

    test('returns empty array when no matches found', () => {
      const searched = searchData(testData, 'NonExistent');
      expect(searched.length).toBe(0);
    });
  });
});
