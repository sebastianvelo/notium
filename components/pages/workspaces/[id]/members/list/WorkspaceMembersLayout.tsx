import Member from "@/types/Member";
import MemberItem from "./item/MemberItem";

export interface WorkspaceMembersLayoutListProps {
    members: Member[];
}

const WorkspaceMembersEmptyList: React.FC = () => {
    return (
        <div className="text-center py-12">
            <p className="text-secondary-500">No members yet. Invite someone to collaborate!</p>
        </div>
    );
};

const WorkspaceMembersLayoutList: React.FC<WorkspaceMembersLayoutListProps> = ({ members }) => {
    return members.length > 0 ? (
        <div className="space-y-3">
            {members.map(member => <MemberItem key={member.id} member={member} />)}
        </div>
    ) : <WorkspaceMembersEmptyList />;
};

export default WorkspaceMembersLayoutList;