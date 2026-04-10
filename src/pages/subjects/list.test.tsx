import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock heavy Refine dependencies
vi.mock('@refinedev/react-table', () => ({
    useTable: vi.fn(),
}));

vi.mock('@/components/refine-ui/views/list-view.tsx', () => ({
    ListView: ({ children }: { children: React.ReactNode }) => <div data-testid="list-view">{children}</div>,
}));

vi.mock('@/components/refine-ui/layout/breadcrumb.tsx', () => ({
    Breadcrumb: () => <nav data-testid="breadcrumb" />,
}));

vi.mock('@/components/refine-ui/buttons/create.tsx', () => ({
    CreateButton: () => <button data-testid="create-button">Create</button>,
}));

vi.mock('@/components/refine-ui/data-table/data-table.tsx', () => ({
    DataTable: ({ table }: { table: unknown }) => <div data-testid="data-table" data-table={JSON.stringify(table)} />,
}));

vi.mock('@/components/ui/input.tsx', () => ({
    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

vi.mock('@/components/ui/select.tsx', () => ({
    Select: ({ children, value, onValueChange }: { children: React.ReactNode; value: string; onValueChange: (v: string) => void }) => (
        <div data-testid="select" data-value={value}>
            <button data-testid="select-trigger" onClick={() => onValueChange('Computer Science')}>
                {value}
            </button>
            {children}
        </div>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectValue: ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>,
    SelectContent: ({ children }: { children: React.ReactNode }) => <div data-testid="select-content">{children}</div>,
    SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
        <div data-testid={`select-item-${value}`} data-value={value}>{children}</div>
    ),
}));

vi.mock('@/components/ui/badge.tsx', () => ({
    Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
        <span data-testid="badge" data-variant={variant}>{children}</span>
    ),
}));

vi.mock('lucide-react', () => ({
    Search: () => <svg data-testid="search-icon" />,
}));

import { useTable } from '@refinedev/react-table';
import SubjectsList from './list';

const mockUseTable = vi.mocked(useTable);

const createMockTable = () => ({
    getHeaderGroups: () => [],
    getRowModel: () => ({ rows: [] }),
    options: { meta: {} },
});

describe('SubjectsList', () => {
    beforeEach(() => {
        mockUseTable.mockReturnValue(createMockTable() as ReturnType<typeof useTable>);
    });

    it('renders without crashing', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('list-view')).toBeInTheDocument();
    });

    it('renders the page title "Subjects"', () => {
        render(<SubjectsList />);
        expect(screen.getByRole('heading', { name: /subjects/i })).toBeInTheDocument();
    });

    it('renders the breadcrumb', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    });

    it('renders the create button', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('create-button')).toBeInTheDocument();
    });

    it('renders the data table', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });

    it('renders the search input with correct placeholder', () => {
        render(<SubjectsList />);
        expect(screen.getByPlaceholderText('Search by name ...')).toBeInTheDocument();
    });

    it('renders the search icon', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders the department select with initial value "all"', () => {
        render(<SubjectsList />);
        const select = screen.getByTestId('select');
        expect(select).toHaveAttribute('data-value', 'all');
    });

    it('renders all department options from DEPARTMENT_OPTIONS', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('select-item-all')).toBeInTheDocument();
        expect(screen.getByTestId('select-item-Computer Science')).toBeInTheDocument();
        expect(screen.getByTestId('select-item-Maths')).toBeInTheDocument();
        expect(screen.getByTestId('select-item-English')).toBeInTheDocument();
    });

    it('renders "All Departments" as the first option in the select', () => {
        render(<SubjectsList />);
        expect(screen.getByTestId('select-item-all')).toHaveTextContent('All Departments');
    });

    it('renders the intro paragraph text', () => {
        render(<SubjectsList />);
        expect(screen.getByText(/Quick access to essential metrics/i)).toBeInTheDocument();
    });

    it('search input starts with an empty value', () => {
        render(<SubjectsList />);
        const input = screen.getByPlaceholderText('Search by name ...');
        expect((input as HTMLInputElement).value).toBe('');
    });

    it('updates search input value when typed into', () => {
        render(<SubjectsList />);
        const input = screen.getByPlaceholderText('Search by name ...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Calculus' } });
        expect(input.value).toBe('Calculus');
    });

    it('calls useTable with resource "subjects"', () => {
        render(<SubjectsList />);
        expect(mockUseTable).toHaveBeenCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    resource: 'subjects',
                }),
            })
        );
    });

    it('calls useTable with pageSize 10 and server mode pagination', () => {
        render(<SubjectsList />);
        expect(mockUseTable).toHaveBeenCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    pagination: { pageSize: 10, mode: 'server' },
                }),
            })
        );
    });

    it('calls useTable with initial sort by id desc', () => {
        render(<SubjectsList />);
        expect(mockUseTable).toHaveBeenCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    sorters: {
                        initial: [{ field: 'id', order: 'desc' }],
                    },
                }),
            })
        );
    });

    it('calls useTable with no filters when department is "all" and search is empty', () => {
        render(<SubjectsList />);
        expect(mockUseTable).toHaveBeenCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    filters: {
                        permanent: [],
                    },
                }),
            })
        );
    });

    it('calls useTable with department filter after selecting a department', () => {
        render(<SubjectsList />);

        // The mocked Select triggers onValueChange with 'Computer Science' when the trigger button is clicked
        fireEvent.click(screen.getByTestId('select-trigger'));

        expect(mockUseTable).toHaveBeenLastCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    filters: {
                        permanent: [
                            { field: 'department', operator: 'eq', value: 'Computer Science' },
                        ],
                    },
                }),
            })
        );
    });

    it('calls useTable with search filter when a search term is entered', () => {
        render(<SubjectsList />);
        const input = screen.getByPlaceholderText('Search by name ...');
        fireEvent.change(input, { target: { value: 'Calculus' } });

        expect(mockUseTable).toHaveBeenLastCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    filters: {
                        permanent: [
                            { field: 'name', operator: 'contains', value: 'Calculus' },
                        ],
                    },
                }),
            })
        );
    });

    it('calls useTable with both department and search filters when both are set', () => {
        render(<SubjectsList />);

        // Set department filter
        fireEvent.click(screen.getByTestId('select-trigger'));

        // Set search filter
        const input = screen.getByPlaceholderText('Search by name ...');
        fireEvent.change(input, { target: { value: 'Intro' } });

        expect(mockUseTable).toHaveBeenLastCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    filters: {
                        permanent: expect.arrayContaining([
                            { field: 'department', operator: 'eq', value: 'Computer Science' },
                            { field: 'name', operator: 'contains', value: 'Intro' },
                        ]),
                    },
                }),
            })
        );
    });

    it('calls useTable with 4 column definitions', () => {
        render(<SubjectsList />);
        const callArgs = mockUseTable.mock.calls[0][0];
        expect(callArgs.columns).toHaveLength(4);
    });

    it('column definitions include courseCode, name, department, and description', () => {
        render(<SubjectsList />);
        const callArgs = mockUseTable.mock.calls[0][0];
        const columnIds = callArgs.columns.map((c) => (c as { id?: string }).id);
        expect(columnIds).toContain('courseCode');
        expect(columnIds).toContain('name');
        expect(columnIds).toContain('department');
        expect(columnIds).toContain('description');
    });

    it('clears search filters when search input is cleared', () => {
        render(<SubjectsList />);
        const input = screen.getByPlaceholderText('Search by name ...');

        fireEvent.change(input, { target: { value: 'Calculus' } });
        fireEvent.change(input, { target: { value: '' } });

        expect(mockUseTable).toHaveBeenLastCalledWith(
            expect.objectContaining({
                refineCoreProps: expect.objectContaining({
                    filters: {
                        permanent: [],
                    },
                }),
            })
        );
    });
});