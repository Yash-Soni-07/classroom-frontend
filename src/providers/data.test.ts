import { describe, it, expect } from 'vitest';
import { dataProvider } from './data';
import { MOCK_SUBJECTS } from './mock-data';

describe('dataProvider', () => {
    describe('getList', () => {
        it('returns all mock subjects for the "subjects" resource', async () => {
            const result = await dataProvider.getList({ resource: 'subjects', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.data).toEqual(MOCK_SUBJECTS);
            expect(result.total).toBe(MOCK_SUBJECTS.length);
        });

        it('returns total equal to MOCK_SUBJECTS length for subjects resource', async () => {
            const result = await dataProvider.getList({ resource: 'subjects', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.total).toBe(3);
        });

        it('returns empty data and total 0 for an unknown resource', async () => {
            const result = await dataProvider.getList({ resource: 'unknown', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it('returns empty data and total 0 for "classes" resource', async () => {
            const result = await dataProvider.getList({ resource: 'classes', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it('returns empty data and total 0 for empty string resource', async () => {
            const result = await dataProvider.getList({ resource: '', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it('returned subjects data contains the expected fields', async () => {
            const result = await dataProvider.getList({ resource: 'subjects', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            result.data.forEach((item) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('courseCode');
                expect(item).toHaveProperty('name');
                expect(item).toHaveProperty('department');
                expect(item).toHaveProperty('description');
                expect(item).toHaveProperty('createdAt');
            });
        });

        it('is case-sensitive: "Subjects" (capitalized) returns empty data', async () => {
            const result = await dataProvider.getList({ resource: 'Subjects', pagination: { current: 1, pageSize: 10 }, filters: [], sorters: [], meta: {} });
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });
    });

    describe('getOne', () => {
        it('throws "This function is not present in mock"', async () => {
            await expect(
                dataProvider.getOne!({ resource: 'subjects', id: 1, meta: {} })
            ).rejects.toThrow('This function is not present in mock');
        });
    });

    describe('create', () => {
        it('throws "This function is not present in mock"', async () => {
            await expect(
                dataProvider.create!({ resource: 'subjects', variables: {}, meta: {} })
            ).rejects.toThrow('This function is not present in mock');
        });
    });

    describe('update', () => {
        it('throws "This function is not present in mock"', async () => {
            await expect(
                dataProvider.update!({ resource: 'subjects', id: 1, variables: {}, meta: {} })
            ).rejects.toThrow('This function is not present in mock');
        });
    });

    describe('deleteOne', () => {
        it('throws "This function is not present in mock"', async () => {
            await expect(
                dataProvider.deleteOne!({ resource: 'subjects', id: 1, meta: {} })
            ).rejects.toThrow('This function is not present in mock');
        });
    });

    describe('getApiUrl', () => {
        it('returns an empty string', () => {
            expect(dataProvider.getApiUrl()).toBe('');
        });

        it('returns a string', () => {
            expect(typeof dataProvider.getApiUrl()).toBe('string');
        });
    });
});