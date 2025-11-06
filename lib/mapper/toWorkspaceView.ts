import I18n from "@/context/language/common/I18nKeys";
import Workspace from "@/types/model/Workspace";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";

const toWorkspaceItemView = (workspace: Workspace): WorkspaceItemView => {
    return {
        ...workspace,
        createdAt: new Date(workspace.createdAt).toLocaleDateString(),
        description: workspace.description || I18n.WORKSPACES.CARD.WITHOUT_DESCRIPTION
    };
};

export default toWorkspaceItemView;