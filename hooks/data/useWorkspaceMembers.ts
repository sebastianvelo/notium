import API_ROUTES from "@/constants/api.routes";
import fetcher from "@/lib/fetcher";
import MemberItemView from "@/types/view/MemberItemView";
import useSWR from "swr";
import useAuth from "../controller/useAuth";
import useWorkspace from "./useWorkspace";

const useWorkspaceMembers = () => {
  const { workspace } = useWorkspace();
  const { data: members, error } = useSWR<MemberItemView[]>(API_ROUTES.WORKSPACES.MEMBERS(workspace.id), fetcher);
  const { user } = useAuth();
  console.log(members)
  const loggedInRole = members?.find((member) => member.userId === user?.id)?.role;

  return {
    members, error, loggedInRole
  };
};

export default useWorkspaceMembers;