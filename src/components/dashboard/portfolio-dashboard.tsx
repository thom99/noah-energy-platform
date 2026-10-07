import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  Building2,
  Euro,
  Gauge,
  MapPin,
  Zap,
} from "lucide-react";

import type { Location } from "@/types/domain";

import { EnergyOverviewChart } from "./energy-overview-chart";
import { StatusBadge } from "./status-badge";

type EnergyHistoryPoint = {
  time: string;
  productionKw: number;
  consumptionKw: number;
};

type PortfolioDashboardProps = {
  locations: Location[];
  energyHistory: EnergyHistoryPoint[];
};

export function PortfolioDashboard({
  locations,
  energyHistory,
}: PortfolioDashboardProps) {
  const totalProduction = locations.reduce(
    (total, location) => total + location.productionKw,
    0
  );

  const totalConsumption = locations.reduce(
    (total, location) => total + location.consumptionKw,
    0
  );

  const averageAvailability =
    locations.reduce(
      (total, location) => total + location.availability,
      0
    ) / locations.length;

  const warningLocations = locations.filter(
    (location) => location.status !== "normal"
  ).length;

  const totalOperatingCost = locations.reduce(
    (total, location) => total + location.operatingCostToday,
    0
  );

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#1d211c]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-neutral-500">
              <Activity className="h-4 w-4" />
              NOVA ENERGY SYSTEMS
            </div>

            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              Portfolio Overview
            </h1>

            <p className="mt-3 max-w-2xl text-base text-neutral-600">
              Monitor operational status, energy performance and availability
              across all connected facilities.
            </p>
          </div>

        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            label="Locations"
            value={locations.length.toString()}
            helper="Connected facilities"
            icon={<Building2 className="h-5 w-5" />}
          />

          <MetricCard
            label="Production"
            value={`${totalProduction} kW`}
            helper="Current total output"
            icon={<Zap className="h-5 w-5" />}
          />

          <MetricCard
            label="Consumption"
            value={`${totalConsumption} kW`}
            helper="Current demand"
            icon={<Gauge className="h-5 w-5" />}
          />

          <MetricCard
            label="Availability"
            value={`${averageAvailability.toFixed(1)}%`}
            helper="Portfolio average"
            icon={<BatteryCharging className="h-5 w-5" />}
          />

          <MetricCard
            label="Operating cost"
            value={`€${totalOperatingCost}`}
            helper="Today"
            icon={<Euro className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  ENERGY PERFORMANCE
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Portfolio energy overview
                </h2>
              </div>

              <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                Today
              </div>
            </div>

            <EnergyOverviewChart data={energyHistory} />
          </div>

          <div className="rounded-3xl bg-[#20261f] p-6 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/60">
                  SYSTEM STATUS
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Operational overview
                </h2>
              </div>

              <Activity className="h-5 w-5 text-lime-300" />
            </div>

            <div className="mt-8 space-y-5">
              <StatusRow
                label="Normal locations"
                value={String(
                  locations.filter((location) => location.status === "normal")
                    .length
                )}
              />

              <StatusRow
                label="Locations requiring attention"
                value={String(warningLocations)}
                warning={warningLocations > 0}
              />

              <StatusRow
                label="Average availability"
                value={`${averageAvailability.toFixed(1)}%`}
              />

              <StatusRow
                label="Net energy balance"
                value={`${totalProduction - totalConsumption} kW`}
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">
                FACILITIES
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Locations
              </h2>
            </div>

            <p className="text-sm text-neutral-500">
              {locations.length} total
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.id}`}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-neutral-500">
                      <MapPin className="h-4 w-4" />
                      {location.city}
                    </div>

                    <h3 className="text-xl font-semibold">
                      {location.name}
                    </h3>
                  </div>

                  <StatusBadge status={location.status} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
                  <LocationMetric
                    label="Production"
                    value={`${location.productionKw} kW`}
                  />

                  <LocationMetric
                    label="Consumption"
                    value={`${location.consumptionKw} kW`}
                  />

                  <LocationMetric
                    label="Availability"
                    value={`${location.availability}%`}
                  />

                  <LocationMetric
                    label="Cost today"
                    value={`€${location.operatingCostToday}`}
                  />
                </div>

                <div className="mt-6 flex items-center justify-between text-sm font-medium">
                  <span className="text-neutral-500">
                    Open facility
                  </span>

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {warningLocations > 0 && (
          <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-100 p-3">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              </div>

              <div>
                <p className="font-semibold text-amber-950">
                  Operational attention required
                </p>
                <p className="mt-1 text-sm text-amber-800">
                  {warningLocations} location
                  {warningLocations > 1 ? "s are" : " is"} currently reporting
                  warnings or faults.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
};

function MetricCard({
  label,
  value,
  helper,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">{label}</p>

        <div className="rounded-2xl bg-neutral-100 p-2.5 text-neutral-700">
          {icon}
        </div>
      </div>

      <p className="mt-6 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-sm text-neutral-500">
        {helper}
      </p>
    </div>
  );
}

function StatusRow({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0">
      <span className="text-sm text-white/60">{label}</span>

      <span
        className={
          warning
            ? "font-semibold text-amber-300"
            : "font-semibold text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

function LocationMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-neutral-900">
        {value}
      </p>
    </div>
  );
}