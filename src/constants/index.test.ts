import { describe, it, expect } from 'vitest';
import { DEPARTMENTS, DEPARTMENT_OPTIONS } from './index';

describe('DEPARTMENTS', () => {
    it('contains the expected department names', () => {
        expect(DEPARTMENTS).toContain('Computer Science');
        expect(DEPARTMENTS).toContain('Maths');
        expect(DEPARTMENTS).toContain('English');
    });

    it('has exactly 3 departments', () => {
        expect(DEPARTMENTS).toHaveLength(3);
    });

    it('is an array of strings', () => {
        DEPARTMENTS.forEach((dept) => {
            expect(typeof dept).toBe('string');
        });
    });

    it('contains no duplicate entries', () => {
        const unique = new Set(DEPARTMENTS);
        expect(unique.size).toBe(DEPARTMENTS.length);
    });

    it('contains no empty strings', () => {
        DEPARTMENTS.forEach((dept) => {
            expect(dept.trim().length).toBeGreaterThan(0);
        });
    });
});

describe('DEPARTMENT_OPTIONS', () => {
    it('has the same number of entries as DEPARTMENTS', () => {
        expect(DEPARTMENT_OPTIONS).toHaveLength(DEPARTMENTS.length);
    });

    it('each option has a value and label property', () => {
        DEPARTMENT_OPTIONS.forEach((option) => {
            expect(option).toHaveProperty('value');
            expect(option).toHaveProperty('label');
        });
    });

    it('each option value equals its label', () => {
        DEPARTMENT_OPTIONS.forEach((option) => {
            expect(option.value).toBe(option.label);
        });
    });

    it('each option value matches its corresponding DEPARTMENTS entry', () => {
        DEPARTMENT_OPTIONS.forEach((option, index) => {
            expect(option.value).toBe(DEPARTMENTS[index]);
            expect(option.label).toBe(DEPARTMENTS[index]);
        });
    });

    it('includes an option for Computer Science', () => {
        const option = DEPARTMENT_OPTIONS.find((o) => o.value === 'Computer Science');
        expect(option).toBeDefined();
        expect(option?.label).toBe('Computer Science');
    });

    it('includes an option for Maths', () => {
        const option = DEPARTMENT_OPTIONS.find((o) => o.value === 'Maths');
        expect(option).toBeDefined();
        expect(option?.label).toBe('Maths');
    });

    it('includes an option for English', () => {
        const option = DEPARTMENT_OPTIONS.find((o) => o.value === 'English');
        expect(option).toBeDefined();
        expect(option?.label).toBe('English');
    });

    it('produces plain objects with no extra properties', () => {
        DEPARTMENT_OPTIONS.forEach((option) => {
            expect(Object.keys(option)).toEqual(['value', 'label']);
        });
    });
});