import { notFound } from "next/navigation";

import {
  getAssetById,
  getBatteryHistory,
  getMaintenanceNotesByAssetId,
} from "@/lib/data";

import { AssetDashboard } from "@/components/assets/asset-dashboard";

type AssetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AssetPage({
  params,
}: AssetPageProps) {
  const { id } = await params;

  const asset = await getAssetById(id);

  if (!asset) {
    notFound();
  }

  const [history, maintenanceNotes] = await Promise.all([
    asset.type === "battery"
      ? getBatteryHistory(asset.id)
      : Promise.resolve([]),
    getMaintenanceNotesByAssetId(asset.id),
  ]);

  return (
    <AssetDashboard
      asset={asset}
      history={history}
      initialMaintenanceNotes={maintenanceNotes}
    />
  );
}