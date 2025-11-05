import WorkspacesLayoutHeader from "./ui/header/WorkspacesLayoutHeader";
import WorkspacesLayoutList, { WorkspacesLayoutListProps } from "./ui/list/WorkspacesLayoutList";

interface WorkspacesLayoutProps extends WorkspacesLayoutListProps { }

const WorkspacesLayout: React.FC<WorkspacesLayoutProps> = ({ workspaces, isLoading }) => {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WorkspacesLayoutHeader />
            <WorkspacesLayoutList workspaces={workspaces} isLoading={isLoading} />
        </div>
    );
};

export default WorkspacesLayout;