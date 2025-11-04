import Button from "@/components/ui/atoms/button/Button";
import { Workspace } from "@/types";
import Link from "next/link";
import WorkspaceCard from "./card/WorkspaceCard";

interface WorkspacesLayoutProps {
    workspaces: Workspace[];
    isLoading: boolean;
}

const WorkspacesLayoutHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-secondary-900">My Workspaces</h1>
                <p className="text-secondary-600 mt-1">Select a workspace to get started</p>
            </div>
            <Link href="/workspaces/new">
                <Button>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Workspace
                </Button>
            </Link>
        </div>
    );
};

const WorkspacesEmptyList: React.FC = () => {
    return (
        <div className="text-center py-12 bg-white rounded-lg border border-secondary-200">
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

const WorkspacesLayoutList: React.FC<WorkspacesLayoutProps> = ({ workspaces, isLoading }) => {
    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-secondary-600 mt-4">Loading workspaces...</p>
            </div>
        )
    };

    return workspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map(workspace => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
        </div>
    ) : <WorkspacesEmptyList />;
};

const WorkspacesLayout: React.FC<WorkspacesLayoutProps> = ({ workspaces, isLoading }) => {
    return (
        <div className="min-h-screen bg-secondary-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WorkspacesLayoutHeader />
            <WorkspacesLayoutList workspaces={workspaces} isLoading={isLoading} />
        </div>
    );
};

export default WorkspacesLayout;