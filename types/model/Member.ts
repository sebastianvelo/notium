export type MemberRole = "owner" | "editor" | "viewer";

interface Member {
    id: string;
    userId: string;
    workspaceId: string;
    role: MemberRole;
    joinedAt: string;
}

export default Member;