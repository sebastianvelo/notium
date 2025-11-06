import Workspace from "@/types/model/Workspace";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";

const toWorkspaceItemView = (workspace: Workspace): WorkspaceItemView => {
    return {
        ...workspace,
        createdAt: new Date(workspace.createdAt).toLocaleDateString(),
    };
};

export default toWorkspaceItemView;