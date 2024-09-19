import { revalidatePath } from "next/cache";
import {
  getProviderById,
  listProviders,
  createProvider as queryCreateProvider,
  updateProvider as queryUpdateProvider,
  deleteProvider as queryDeleteProvider,
} from "@/db/queries/provider-queries";
import { InsertProvider } from "@/db/schema";

export async function getProvider(id: string) {
  return getProviderById(id);
}

export async function getAllProviders() {
  return listProviders();
}

export async function createProvider(provider: InsertProvider) {
  await queryCreateProvider(provider);
  revalidatePath("/providers");
}

export async function updateProvider(
  id: string,
  provider: Partial<InsertProvider>
) {
  await queryUpdateProvider(id, provider);
  revalidatePath("/providers");
}

export async function deleteProvider(id: string) {
  await queryDeleteProvider(id);
  revalidatePath("/providers");
}
