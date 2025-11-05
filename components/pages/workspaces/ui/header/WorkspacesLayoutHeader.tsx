import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";

const WorkspacesLayoutHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <Title t={I18n.WORKSPACES.HEADER.TITLE} />
                <Text t={I18n.WORKSPACES.HEADER.SUBTITLE} />
            </div>
        </div>
    );
};

export default WorkspacesLayoutHeader;