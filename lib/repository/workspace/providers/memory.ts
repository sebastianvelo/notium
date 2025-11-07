import WorkspacesDB from "@/lib/db/memory/WorkspaceDB";
import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "@/lib/dto/WorkspaceUpdateDTO";
import IWorkspaceRepository from "@/lib/repository/workspace/interface";
import Workspace, { WorkspaceStatus } from "@/types/model/Workspace";

class WorkspaceRepositoryMemory implements IWorkspaceRepository {
    async findAll(): Promise<Workspace[]> {
        return WorkspacesDB;
    }

    async findById(id: string): Promise<Workspace | null> {
        return WorkspacesDB.find((w) => w.id === id) || null;
    }

    async findByOwnerId(ownerId: string): Promise<Workspace[]> {
        return WorkspacesDB.filter((w) => w.ownerId === ownerId);
    }

    async findByUserId(userId: string): Promise<Workspace[]> {
        return WorkspacesDB.filter((w) => w.ownerId === userId);
    }

    async create(data: WorkspaceCreateDTO): Promise<Workspace> {
        const newWorkspace: Workspace = {
            id: `ws_${WorkspacesDB.length + 1}`,
            createdAt: new Date().toISOString(),
            status: WorkspaceStatus.ACTIVE,
            ...data,
        };
        WorkspacesDB.push(newWorkspace);
        return newWorkspace;
    }

    async update(id: string, data: Partial<WorkspaceUpdateDTO>): Promise<Workspace | null> {
        const index = WorkspacesDB.findIndex((w) => w.id === id);
        if (index === -1) return null;

        WorkspacesDB[index] = { ...WorkspacesDB[index], ...data };
        return WorkspacesDB[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = WorkspacesDB.findIndex((w) => w.id === id);
        if (index === -1) return false;

        WorkspacesDB.splice(index, 1);
        return true;
    }
}

export default new WorkspaceRepositoryMemory();