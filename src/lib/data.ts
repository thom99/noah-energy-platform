import {
  locations,
  assets,
  batteryAssets,
  alerts,
  portfolioEnergyHistory,
  locationEnergyHistory,
  batteryHistoryByAssetId,
  maintenanceNotes,
} from "@/data/mock-data";

export async function getLocations() {
  return locations;
}

export async function getLocationById(id: string) {
  return locations.find((location) => location.id === id);
}

export async function getAssets() {
  return [...assets, ...batteryAssets];
}

export async function getAssetsByLocationId(locationId: string) {
  return [...assets, ...batteryAssets].filter(
    (asset) => asset.locationId === locationId
  );
}

export async function getAssetById(id: string) {
  return [...assets, ...batteryAssets].find(
    (asset) => asset.id === id
  );
}

export async function getAlertsByLocationId(locationId: string) {
  return alerts.filter(
    (alert) => alert.locationId === locationId
  );
}

export async function getAlertById(id: string) {
  return alerts.find(
    (alert) => alert.id === id
  );
}

export async function getPortfolioEnergyHistory() {
  return portfolioEnergyHistory;
}

export async function getLocationEnergyHistory(locationId: string) {
  return locationEnergyHistory[
    locationId as keyof typeof locationEnergyHistory
  ] ?? [];
}

export async function getBatteryHistory(assetId: string) {
  return batteryHistoryByAssetId[
    assetId as keyof typeof batteryHistoryByAssetId
  ] ?? [];
}
export async function getMaintenanceNotesByAssetId(assetId: string) {
  return maintenanceNotes.filter(
    (note) => note.assetId === assetId
  );
}