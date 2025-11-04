import { Member } from "@/types";

interface MemberListEmptyProps {
    members: Member[];
}

const MemberListEmpty: React.FC<MemberListEmptyProps> = ({ members }) => {
    return members.length === 0 && (
        <div className="text-center py-12">
            <p className="text-gray-500">No members yet. Invite someone to collaborate!</p>
        </div>
    );
};

export default MemberListEmpty;