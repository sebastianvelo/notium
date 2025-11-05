"use client"
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";

const NewWorkspaceLayoutHeader: React.FC = () => {
    return (
        <div>
            <Title t={I18n.WORKSPACE_NEW.HEADER.TITLE} />
            <Text size="sm" t={I18n.WORKSPACE_NEW.HEADER.SUBTITLE} />
        </div>
    );
}

export default NewWorkspaceLayoutHeader;