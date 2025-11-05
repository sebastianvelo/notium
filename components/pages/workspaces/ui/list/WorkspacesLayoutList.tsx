import Workspace from "@/types/Workspace";
import WorkspaceCard from "./card/WorkspaceCard";
import WorkspacesEmptyList from "./WorkspacesEmptyList";

export interface WorkspacesLayoutListProps {
    workspaces: Workspace[];
    isLoading: boolean;
}

const WorkspacesLayoutList: React.FC<WorkspacesLayoutListProps> = ({ workspaces, isLoading }) => {
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

export default WorkspacesLayoutList;