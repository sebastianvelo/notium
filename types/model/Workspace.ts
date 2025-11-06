export enum WorkspaceStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}

interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    ownerId: string;
    status: WorkspaceStatus;
}

export default Workspace;