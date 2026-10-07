export type SystemStatus =
  | "normal"
  | "warning"
  | "fault"
  | "offline";

export type AssetType =
  | "battery"
  | "solar"
  | "ev-charger"
  | "hvac";

export type OperatingMode =
  | "automatic"
  | "charge"
  | "discharge"
  | "standby";

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  status: SystemStatus;
  locationId: string;
  powerKw: number;
  availability: number;
};

export type BatteryAsset = Asset & {
  type: "battery";
  stateOfCharge: number;
  temperatureC: number;
  capacityKwh: number;
  health: number;
  operatingMode: OperatingMode;
};

export type Location = {
  id: string;
  name: string;
  city: string;
  status: SystemStatus;
  productionKw: number;
  consumptionKw: number;
  availability: number;
  operatingCostToday: number;
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "critical";
  assetId?: string;
  locationId: string;
  createdAt: string;
};