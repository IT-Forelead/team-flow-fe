import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import type { Project } from '@/features/projects/types.ts';
import { humanizeDateTime } from '@/utils/humanize.ts';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLinkIcon } from 'lucide-react';
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
      cell: ({ row }) => {
        const name = row.original.name;
        if (!name) {
          return <div className="text-muted-foreground italic">Unnamed project</div>;
        }

        return <div className="truncate text-left font-medium">{name}</div>;
      },
      size: 200,
    },
    {
      accessorKey: 'url',
      header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
      cell: ({ row }) => {
        const url = row.original.url;

        return (
          <div className="flex items-center space-x-2 truncate">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 truncate text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
            >
              <span className="truncate">{url}</span>
              <ExternalLinkIcon className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
        );
      },
      size: 300,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        return (
          <div className="max-w-full truncate text-left">
            {humanizeDateTime(row.original.createdAt)}
          </div>
        );
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
