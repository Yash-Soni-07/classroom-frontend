import { describe, it, expect } from 'vitest';
import { MOCK_SUBJECTS } from './mock-data';

describe('MOCK_SUBJECTS', () => {
    it('is an array', () => {
        expect(Array.isArray(MOCK_SUBJECTS)).toBe(true);
    });

    it('contains exactly 3 subjects', () => {
        expect(MOCK_SUBJECTS).toHaveLength(3);
    });

    it('every subject has all required fields', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(subject).toHaveProperty('id');
            expect(subject).toHaveProperty('courseCode');
            expect(subject).toHaveProperty('name');
            expect(subject).toHaveProperty('department');
            expect(subject).toHaveProperty('description');
            expect(subject).toHaveProperty('createdAt');
        });
    });

    it('every subject id is a positive integer', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.id).toBe('number');
            expect(Number.isInteger(subject.id)).toBe(true);
            expect(subject.id).toBeGreaterThan(0);
        });
    });

    it('all subject ids are unique', () => {
        const ids = MOCK_SUBJECTS.map((s) => s.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(MOCK_SUBJECTS.length);
    });

    it('every subject courseCode is a non-empty string', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.courseCode).toBe('string');
            expect(subject.courseCode.trim().length).toBeGreaterThan(0);
        });
    });

    it('all course codes are unique', () => {
        const codes = MOCK_SUBJECTS.map((s) => s.courseCode);
        const uniqueCodes = new Set(codes);
        expect(uniqueCodes.size).toBe(MOCK_SUBJECTS.length);
    });

    it('every subject name is a non-empty string', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.name).toBe('string');
            expect(subject.name.trim().length).toBeGreaterThan(0);
        });
    });

    it('every subject department is a non-empty string', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.department).toBe('string');
            expect(subject.department.trim().length).toBeGreaterThan(0);
        });
    });

    it('every subject description is a non-empty string', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.description).toBe('string');
            expect(subject.description.trim().length).toBeGreaterThan(0);
        });
    });

    it('every subject createdAt is a valid ISO date string', () => {
        MOCK_SUBJECTS.forEach((subject) => {
            expect(typeof subject.createdAt).toBe('string');
            const parsed = new Date(subject.createdAt);
            expect(parsed.toString()).not.toBe('Invalid Date');
            expect(Number.isNaN(parsed.getTime())).toBe(false);
        });
    });

    it('contains a Computer Science subject with courseCode CS101', () => {
        const cs = MOCK_SUBJECTS.find((s) => s.courseCode === 'CS101');
        expect(cs).toBeDefined();
        expect(cs?.department).toBe('CS');
        expect(cs?.name).toBe('Introduction to Computer Science');
    });

    it('contains a Math subject with courseCode MATH201', () => {
        const math = MOCK_SUBJECTS.find((s) => s.courseCode === 'MATH201');
        expect(math).toBeDefined();
        expect(math?.department).toBe('Math');
        expect(math?.name).toBe('Calculus II');
    });

    it('contains an English subject with courseCode ENG102', () => {
        const eng = MOCK_SUBJECTS.find((s) => s.courseCode === 'ENG102');
        expect(eng).toBeDefined();
        expect(eng?.department).toBe('English');
        expect(eng?.name).toBe('Literature and Composition');
    });

    it('subject ids are 1, 2, and 3', () => {
        const ids = MOCK_SUBJECTS.map((s) => s.id).sort((a, b) => a - b);
        expect(ids).toEqual([1, 2, 3]);
    });
});