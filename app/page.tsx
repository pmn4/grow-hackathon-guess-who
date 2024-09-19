import PerfectProviderHome from "@/components/perfect-provider-home";
import { getAllProviders } from "@/actions/provider-actions";

export default async function Home() {
  const providers = await getAllProviders();

  // randomize the sort order
  providers.sort(() => Math.random() - 0.5);

  return <PerfectProviderHome providers={providers} />;
}
