import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "@/lib/dto/WorkspaceUpdateDTO";
import Workspace from "@/types/model/Workspace";

interface IWorkspaceRepository {
    findAll(): Promise<Workspace[]>;
    findById(id: string): Promise<Workspace | null>;
    findByUserId(userId: string): Promise<Workspace[]>;
    findByOwnerId(ownerId: string): Promise<Workspace[]>;
    create(data: WorkspaceCreateDTO): Promise<Workspace>;
    update(id: string, data: Partial<WorkspaceUpdateDTO>): Promise<Workspace | null>;
    delete(id: string): Promise<boolean>;
}

export default  IWorkspaceRepository;