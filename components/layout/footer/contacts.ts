import GitHubIcon from "@/components/ui/icons/GitHubIcon";
import LinkedInIcon from "@/components/ui/icons/LinkedInIcon";
import { Globe } from "lucide-react";

const contacts = [
    {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sebastian-velo/",
        Icon: LinkedInIcon
    },
    {
        id: "github",
        name: "Github",
        url: "https://github.com/sebastianvelo/tcp-notes",
        Icon: GitHubIcon
    },
    {
        id: "portfolio",
        name: "portfolio",
        url: "https://sebastian-velo.web.app/",
        Icon: Globe
    }
];

export default contacts;