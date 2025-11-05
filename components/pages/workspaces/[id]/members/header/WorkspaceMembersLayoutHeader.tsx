import Button from "@/components/ui/atoms/button/Button";

export interface WorkspaceMembersLayoutHeaderProps {
    onInvite: () => void;
}

const WorkspaceMembersLayoutHeader: React.FC<WorkspaceMembersLayoutHeaderProps> = ({ onInvite }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Team Members</h3>
            <Button onClick={onInvite}>
                Invite Member
            </Button>
        </div>
    );
};

export default WorkspaceMembersLayoutHeader;