export default interface Note {
    id: string;
    title: string;
    content: string;
    workspaceId: string; //workspace.id
    createdAt: string;
    updatedAt: string;
    createdBy: string; //user.id
    sharedWith: string[]; ////user.id[]
}
