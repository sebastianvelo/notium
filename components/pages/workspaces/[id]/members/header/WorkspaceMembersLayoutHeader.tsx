import Button from "@/components/ui/atoms/button/Button";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import { LoggedInRole } from "@/hooks/data/useWorkspaceMembers";
import WorkspaceMembersInvitation from "./WorkspaceMembersInvitation";

export interface WorkspaceMembersLayoutHeaderProps {
    loggedInRole: LoggedInRole;
}

const WorkspaceMembersLayoutHeader: React.FC<WorkspaceMembersLayoutHeaderProps> = ({ loggedInRole }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Title t={I18n.WORKSPACE.MEMBERS.TITLE} />
            {loggedInRole.isOwner && <WorkspaceMembersInvitation />}
        </div>
    );
};

export default WorkspaceMembersLayoutHeader;