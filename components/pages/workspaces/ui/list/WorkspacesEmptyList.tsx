import Button from "@/components/ui/atoms/button/Button";
import Link from "next/link";

const WorkspacesEmptyList: React.FC = () => {
    return (
        <div className="text-center py-12 bg-white dark:bg-black rounded-lg border border-secondary-200 dark:border-secondary-900">
            <svg className="w-16 h-16 text-secondary-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No workspaces yet</h3>
            <p className="text-secondary-600 mb-4">Create your first workspace to get started</p>
            <Link href="/workspaces/new">
                <Button>Create Workspace</Button>
            </Link>
        </div>
    );
};

export default WorkspacesEmptyList;