import API_ROUTES from "@/constants/api.routes";
import fetcher from "@/lib/fetcher";
import MemberItemView from "@/types/view/MemberItemView";
import useSWR from "swr";
import useAuth from "../controller/useAuth";
import useWorkspace from "./useWorkspace";

export type LoggedInRole = {
  isOwner: boolean;
  isViewer: boolean;
  isEditor: boolean;
}

interface UseWorkspaceMembers {
  members: MemberItemView[] | undefined;
  error: any;
  loggedInRole: LoggedInRole;
}

const useWorkspaceMembers = (): UseWorkspaceMembers => {
  const { workspace } = useWorkspace();
  const { data: members, error } = useSWR<MemberItemView[]>(API_ROUTES.WORKSPACES.MEMBERS(workspace.id), fetcher);
  const { user } = useAuth();
  const loggedInRole = members?.find((member) => member.userId === user?.id)?.role;

  return {
    members, error, loggedInRole: {
      isOwner: loggedInRole === "owner",
      isViewer: loggedInRole === "viewer",
      isEditor: loggedInRole === "editor"
    }
  };
};

export default useWorkspaceMembers;