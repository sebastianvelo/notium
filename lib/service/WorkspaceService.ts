import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "@/lib/dto/WorkspaceUpdateDTO";
import toWorkspaceItemView from "@/lib/mapper/toWorkspaceView";
import WorkspaceRepository from "@/lib/repository/workspace";
import Workspace from "@/types/model/Workspace";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
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

    /**
     * Obtiene todos los workspaces donde el usuario es miembro
     * (incluyendo aquellos donde es owner)
     */
    getWorkspacesByUserId(userId: string): Promise<Workspace[]> {
        return WorkspaceRepository.findByUserId(userId);
    },

    async createWorkspace(data: WorkspaceCreateDTO): Promise<Workspace> {
        const workspace = await WorkspaceRepository.create(data);
        await MemberService.addMember({
            userId: data.ownerId,
            workspaceId: workspace.id,
            role: "owner"
        });
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
    },

    async getWorkspaceViewById(id: string): Promise<WorkspaceItemView | null> {
        const workspace = await WorkspaceRepository.findById(id);
        return workspace ? toWorkspaceItemView(workspace) : null;
    },

    async getWorkspacesViewByOwner(ownerId: string): Promise<WorkspaceItemView[]> {
        const workspaces = await WorkspaceRepository.findByOwnerId(ownerId);
        return workspaces.map(toWorkspaceItemView);
    },

    async getWorkspacesViewByUserId(userId: string): Promise<WorkspaceItemView[]> {
        console.log("🔍 [Service] Obteniendo workspaces para userId:", userId);
        const workspaces = await WorkspaceRepository.findByUserId(userId);
        console.log("✅ [Service] Workspaces encontrados:", workspaces.length);
        return workspaces.map(toWorkspaceItemView);
    },
};

export default WorkspaceService;