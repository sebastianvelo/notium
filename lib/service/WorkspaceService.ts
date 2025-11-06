import WorkspaceRepository from "@/lib/repository/workspace/providers/memory";
import Workspace from "@/types/Workspace";
import WorkspaceCreateDTO from "../dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "../dto/WorkspaceUpdateDTO";

const WorkspaceService = {
    getAllWorkspaces(): Promise<Workspace[]> {
        return WorkspaceRepository.findAll();
    },

    getWorkspaceById(id: string): Promise<Workspace | null> {
        return WorkspaceRepository.findById(id);
    },

    getWorkspacesByOwner(ownerId: string): Promise<Workspace[]> {
        return WorkspaceRepository.findByOwnerId(ownerId);
    },

    createWorkspace(data: WorkspaceCreateDTO): Promise<Workspace> {
        return WorkspaceRepository.create(data);
    },

    updateWorkspace(id: string, data: Partial<WorkspaceUpdateDTO>): Promise<Workspace | null> {
        return WorkspaceRepository.update(id, data);
    },

    deleteWorkspace(id: string): Promise<boolean> {
        return WorkspaceRepository.delete(id);
    },

    addMember(id: string, userId: string, role: string): any { //TODO FIX THIS
        return "";
    }
};

export default WorkspaceService;

