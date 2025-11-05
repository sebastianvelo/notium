import Workspace from "@/types/Workspace";

type WorkspaceUpdateDTO = Omit<Workspace, "id" | "createdAt" | "ownerId">;

export default WorkspaceUpdateDTO;