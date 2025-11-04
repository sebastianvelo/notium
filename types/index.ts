export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    ownerId: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    workspaceId: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    sharedWith: string[];
}

export type MemberRole = "owner" | "editor" | "viewer";

export interface Member {
    id: string;
    email: string;
    name: string;
    role: MemberRole;
    joinedAt: string;
}