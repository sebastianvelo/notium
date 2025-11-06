import mapMemberToView from "@/lib/mapper/member-item/memberItemMapper";
import MemberRepository from "@/lib/repository/member";
import Member from "@/types/model/Member";
import MemberItemView from "@/types/view/MemberItemView";
import UserService from "./UserService";

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

    async getMembersViewsByWorkspace(workspaceId: string): Promise<MemberItemView[]> {
        const members = await this.getMembersByWorkspace(workspaceId);

        // Traemos los users en paralelo
        const users = await Promise.all(
            members.map((m) => UserService.getUserById(m.userId))
        );

        // Mapear solo si el user existe (por si hay basura en la DB)
        return members
            .map((member, index) => {
                const user = users[index];
                if (!user) return null; 
                return mapMemberToView(member, user);
            })
            .filter(Boolean) as MemberItemView[];
    },
};

export default MemberService;