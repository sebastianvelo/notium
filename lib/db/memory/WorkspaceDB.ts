import Workspace, { WorkspaceStatus } from "@/types/model/Workspace";
import workspacesJson from "./mock/workspaces.json";

const WorkspacesDB: Workspace[] = workspacesJson.map((w) => ({
    ...w,
    status: w.status as WorkspaceStatus
}));

export default WorkspacesDB;
