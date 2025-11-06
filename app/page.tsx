import ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.WORKSPACES);

  return (
    <div className="min-h-screen">

    </div>
  )
}
