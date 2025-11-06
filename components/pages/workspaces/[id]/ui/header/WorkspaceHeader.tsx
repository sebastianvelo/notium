import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import useWorkspace from "@/hooks/data/useWorkspace";

const WorkspaceHeader: React.FC = () => {
    const { workspace } = useWorkspace();

    return (
        <>
            <Title size="lg">{workspace.name}</Title>
            {workspace.description ?
                <Text t={workspace.description} /> :
                <Text t={I18n.WORKSPACES.CARD.WITHOUT_DESCRIPTION} />
            }
        </>
    );
};

export default WorkspaceHeader;