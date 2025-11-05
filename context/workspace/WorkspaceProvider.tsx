import { PropsWithChildren } from "react";
import WorkspaceContext, { WorkspaceContextType } from "./WorkspaceContext";

const WorkspaceProvider: React.FC<PropsWithChildren<WorkspaceContextType>> = ({ children, workspace, workspaceId }) => {
    return (
        <WorkspaceContext.Provider value={{ workspace, workspaceId }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceProvider;