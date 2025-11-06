import WorkspaceRepository from "@/lib/repository/workspace/providers/memory";
import Workspace from "@/types/Workspace";
import WorkspaceCreateDTO from "../dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "../dto/WorkspaceUpdateDTO";

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

    createWorkspace(data: WorkspaceCreateDTO): Workspace {
        return WorkspaceRepository.create(data);
    },

    updateWorkspace(id: string, data: Partial<WorkspaceUpdateDTO>): Workspace | undefined {
        return WorkspaceRepository.update(id, data);
    },

    deleteWorkspace(id: string): boolean {
        return WorkspaceRepository.delete(id);
    },
};

export default WorkspaceService;

