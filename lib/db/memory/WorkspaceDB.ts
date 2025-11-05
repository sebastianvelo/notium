import Workspace from "@/types/Workspace";
import workspacesJson from "./mock/workspaces.json";

const WorkspacesDB: Workspace[] = workspacesJson.map((w) => ({
    ...w,
}));

export default WorkspacesDB;
