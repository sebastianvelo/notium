import WorkspaceRepository from "@/lib/repository/workspace";
import Workspace from "@/types/model/Workspace";
import WorkspaceCreateDTO from "../dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "../dto/WorkspaceUpdateDTO";
import MemberService from "./MemberService";

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

    async createWorkspace(data: WorkspaceCreateDTO): Promise<Workspace> {
        const workspace = await WorkspaceRepository.create(data); 
        const member = await MemberService.addMember({
            userId: data.ownerId,
            workspaceId: workspace.id,
            role: "owner"
        });
        console.log(member)
        return workspace;
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

