import WorkspacesDB from "@/lib/db/memory/WorkspaceDB";
import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "@/lib/dto/WorkspaceUpdateDTO";
import Workspace, { WorkspaceStatus } from "@/types/Workspace";

const WorkspaceRepository = {
    findAll(): Workspace[] {
        return WorkspacesDB;
    },

    findById(id: string): Workspace | undefined {
        return WorkspacesDB.find((w) => w.id === id);
    },

    findByOwnerId(ownerId: string): Workspace[] {
        return WorkspacesDB.filter((w) => w.ownerId === ownerId);
    },

    create(data: WorkspaceCreateDTO): Workspace {
        const newWorkspace: Workspace = {
            id: `ws_${WorkspacesDB.length + 1}`,
            createdAt: new Date().toISOString(),
            status: WorkspaceStatus.ACTIVE,
            ...data,
        };
        WorkspacesDB.push(newWorkspace);
        return newWorkspace;
    },

    update(id: string, data: Partial<WorkspaceUpdateDTO>): Workspace | undefined {
        const index = WorkspacesDB.findIndex((w) => w.id === id);
        if (index === -1) return undefined;

        WorkspacesDB[index] = { ...WorkspacesDB[index], ...data };
        return WorkspacesDB[index];
    },

    delete(id: string): boolean {
        const index = WorkspacesDB.findIndex((w) => w.id === id);
        if (index === -1) return false;

        WorkspacesDB.splice(index, 1);
        return true;
    },
};

export default WorkspaceRepository;

