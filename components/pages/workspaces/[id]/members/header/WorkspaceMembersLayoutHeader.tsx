import Button from "@/components/ui/atoms/button/Button";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import { LoggedInRole } from "@/hooks/data/useWorkspaceMembers";

export interface WorkspaceMembersLayoutHeaderProps {
    onInvite: () => void;
    loggedInRole: LoggedInRole;
}

const WorkspaceMembersLayoutHeader: React.FC<WorkspaceMembersLayoutHeaderProps> = ({ onInvite, loggedInRole }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Title t={I18n.WORKSPACE.MEMBERS.TITLE} />
            {loggedInRole.isOwner && <Button onClick={onInvite} t={I18n.WORKSPACE.MEMBERS.INVITE} />}
        </div>
    );
};

export default WorkspaceMembersLayoutHeader;