import Member from "@/types/model/Member";
import User from "@/types/model/User";
import MemberView from "@/types/view/MemberItemView";
import getRoleBadgeColor from "./common/getRoleBadgeColor";

const toMemberView = (member: Member, user: User): MemberView => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar ?? undefined,
        role: member.role,
        color: getRoleBadgeColor(member.role)
    };
}

export default toMemberView;