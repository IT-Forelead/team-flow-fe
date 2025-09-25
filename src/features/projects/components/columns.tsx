import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import type { Project } from '@/features/projects/types.ts';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './row-actions';

export const getColumns = (
	handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Project>[] => {
	// Base columns without the select column
	const baseColumns: ColumnDef<Project>[] = [
		{
			id: 'rowNumber',
			header: ({ column }) => <DataTableColumnHeader column={column} title="№" />,
			cell: ({ row }) => row.index + 1,
			size: 70,
		},
		{
			accessorKey: 'name',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
			cell: ({ row }) => (
				<div className="truncate text-left font-medium">{row.getValue('name')}</div>
			),
			size: 200,
		},
		{
			accessorKey: 'url',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Url" />,
			cell: ({ row }) => {
				return (
					<div className="flex space-x-2 truncate">
						<span className="truncate font-medium">{row.getValue('email')}</span>
					</div>
				);
			},
			size: 250,
		},
		{
			accessorKey: 'createdAt',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
			cell: ({ row }) => {
				return <div className="max-w-full truncate text-left">{row.original.createdAt}</div>;
			},
			size: 120,
		},
		{
			id: 'actions',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
			cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
			size: 100,
		},
	];

	// Only include the select column if row selection is enabled
	if (handleRowDeselection !== null) {
		return [
			{
				id: 'select',
				header: ({ table }) => (
					<div className="truncate pl-2">
						<Checkbox
							checked={
								table.getIsAllPageRowsSelected() ||
								(table.getIsSomePageRowsSelected() && 'indeterminate')
							}
							onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
							aria-label="Select all"
							className="translate-y-0.5 cursor-pointer"
						/>
					</div>
				),
				cell: ({ row }) => (
					<div className="truncate">
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={value => {
								if (value) {
									row.toggleSelected(true);
								} else {
									row.toggleSelected(false);
									// If we have a deselection handler, use it for better cross-page tracking
									if (handleRowDeselection) {
										handleRowDeselection(row.id);
									}
								}
							}}
							aria-label="Select row"
							className="translate-y-0.5 cursor-pointer"
						/>
					</div>
				),
				enableSorting: false,
				enableHiding: false,
				size: 50,
			},
			...baseColumns,
		];
	}

	// Return only the base columns if row selection is disabled
	return baseColumns;
};
