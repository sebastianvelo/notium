import WorkspaceContext, { WorkspaceContextType } from "@/context/workspace/WorkspaceContext";
import { useContext } from "react";

const useWorkspace = (): WorkspaceContextType => {
    const context = useContext(WorkspaceContext);

    if (context === undefined) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }

    return context;
};

export default useWorkspace;