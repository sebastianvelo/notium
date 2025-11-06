import Text from "@/components/ui/atoms/text/Text";
import I18n from "@/context/language/common/I18nKeys";

const WorkspaceMembersEmptyList: React.FC = () => {
    return (
        <div className="text-center py-12">
            <Text t={I18n.WORKSPACE.MEMBERS.EMPTY} />
        </div>
    );
};

export default WorkspaceMembersEmptyList;