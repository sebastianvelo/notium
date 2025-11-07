import Button from "@/components/ui/atoms/button/Button";
import Select from "@/components/ui/molecules/select/Select";
import useMemberActions from "@/hooks/controller/useMemberActions";
import { MemberRole } from "@/types/model/Member";
import MemberItemView from "@/types/view/MemberItemView";
import { Trash } from "lucide-react";
import MemberItem from "./MemberItem";

interface MemberItemEditableProps {
    member: MemberItemView;
}

const MemberItemEditable: React.FC<MemberItemEditableProps> = ({ member }) => {
    const { updateRole, removeMember, isLoading, availableRoles: options } = useMemberActions();

    return (
        <div className="flex w-full h-full">
            <MemberItem member={member} />
            <div className="flex flex-col bg-white dark:bg-black items-center  border border-secondary-200 dark:border-secondary-900 rounded-lg">
                <Select name={`${member.id}-role`} value={member.role} options={options} onChange={(e) => updateRole(member.id, e.target.value as MemberRole)} />
                <Button variant="danger" onClick={() => removeMember(member.id)} disabled={isLoading} className="w-full h-full flex justify-center items-center">
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default MemberItemEditable;
