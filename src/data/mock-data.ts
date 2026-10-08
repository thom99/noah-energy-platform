import type {
  Alert,
  Asset,
  BatteryAsset,
  Location,
} from "@/types/domain";

export const locations: Location[] = [
  {
    id: "utrecht-energy-hub",
    name: "Utrecht Energy Hub",
    city: "Utrecht",
    status: "warning",
    productionKw: 184,
    consumptionKw: 142,
    availability: 99.2,
    operatingCostToday: 428
  },
  {
    id: "rotterdam-distribution-center",
    name: "Rotterdam Distribution Center",
    city: "Rotterdam",
    status: "fault",
    productionKw: 92,
    consumptionKw: 105,
    availability: 96.8,
    operatingCostToday: 512
  },
  {
    id: "eindhoven-production-facility",
    name: "Eindhoven Production Facility",
    city: "Eindhoven",
    status: "normal",
    productionKw: 156,
    consumptionKw: 131,
    availability: 98.4,
    operatingCostToday: 391
  },
];

export const assets: Asset[] = [
  {
    id: "solar-array-01",
    name: "Solar Array",
    type: "solar",
    status: "normal",
    locationId: "utrecht-energy-hub",
    powerKw: 118,
    availability: 99.8,
  },
  {
    id: "ev-charging-01",
    name: "EV Charging",
    type: "ev-charger",
    status: "warning",
    locationId: "utrecht-energy-hub",
    powerKw: 22,
    availability: 94.2,
  },
  {
    id: "hvac-01",
    name: "Climate System",
    type: "hvac",
    status: "normal",
    locationId: "utrecht-energy-hub",
    powerKw: 31,
    availability: 99.4,
  },
  {
    id: "solar-array-02",
    name: "Solar Array",
    type: "solar",
    status: "normal",
    locationId: "rotterdam-distribution-center",
    powerKw: 68,
    availability: 98.9,
  },
  {
    id: "ev-charging-02",
    name: "EV Charging",
    type: "ev-charger",
    status: "fault",
    locationId: "rotterdam-distribution-center",
    powerKw: 0,
    availability: 88.1,
  },
  {
    id: "hvac-02",
    name: "Climate System",
    type: "hvac",
    status: "warning",
    locationId: "rotterdam-distribution-center",
    powerKw: 37,
    availability: 95.6,
  },
  {
    id: "solar-array-03",
    name: "Solar Array",
    type: "solar",
    status: "normal",
    locationId: "eindhoven-production-facility",
    powerKw: 104,
    availability: 99.5,
  },
  {
    id: "ev-charging-03",
    name: "EV Charging",
    type: "ev-charger",
    status: "normal",
    locationId: "eindhoven-production-facility",
    powerKw: 18,
    availability: 99.1,
  },
];

export const batteryAssets: BatteryAsset[] = [
  {
    id: "battery-b01",
    name: "Battery B-01",
    type: "battery",
    status: "normal",
    locationId: "utrecht-energy-hub",
    powerKw: -34,
    availability: 99.7,
    stateOfCharge: 78,
    temperatureC: 31,
    capacityKwh: 500,
    health: 96,
    operatingMode: "automatic",
  },
  {
    id: "battery-b02",
    name: "Battery B-02",
    type: "battery",
    status: "warning",
    locationId: "rotterdam-distribution-center",
    powerKw: 12,
    availability: 95.1,
    stateOfCharge: 52,
    temperatureC: 46,
    capacityKwh: 420,
    health: 88,
    operatingMode: "charge",
  },
  {
    id: "battery-b03",
    name: "Battery B-03",
    type: "battery",
    status: "normal",
    locationId: "eindhoven-production-facility",
    powerKw: -21,
    availability: 99.4,
    stateOfCharge: 71,
    temperatureC: 30,
    capacityKwh: 460,
    health: 94,
    operatingMode: "automatic",
  },
];

export const alerts: Alert[] = [
  {
    id: "alert-001",
    title: "EV Charger 04 unavailable",
    description:
      "Charger 04 stopped responding and is currently unavailable for operation.",
    severity: "warning",
    assetId: "ev-charging-01",
    locationId: "utrecht-energy-hub",
    createdAt: "2026-10-07T12:18:00",
  },
  {
    id: "alert-002",
    title: "Battery inverter temperature high",
    description:
      "Battery inverter temperature exceeded the expected operating range.",
    severity: "warning",
    assetId: "battery-b02",
    locationId: "rotterdam-distribution-center",
    createdAt: "2026-10-07T11:42:00",
  },
  {
    id: "alert-003",
    title: "EV charging system fault",
    description:
      "The charging controller reported a communication fault with multiple charging points.",
    severity: "critical",
    assetId: "ev-charging-02",
    locationId: "rotterdam-distribution-center",
    createdAt: "2026-10-07T10:55:00",
  },
];

export const portfolioEnergyHistory = [
  {
    time: "08:00",
    productionKw: 220,
    consumptionKw: 248,
  },
  {
    time: "09:00",
    productionKw: 264,
    consumptionKw: 251,
  },
  {
    time: "10:00",
    productionKw: 318,
    consumptionKw: 264,
  },
  {
    time: "11:00",
    productionKw: 361,
    consumptionKw: 278,
  },
  {
    time: "12:00",
    productionKw: 397,
    consumptionKw: 294,
  },
  {
    time: "13:00",
    productionKw: 432,
    consumptionKw: 318,
  },
  {
    time: "14:00",
    productionKw: 418,
    consumptionKw: 337,
  },
  {
    time: "15:00",
    productionKw: 384,
    consumptionKw: 349,
  },
];

export const locationEnergyHistory = {
  "utrecht-energy-hub": [
    { time: "08:00", productionKw: 82, consumptionKw: 104 },
    { time: "09:00", productionKw: 101, consumptionKw: 109 },
    { time: "10:00", productionKw: 129, consumptionKw: 116 },
    { time: "11:00", productionKw: 151, consumptionKw: 123 },
    { time: "12:00", productionKw: 171, consumptionKw: 132 },
    { time: "13:00", productionKw: 184, consumptionKw: 142 },
  ],

  "rotterdam-distribution-center": [
    { time: "08:00", productionKw: 48, consumptionKw: 82 },
    { time: "09:00", productionKw: 56, consumptionKw: 88 },
    { time: "10:00", productionKw: 64, consumptionKw: 91 },
    { time: "11:00", productionKw: 72, consumptionKw: 97 },
    { time: "12:00", productionKw: 84, consumptionKw: 101 },
    { time: "13:00", productionKw: 92, consumptionKw: 105 },
  ],

  "eindhoven-production-facility": [
    { time: "08:00", productionKw: 71, consumptionKw: 96 },
    { time: "09:00", productionKw: 89, consumptionKw: 102 },
    { time: "10:00", productionKw: 112, consumptionKw: 108 },
    { time: "11:00", productionKw: 131, consumptionKw: 116 },
    { time: "12:00", productionKw: 148, consumptionKw: 124 },
    { time: "13:00", productionKw: 156, consumptionKw: 131 },
  ],
};

export const batteryHistoryByAssetId = {
  "battery-b01": [
    {
      time: "08:00",
      stateOfCharge: 61,
      powerKw: 18,
      temperatureC: 29,
    },
    {
      time: "09:00",
      stateOfCharge: 65,
      powerKw: 24,
      temperatureC: 29,
    },
    {
      time: "10:00",
      stateOfCharge: 69,
      powerKw: 21,
      temperatureC: 30,
    },
    {
      time: "11:00",
      stateOfCharge: 74,
      powerKw: 28,
      temperatureC: 30,
    },
    {
      time: "12:00",
      stateOfCharge: 81,
      powerKw: 35,
      temperatureC: 31,
    },
    {
      time: "13:00",
      stateOfCharge: 78,
      powerKw: -34,
      temperatureC: 31,
    },
    {
      time: "14:00",
      stateOfCharge: 72,
      powerKw: -41,
      temperatureC: 32,
    },
    {
      time: "15:00",
      stateOfCharge: 68,
      powerKw: -29,
      temperatureC: 31,
    },
  ],

  "battery-b02": [
    {
      time: "08:00",
      stateOfCharge: 39,
      powerKw: 16,
      temperatureC: 37,
    },
    {
      time: "09:00",
      stateOfCharge: 42,
      powerKw: 18,
      temperatureC: 38,
    },
    {
      time: "10:00",
      stateOfCharge: 45,
      powerKw: 21,
      temperatureC: 40,
    },
    {
      time: "11:00",
      stateOfCharge: 47,
      powerKw: 17,
      temperatureC: 42,
    },
    {
      time: "12:00",
      stateOfCharge: 49,
      powerKw: 15,
      temperatureC: 44,
    },
    {
      time: "13:00",
      stateOfCharge: 52,
      powerKw: 12,
      temperatureC: 46,
    },
    {
      time: "14:00",
      stateOfCharge: 55,
      powerKw: 14,
      temperatureC: 45,
    },
    {
      time: "15:00",
      stateOfCharge: 58,
      powerKw: 16,
      temperatureC: 43,
    },
  ],

  "battery-b03": [
    {
      time: "08:00",
      stateOfCharge: 58,
      powerKw: 20,
      temperatureC: 28,
    },
    {
      time: "09:00",
      stateOfCharge: 62,
      powerKw: 23,
      temperatureC: 29,
    },
    {
      time: "10:00",
      stateOfCharge: 67,
      powerKw: 26,
      temperatureC: 29,
    },
    {
      time: "11:00",
      stateOfCharge: 72,
      powerKw: 31,
      temperatureC: 30,
    },
    {
      time: "12:00",
      stateOfCharge: 76,
      powerKw: 28,
      temperatureC: 30,
    },
    {
      time: "13:00",
      stateOfCharge: 71,
      powerKw: -21,
      temperatureC: 30,
    },
    {
      time: "14:00",
      stateOfCharge: 66,
      powerKw: -24,
      temperatureC: 31,
    },
    {
      time: "15:00",
      stateOfCharge: 63,
      powerKw: -18,
      temperatureC: 30,
    },
  ],
};

export const maintenanceNotes = [
  {
    id: "note-001",
    locationId: "utrecht-energy-hub",
    assetId: "battery-b01",
    title: "Monthly inspection completed",
    description:
      "Visual inspection completed. No abnormal noise or thermal behavior detected.",
    priority: "low",
    createdAt: "2026-10-06T09:20:00",
  },
  {
    id: "note-002",
    locationId: "utrecht-energy-hub",
    assetId: "ev-charging-01",
    title: "Inspect charger communication",
    description:
      "Investigate intermittent connectivity reported by charger 04.",
    priority: "medium",
    createdAt: "2026-10-07T12:30:00",
  },
];