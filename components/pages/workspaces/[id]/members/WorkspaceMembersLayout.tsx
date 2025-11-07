import WorkspaceMembersLayoutHeader, { WorkspaceMembersLayoutHeaderProps } from "./header/WorkspaceMembersLayoutHeader";
import WorkspaceMembersLayoutList, { WorkspaceMembersLayoutListProps } from "./list/WorkspaceMembersLayout";

interface WorkspaceMembersLayoutProps extends WorkspaceMembersLayoutHeaderProps, WorkspaceMembersLayoutListProps { }

const WorkspaceMembersLayout: React.FC<WorkspaceMembersLayoutProps> = ({ members, loggedInRole }) => {
    return (
        <div>
            <WorkspaceMembersLayoutHeader loggedInRole={loggedInRole} />
            <WorkspaceMembersLayoutList members={members} loggedInRole={loggedInRole} />
        </div>
    );
};

export default WorkspaceMembersLayout;