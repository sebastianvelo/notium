export default interface Note {
    id: string;
    title: string;
    content: string;
    workspaceId: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    sharedWith: string[];
}
