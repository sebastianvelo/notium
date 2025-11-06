import MemberRepository from "@/lib/repository/member";
import Member from "@/types/Member";

const MemberService = {
    getMembersByWorkspace(workspaceId: string): Promise<Member[]> {
        return MemberRepository.findByWorkspace(workspaceId);
    },

    getMembersByUser(userId: string): Promise<Member[]> {
        return MemberRepository.findByUser(userId);
    },

    getMember(userId: string, workspaceId: string): Promise<Member | null> {
        return MemberRepository.findByUserInWorkspace(userId, workspaceId);
    },

    async addMember(data: Omit<Member, "id">): Promise<Member> {
        const existing = await MemberRepository.findByUserInWorkspace(
            data.userId,
            data.workspaceId
        );
        if (existing) throw new Error("User is already a member of this workspace");
        return MemberRepository.create(data);
    },

    async updateMemberRole(id: string, role: Member["role"]): Promise<Member | null> {
        return MemberRepository.update(id, { role });
    },

    async removeMember(id: string): Promise<boolean> {
        return MemberRepository.delete(id);
    },
};

export default MemberService;