import Member from "@/types/model/Member";

export default interface IMemberRepository {
    findAll(): Promise<Member[]>;
    findById(id: string): Promise<Member | null>;
    findByWorkspace(workspaceId: string): Promise<Member[]>;
    findByUser(userId: string): Promise<Member[]>;
    findByUserInWorkspace(userId: string, workspaceId: string): Promise<Member | null>;
    create(data: Omit<Member, "id">): Promise<Member>;
    update(id: string, data: Partial<Omit<Member, "id">>): Promise<Member | null>;
    delete(id: string): Promise<boolean>;
}