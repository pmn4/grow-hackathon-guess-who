import PerfectProviderHome from "@/components/perfect-provider-home";
import { getAllProviders } from "@/actions/provider-actions";

export default async function Home() {
  const providers = await getAllProviders();

  return <PerfectProviderHome providers={providers} />;
}
