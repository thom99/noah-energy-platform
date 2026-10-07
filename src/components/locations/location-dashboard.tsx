import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  Battery,
  Building2,
  Car,
  Euro,
  Gauge,
  Snowflake,
  Sun,
  Zap,
} from "lucide-react";

import type {
  Alert,
  Asset,
  Location,
} from "@/types/domain";

import { EnergyOverviewChart } from "@/components/dashboard/energy-overview-chart";
import { StatusBadge } from "@/components/dashboard/status-badge";

type EnergyHistoryPoint = {
  time: string;
  productionKw: number;
  consumptionKw: number;
};

type LocationDashboardProps = {
  location: Location;
  assets: Asset[];
  alerts: Alert[];
  energyHistory: EnergyHistoryPoint[];
};

export function LocationDashboard({
  location,
  assets,
  alerts,
  energyHistory,
}: LocationDashboardProps) {
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#1d211c]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio overview
        </Link>

        <header className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-neutral-500">
              <Building2 className="h-4 w-4" />
              {location.city}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                {location.name}
              </h1>

              <StatusBadge status={location.status} />
            </div>

            <p className="mt-3 text-neutral-600">
              Operational status and energy performance for this facility.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            Facility ID: {location.id}
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Production"
            value={`${location.productionKw} kW`}
            icon={<Zap className="h-5 w-5" />}
          />

          <MetricCard
            label="Consumption"
            value={`${location.consumptionKw} kW`}
            icon={<Gauge className="h-5 w-5" />}
          />

          <MetricCard
            label="Availability"
            value={`${location.availability}%`}
            icon={<Battery className="h-5 w-5" />}
          />

          <MetricCard
            label="Operating cost"
            value={`€${location.operatingCostToday}`}
            icon={<Euro className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-500">
                ENERGY PERFORMANCE
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Production vs consumption
              </h2>
            </div>

            <EnergyOverviewChart data={energyHistory} />
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              ACTIVE ISSUES
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Maintenance attention
            </h2>

            <div className="mt-6 space-y-4">
              {alerts.length === 0 ? (
                <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  No active issues for this facility.
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
                  >
                    <div className="flex gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                      <div>
                        <p className="font-semibold text-amber-950">
                          {alert.title}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-amber-800">
                          {alert.description}
                        </p>

                        <p className="mt-3 text-xs font-medium uppercase text-amber-700">
                          {alert.severity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">
                EQUIPMENT
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Assets
              </h2>
            </div>

            <p className="text-sm text-neutral-500">
              {assets.length} connected assets
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {assets.map((asset) => (
              <Link
                key={asset.id}
                href={`/assets/${asset.id}`}
                className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-neutral-100 p-3">
                    <AssetIcon type={asset.type} />
                  </div>

                  <StatusBadge status={asset.status} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {asset.name}
                </h3>

                <p className="mt-1 text-sm capitalize text-neutral-500">
                  {asset.type.replace("-", " ")}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase text-neutral-400">
                      Power
                    </p>

                    <p className="mt-1 font-semibold">
                      {asset.powerKw} kW
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-neutral-400">
                      Availability
                    </p>

                    <p className="mt-1 font-semibold">
                      {asset.availability}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-sm font-medium">
                  <span className="text-neutral-500">
                    View asset
                  </span>

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">
          {label}
        </p>

        <div className="rounded-2xl bg-neutral-100 p-2.5">
          {icon}
        </div>
      </div>

      <p className="mt-6 text-3xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

function AssetIcon({
  type,
}: {
  type: Asset["type"];
}) {
  switch (type) {
    case "battery":
      return <Battery className="h-5 w-5" />;

    case "solar":
      return <Sun className="h-5 w-5" />;

    case "ev-charger":
      return <Car className="h-5 w-5" />;

    case "hvac":
      return <Snowflake className="h-5 w-5" />;
  }
}