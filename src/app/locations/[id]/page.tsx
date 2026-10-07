import { notFound } from "next/navigation";

import {
  getAlertsByLocationId,
  getAssetsByLocationId,
  getLocationById,
  getLocationEnergyHistory,
} from "@/lib/data";

import { LocationDashboard } from "@/components/locations/location-dashboard";

type LocationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { id } = await params;

  const location = await getLocationById(id);

  if (!location) {
    notFound();
  }

  const [assets, alerts, energyHistory] = await Promise.all([
    getAssetsByLocationId(id),
    getAlertsByLocationId(id),
    getLocationEnergyHistory(id),
  ]);

  return (
    <LocationDashboard
      location={location}
      assets={assets}
      alerts={alerts}
      energyHistory={energyHistory}
    />
  );
}