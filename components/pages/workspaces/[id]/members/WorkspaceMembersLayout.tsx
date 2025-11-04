import Button from "@/components/ui/atoms/button/Button";
import { Member } from "@/types";
import MemberItem from "./item/MemberItem";

interface WorkspaceMembersLayoutProps {
    members: Member[];
    onInvite: () => void;
}

const WorkspaceMembersLayoutHeader: React.FC<Pick<WorkspaceMembersLayoutProps, "onInvite">> = ({ onInvite }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Team Members</h3>
            <Button onClick={onInvite}>
                Invite Member
            </Button>
        </div>
    );
};

const WorkspaceMembersLayoutList: React.FC<Pick<WorkspaceMembersLayoutProps, "members">> = ({ members }) => {
    return (
        <div className="space-y-3">
            {members.map(member => <MemberItem key={member.id} member={member} />)}
        </div>
    );
};

const WorkspaceMembersEmptyList: React.FC<Pick<WorkspaceMembersLayoutProps, "members">> = ({ members }) => {
    return members.length === 0 && (
        <div className="text-center py-12">
            <p className="text-secondary-500">No members yet. Invite someone to collaborate!</p>
        </div>
    );
};

const WorkspaceMembersLayout: React.FC<WorkspaceMembersLayoutProps> = ({ members, onInvite }) => {
    return (
        <div>
            <WorkspaceMembersLayoutHeader onInvite={onInvite} />
            <WorkspaceMembersLayoutList members={members} />
            <WorkspaceMembersEmptyList members={members} />
        </div>
    );
};

export default WorkspaceMembersLayout;