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
    <main className="noah-dashboard location-dashboard min-h-screen bg-[#f7f5ef] text-[#302b23]">
      <div className="dashboard-content mx-auto max-w-[1500px] px-5 py-8 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#85765f] transition hover:text-[#302b23]"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio overview
        </Link>

        <header className="page-header mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="page-eyebrow mb-3 flex items-center gap-2 text-sm font-medium text-[#85765f]">
              <Building2 className="h-4 w-4" />
              {location.city}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
                {location.name}
              </h1>

              <StatusBadge status={location.status} />
            </div>

            <p className="mt-3 text-[#756958]">
              Operational status and energy performance for this facility.
            </p>
          </div>

          <p className="text-sm text-[#85765f]">
            Facility ID: {location.id}
          </p>
        </header>

        <section className="metric-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

        <section className="performance-grid mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-medium text-[#85765f]">
                ENERGY PERFORMANCE
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Production vs consumption
              </h2>
            </div>

            <EnergyOverviewChart data={energyHistory} />
          </div>

          <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
            <p className="text-sm font-medium text-[#85765f]">
              ACTIVE ISSUES
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Maintenance attention
            </h2>

            <div className="mt-6 space-y-4">
              {alerts.length === 0 ? (
                <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
                  No active issues for this facility.
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-4"
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
              <p className="text-sm font-medium text-[#85765f]">
                EQUIPMENT
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Assets
              </h2>
            </div>

            <p className="text-sm text-[#85765f]">
              {assets.length} connected assets
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {assets.map((asset) => (
              <Link
                key={asset.id}
                href={`/assets/${asset.id}`}
                className="equipment-card group rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c7ad78] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-lg bg-[#f2ebdc] p-3">
                    <AssetIcon type={asset.type} />
                  </div>

                  <StatusBadge status={asset.status} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {asset.name}
                </h3>

                <p className="mt-1 text-sm capitalize text-[#85765f]">
                  {asset.type.replace("-", " ")}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#eee8db] pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase text-[#968367]">
                      Power
                    </p>

                    <p className="mt-1 font-semibold">
                      {asset.powerKw} kW
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-[#968367]">
                      Availability
                    </p>

                    <p className="mt-1 font-semibold">
                      {asset.availability}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-sm font-medium">
                  <span className="text-[#85765f]">
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
    <div className="metric-card rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#85765f]">
          {label}
        </p>

        <div className="rounded-lg bg-[#f2ebdc] p-2.5">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">
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