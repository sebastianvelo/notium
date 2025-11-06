import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Select from "@/components/ui/molecules/select/Select";
import useMemberActions from "@/hooks/controller/useMemberActions";
import useWorkspace from "@/hooks/data/useWorkspace";
import { MemberRole } from "@/types/model/Member";
import MemberItemView from "@/types/view/MemberItemView";
import { Trash } from "lucide-react";
import MemberItem from "./MemberItem";

const options = [
    { label: "Admin", value: "owner" },
    { label: "Editor", value: "editor" },
    { label: "Lector", value: "viewer" },
];

interface MemberItemEditableProps {
    member: MemberItemView;
}

const MemberItemEditable: React.FC<MemberItemEditableProps> = ({ member }) => {
    const { workspace } = useWorkspace();
    const { updateRole, removeMember, isLoading } = useMemberActions(workspace.id);

    return (
        <div className="flex w-full  h-full">
            <MemberItem member={member} />
            <div className="flex gap-2 ml-4">
                <Select name={`${member.id}-role`} value={member.role} options={options} onChange={(e) => updateRole(member.id, e.target.value as MemberRole)} />
                <Button variant="ghost" onClick={() => removeMember(member.id)} disabled={isLoading} className="flex flex-col items-center space-y-2">
                    <Trash className="w-4 h-4" />
                    <Text size="xs" t={"Remove"} />
                </Button>
            </div>
        </div>
    );
};

export default MemberItemEditable;
