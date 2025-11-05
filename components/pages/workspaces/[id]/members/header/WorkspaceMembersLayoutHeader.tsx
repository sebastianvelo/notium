import Button from "@/components/ui/atoms/button/Button";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";

export interface WorkspaceMembersLayoutHeaderProps {
    onInvite: () => void;
}

const WorkspaceMembersLayoutHeader: React.FC<WorkspaceMembersLayoutHeaderProps> = ({ onInvite }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Title t={I18n.WORKSPACE.MEMBERS.TITLE} />
            <Button onClick={onInvite} t={I18n.WORKSPACE.MEMBERS.INVITE} />
        </div>
    );
};

export default WorkspaceMembersLayoutHeader;