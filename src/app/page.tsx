import {
  getLocations,
  getPortfolioEnergyHistory,
} from "@/lib/data";

import { PortfolioDashboard } from "@/components/dashboard/portfolio-dashboard";

export default async function HomePage() {
  const locations = await getLocations();
  const energyHistory = await getPortfolioEnergyHistory();

  return (
    <PortfolioDashboard
      locations={locations}
      energyHistory={energyHistory}
    />
  );
}