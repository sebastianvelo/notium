import WorkspaceContext from "@/context/workspace/WorkspaceContext";
import { useContext } from "react";

const useWorkspace = () => {
    const context = useContext(WorkspaceContext);

    if (context === undefined) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }

    return context;
};

export default useWorkspace;