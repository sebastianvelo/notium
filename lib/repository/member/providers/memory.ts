import MembersDB from "@/lib/db/memory/MemberDB";
import IMemberRepository from "@/lib/repository/member/interface";
import Member from "@/types/Member";

class MemberRepositoryMemory implements IMemberRepository {
    async findAll(): Promise<Member[]> {
        return MembersDB;
    }

    async findById(id: string): Promise<Member | null> {
        return MembersDB.find((m) => m.id === id) || null;
    }

    async findByWorkspace(workspaceId: string): Promise<Member[]> {
        return MembersDB.filter((m) => m.workspaceId === workspaceId);
    }

    async findByUser(userId: string): Promise<Member[]> {
        return MembersDB.filter((m) => m.userId === userId);
    }

    async findByUserInWorkspace(userId: string, workspaceId: string): Promise<Member | null> {
        return MembersDB.find((m) => m.userId === userId && m.workspaceId === workspaceId) || null;
    }

    async create(data: Omit<Member, "id">): Promise<Member> {
        const newMember: Member = {
            id: `mem_${MembersDB.length + 1}`,
            ...data,
        };
        MembersDB.push(newMember);
        return newMember;
    }

    async update(id: string, data: Partial<Omit<Member, "id">>): Promise<Member | null> {
        const index = MembersDB.findIndex((m) => m.id === id);
        if (index === -1) return null;

        MembersDB[index] = { ...MembersDB[index], ...data };
        return MembersDB[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = MembersDB.findIndex((m) => m.id === id);
        if (index === -1) return false;

        MembersDB.splice(index, 1);
        return true;
    }
}

export default new MemberRepositoryMemory();