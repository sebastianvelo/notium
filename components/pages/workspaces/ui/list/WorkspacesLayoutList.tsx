import Loading from "@/components/ui/molecules/loading/Loading";
import I18n from "@/context/language/common/I18nKeys";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import WorkspaceCard from "./card/WorkspaceCard";
import NewWorkspaceButton from "./new/NewWorkspaceButton";
import WorkspacesEmptyList from "./WorkspacesEmptyList";

export interface WorkspacesLayoutListProps {
    workspaces: WorkspaceItemView[];
    isLoading: boolean;
}

const WorkspacesLayoutList: React.FC<WorkspacesLayoutListProps> = ({ workspaces, isLoading }) => {
    return (
        <Loading isLoading={isLoading} loadingText={I18n.WORKSPACES.LOADING}>
            {workspaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                    <NewWorkspaceButton />
                    {workspaces.map(workspace => (
                        <WorkspaceCard key={workspace.id} {...workspace} />
                    ))}
                </div>
            ) : (<WorkspacesEmptyList />)}
        </Loading>
    );
};

export default WorkspacesLayoutList;