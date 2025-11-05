export type MemberRole = "owner" | "editor" | "viewer";

export default interface Member {
    id: string;
    email: string;
    name: string;
    role: MemberRole;
    joinedAt: string;
}
