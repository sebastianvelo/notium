export type MemberRole = "owner" | "editor" | "viewer";

export default interface Member {
    id: string;
    userId: string;
    workspaceId: string;
    role: MemberRole;
    joinedAt: string;
}
