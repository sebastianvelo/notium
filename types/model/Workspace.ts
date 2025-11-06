export enum WorkspaceStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}

export default interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    ownerId: string;
    status: WorkspaceStatus;
}
