import Member from "@/types/model/Member";
import User from "@/types/model/User";
import MemberView from "@/types/view/MemberItemView";
import getRoleBadgeColor from "./common/getRoleBadgeColor";

const toMemberView = (member: Member, user: User, loggedInUser: string): MemberView => {
    return {
        id: member.id,
        userId: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar ?? undefined,
        role: member.role,
        color: getRoleBadgeColor(member.role),
        isLoggedIn: user.id === loggedInUser
    };
}

export default toMemberView;