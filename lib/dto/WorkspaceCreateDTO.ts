import Workspace from "@/types/Workspace";

type WorkspaceCreateDTO = Omit<Workspace, "id" | "createdAt" | "status">;

export default WorkspaceCreateDTO;