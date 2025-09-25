import { Button } from '@/components/ui/button';
import { CreateAgent } from '@/features/ai-agents/components/actions/CreateAgent.tsx';
import { BulkDeleteUser } from '@/features/users/components/actions/BulkDeleteUser.tsx';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

interface ToolbarOptionsProps {
	// Current page selected users with name data
	selectedUsers: { id: string; name: string }[];
	// All selected user IDs across all pages (for operations that only need IDs)
	allSelectedUserIds?: (string | number)[];
	// Total count of selected items across all pages
	totalSelectedCount: number;
	resetSelection: () => void;
}

const ToolbarOptions = ({
	selectedUsers,
	allSelectedUserIds = [],
	totalSelectedCount,
	resetSelection,
}: ToolbarOptionsProps) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	// Use total selected count if available, otherwise fall back to the current page selection
	const selectionCount = totalSelectedCount || selectedUsers.length;

	// Determine which IDs to use for operations - prefer all selected IDs if available
	const selectedIds =
		allSelectedUserIds.length > 0 ? allSelectedUserIds : selectedUsers.map(user => user.id);

	return (
		<>
			{/* Desktop layout */}
			<div className="hidden lg:flex lg:items-center lg:gap-2">
				<CreateAgent />
				{selectionCount > 0 && (
					<Button variant="outline" size="default" onClick={() => setDeleteDialogOpen(true)}>
						<TrashIcon className="mr-2 size-4" aria-hidden="true" />
						Delete ({selectionCount})
					</Button>
				)}
			</div>

			{/* Mobile layout - Full width below main toolbar controls */}
			<div className="flex flex-col gap-2 lg:hidden">
				<CreateAgent className="w-full" />
				{selectionCount > 0 && (
					<Button
						variant="outline"
						size="default"
						onClick={() => setDeleteDialogOpen(true)}
						className="w-full"
					>
						<TrashIcon className="mr-2 size-4" aria-hidden="true" />
						Delete ({selectionCount})
					</Button>
				)}
			</div>

			{selectionCount > 0 && (
				<BulkDeleteUser
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					selectedUsers={selectedUsers}
					allSelectedIds={selectedIds}
					totalSelectedCount={selectionCount}
					resetSelection={resetSelection}
				/>
			)}
		</>
	);
};

export default ToolbarOptions;
