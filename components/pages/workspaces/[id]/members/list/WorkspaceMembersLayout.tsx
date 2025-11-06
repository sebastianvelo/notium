import MemberItemView from "@/types/view/MemberItemView";
import MemberItem from "./item/MemberItem";
import WorkspaceMembersEmptyList from "./WorkspaceMembersEmptyList";
import MemberItemEditable from "./item/MemberItemEditable";

export interface WorkspaceMembersLayoutListProps {
    members: MemberItemView[];
}

const WorkspaceMembersLayoutList: React.FC<WorkspaceMembersLayoutListProps> = ({ members }) => {
    return members.length > 0 ? (
        <div className="space-y-3">
            {members.map(member => <MemberItemEditable key={member.id} member={member} />)}
        </div>
    ) : <WorkspaceMembersEmptyList />;
};

export default WorkspaceMembersLayoutList;