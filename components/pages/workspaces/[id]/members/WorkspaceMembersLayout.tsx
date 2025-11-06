import WorkspaceMembersLayoutHeader, { WorkspaceMembersLayoutHeaderProps } from "./header/WorkspaceMembersLayoutHeader";
import WorkspaceMembersLayoutList, { WorkspaceMembersLayoutListProps } from "./list/WorkspaceMembersLayout";

interface WorkspaceMembersLayoutProps extends WorkspaceMembersLayoutHeaderProps, WorkspaceMembersLayoutListProps { }

const WorkspaceMembersLayout: React.FC<WorkspaceMembersLayoutProps> = ({ members, onInvite, loggedInRole }) => {
    return (
        <div>
            <WorkspaceMembersLayoutHeader onInvite={onInvite} loggedInRole={loggedInRole} />
            <WorkspaceMembersLayoutList members={members} loggedInRole={loggedInRole} />
        </div>
    );
};

export default WorkspaceMembersLayout;