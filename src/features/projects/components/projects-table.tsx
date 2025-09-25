import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/projects/components/columns.tsx';
import type { Project } from '@/features/projects/types.ts';
import { useProjectsData } from '@/features/projects/utils/data-fetching.ts';
import { useExportConfig } from '@/features/users/utils/config.ts';
import { usersTableConfig } from '@/features/users/utils/table-config.ts';
import { lazy } from 'react';

const ToolbarOptions = lazy(() => import('@/features/projects/components/toolbar-options.tsx'));
const ProjectsTable = () => {
	const {
		projects,
		total,
		isFetching,
		currentPage,
		pageSize,
		onPageChange,
		onPageSizeChange,
		sorting,
		onSortingChange,
		search,
		onSearchChange,
	} = useProjectsData();

	const exportConfig = useExportConfig();

	return (
		<DataTable<Project>
			getColumns={getColumns}
			data={projects}
			totalItems={total}
			isLoading={isFetching}
			currentPage={currentPage}
			pageSize={pageSize}
			onPageChange={onPageChange}
			onPageSizeChange={onPageSizeChange}
			sorting={sorting}
			onSortingChange={onSortingChange}
			searchValue={search}
			onSearchChange={onSearchChange}
			exportConfig={exportConfig}
			idField="id"
			pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
			renderToolbarContent={({
				selectedRows,
				allSelectedIds,
				totalSelectedCount,
				resetSelection,
			}) => (
				<LazyComponent>
					<ToolbarOptions
						selectedUsers={selectedRows.map(row => ({
							id: row.id,
							name: row.name,
						}))}
						allSelectedUserIds={allSelectedIds}
						totalSelectedCount={totalSelectedCount}
						resetSelection={resetSelection}
					/>
				</LazyComponent>
			)}
			config={usersTableConfig}
		/>
	);
};

export default ProjectsTable;
