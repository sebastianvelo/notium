import Workspace from "@/types/model/Workspace";

type WorkspaceCreateDTO = Omit<Workspace, "id" | "createdAt" | "status">;

export default WorkspaceCreateDTO;