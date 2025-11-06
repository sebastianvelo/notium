import Workspace from "@/types/model/Workspace";

type WorkspaceUpdateDTO = Omit<Workspace, "id" | "createdAt" | "ownerId">;

export default WorkspaceUpdateDTO;