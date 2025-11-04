import { Member } from "@/types";
import MemberItem from "./MemberItem";
import MemberListEmpty from "./MemberListEmpty";
import MemberListHeader from "./MemberListHeader";

interface MemberListProps {
    members: Member[];
    onInvite: () => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onInvite }) => {
    return (
        <div>
            <MemberListHeader onInvite={onInvite} />
            <div className="space-y-3">
                {members.map(member => <MemberItem member={member} />)}
            </div>
            <MemberListEmpty members={members} />
        </div>
    );
};

export default MemberList;