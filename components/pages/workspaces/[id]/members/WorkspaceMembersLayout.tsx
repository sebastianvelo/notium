import WorkspaceMembersLayoutHeader, { WorkspaceMembersLayoutHeaderProps } from "./header/WorkspaceMembersLayoutHeader";
import WorkspaceMembersLayoutList, { WorkspaceMembersLayoutListProps } from "./list/WorkspaceMembersLayout";

interface WorkspaceMembersLayoutProps extends WorkspaceMembersLayoutHeaderProps, WorkspaceMembersLayoutListProps { }

const WorkspaceMembersLayout: React.FC<WorkspaceMembersLayoutProps> = ({ members, onInvite }) => {
    return (
        <div>
            <WorkspaceMembersLayoutHeader onInvite={onInvite} />
            <WorkspaceMembersLayoutList members={members} />
        </div>
    );
};

export default WorkspaceMembersLayout;