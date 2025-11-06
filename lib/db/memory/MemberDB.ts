import Member, { MemberRole } from "@/types/Member";
import membersJson from "./mock/members.json";

const MembersDB: Member[] = membersJson.map((m) => ({ ...m, role: m.role as MemberRole }));

export default MembersDB;