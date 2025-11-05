import WorkspaceRepository from "@/lib/repository/WorkspaceRepository";
import Workspace from "@/types/Workspace";

const WorkspaceService = {
    getAllWorkspaces(): Workspace[] {
        return WorkspaceRepository.findAll();
    },

    getWorkspaceById(id: string): Workspace | undefined {
        return WorkspaceRepository.findById(id);
    },

    getWorkspacesByOwner(ownerId: string): Workspace[] {
        return WorkspaceRepository.findByOwnerId(ownerId);
    },

    createWorkspace(data: Omit<Workspace, "id" | "createdAt">): Workspace {
        return WorkspaceRepository.create(data);
    },

    updateWorkspace(
        id: string,
        data: Partial<Omit<Workspace, "id" | "createdAt" | "ownerId">>
    ): Workspace | undefined {
        return WorkspaceRepository.update(id, data);
    },

    deleteWorkspace(id: string): boolean {
        return WorkspaceRepository.delete(id);
    },
};

export default WorkspaceService;

