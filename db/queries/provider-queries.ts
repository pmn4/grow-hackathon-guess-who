import { eq, inArray } from "drizzle-orm";
import { db } from "@/db/db";
import { InsertProvider, providers } from "@/db/schema";

export const getProviderById = async (id: string) => {
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);
  return provider;
};

export const listProviders = () =>
  db.select().from(providers).orderBy(providers.name);

export const createProvider = (provider: InsertProvider) =>
  db.insert(providers).values(provider);

export const updateProvider = (id: string, provider: Partial<InsertProvider>) =>
  db.update(providers).set(provider).where(eq(providers.id, id));

export const deleteProvider = (id: string) =>
  db.delete(providers).where(eq(providers.id, id));

export async function getProvidersById(ids: string[]) {
  return db.select().from(providers).where(inArray(providers.id, ids));
}
