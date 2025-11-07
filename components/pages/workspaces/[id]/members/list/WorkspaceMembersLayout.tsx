import { LoggedInRole } from "@/hooks/data/useWorkspaceMembers";
import MemberItemView from "@/types/view/MemberItemView";
import MemberItem from "./item/MemberItem";
import MemberItemEditable from "./item/MemberItemEditable";
import WorkspaceMembersEmptyList from "./WorkspaceMembersEmptyList";

export interface WorkspaceMembersLayoutListProps {
    members: MemberItemView[];
    loggedInRole: LoggedInRole;
}

const WorkspaceMembersLayoutList: React.FC<WorkspaceMembersLayoutListProps> = ({ members, loggedInRole }) => {
    const Item = loggedInRole?.isOwner ? MemberItemEditable : MemberItem;

    return members.length > 0 ? (
        <div className="space-y-2">
            {members.map(member => member.isLoggedIn ? (
                <MemberItem key={member.id} member={member} />
            ) : (
                <Item key={member.id} member={member} />
            ))}
        </div>
    ) : <WorkspaceMembersEmptyList />;
};

export default WorkspaceMembersLayoutList;