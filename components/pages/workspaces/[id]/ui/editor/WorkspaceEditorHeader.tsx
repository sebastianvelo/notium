import Input from "@/components/ui/atoms/input/Input";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";

interface WorkspaceEditorHeaderProps {
    name: string;
    description: string;
    editMode: boolean;
    isLoading: boolean;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
}

const WorkspaceEditorHeader: React.FC<WorkspaceEditorHeaderProps> = ({ name, description, editMode, isLoading, setName, setDescription }) => {
    const { t } = useI18N();

    return (
        <div className="space-y-2">
            {editMode ? (
                <>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t(I18n.WORKSPACE.HEADER.TITLE_PLACEHOLDER)}
                        className="text-2xl font-bold border-0 p-0 focus:ring-0"
                        disabled={isLoading}
                    />
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t(I18n.WORKSPACE.HEADER.SUBTITLE_PLACEHOLDER)}
                        className="text-sm border-0 p-0 focus:ring-0"
                        disabled={isLoading}
                    />
                </>
            ) : (
                <>
                    <Title size="lg">{name}</Title>
                    {description ? <Text t={description} /> : <Text t={I18n.WORKSPACES.CARD.WITHOUT_DESCRIPTION} />}
                </>
            )}
        </div>
    );
};

export default WorkspaceEditorHeader;