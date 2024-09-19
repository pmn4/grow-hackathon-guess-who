"use server";

import { revalidatePath } from "next/cache";
import {
  getProviderById,
  listProviders,
  createProvider as queryCreateProvider,
  updateProvider as queryUpdateProvider,
  deleteProvider as queryDeleteProvider,
} from "@/db/queries/provider-queries";
import { InsertProvider, SelectProvider } from "@/db/schema";

export async function getProvider(id: string) {
  return getProviderById(id);
}

export async function getAllProviders() {
  return listProviders();
}

export async function filterProviders(
  criteria: string,
  providerIds: SelectProvider["id"][]
): Promise<SelectProvider["id"][]> {
  // For now, we'll just return a randomized subset of the providerIds
  const shuffled = providerIds.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(shuffled.length / 2));
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
