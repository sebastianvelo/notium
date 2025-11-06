import Input from "@/components/ui/atoms/input/Input";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";

interface WorkspaceEditorHeaderProps {
    name: string;
    description: string;
    editMode: boolean;
    isLoading: boolean;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
}

const WorkspaceEditorHeader: React.FC<WorkspaceEditorHeaderProps> = ({ name, description, editMode, isLoading, setName, setDescription }) => {
    return (
        <div className="space-y-2">
            {editMode ? (
                <>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace name"
                        className="text-2xl font-bold border-0 p-0 focus:ring-0"
                        disabled={isLoading}
                    />
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="text-sm border-0 p-0 focus:ring-0"
                        disabled={isLoading}
                    />
                </>
            ) : (
                <>
                    <Title size="lg">{name}</Title>
                    {description && <Text>{description}</Text>}
                </>
            )}
        </div>
    );
};

export default WorkspaceEditorHeader;