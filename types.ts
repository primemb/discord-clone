import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemebrsWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};
