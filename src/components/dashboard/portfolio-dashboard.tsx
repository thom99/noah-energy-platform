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
    <main className="noah-dashboard portfolio-dashboard min-h-screen bg-[#f7f5ef] text-[#302b23]">
      <div className="dashboard-content mx-auto max-w-[1500px] px-5 py-8 sm:px-6 lg:px-10">
        <header className="page-header mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="page-eyebrow mb-3 flex items-center gap-2 text-sm font-medium text-[#85765f]">
              <Activity className="h-4 w-4" />
              NOVA ENERGY SYSTEMS
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
              Portfolio Overview
            </h1>

            <p className="mt-3 max-w-2xl text-base text-[#756958]">
              Monitor operational status, energy performance and availability
              across all connected facilities.
            </p>
          </div>

        </header>

        <section className="metric-grid grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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

        <section className="performance-grid mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#85765f]">
                  ENERGY PERFORMANCE
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Portfolio energy overview
                </h2>
              </div>

              <div className="rounded-full bg-[#f2ebdc] px-3 py-1 text-xs font-medium text-[#756958]">
                Today
              </div>
            </div>

            <EnergyOverviewChart data={energyHistory} />
          </div>

          <div className="system-panel rounded-xl bg-[#493521] p-6 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#d4c5af]">
                  SYSTEM STATUS
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Operational overview
                </h2>
              </div>

              <Activity className="h-5 w-5 text-[#f3c65a]" />
            </div>

            <div
              className="status-ring"
              style={{
                "--normal-share": `${((locations.length - warningLocations) / locations.length) * 100}%`,
              } as React.CSSProperties}
            >
              <div>
                <strong>{locations.length - warningLocations}</strong>
                <span>of {locations.length} normal</span>
              </div>
            </div>

            <div className="status-rows mt-8 space-y-5">
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

        <section id="facilities" className="facilities-section mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-[#85765f]">
                FACILITIES
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Locations
              </h2>
            </div>

            <p className="text-sm text-[#85765f]">
              {locations.length} total
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.id}`}
                className="facility-card group rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c7ad78] hover:shadow-md"
              >
                <div className="facility-illustration" aria-hidden="true">
                  <svg viewBox="0 0 240 104" fill="none">
                    <ellipse cx="121" cy="90" rx="91" ry="8" fill="#e9e2d4" />
                    <path d="M49 49L109 21L188 46L128 76L49 49Z" fill="#f3c65a" />
                    <path d="M49 49L128 76V94L49 68V49Z" fill="#d5c6a9" />
                    <path d="M128 76L188 46V65L128 94V76Z" fill="#b4a182" />
                    <path d="M63 46L110 25L175 46L129 69L63 46Z" fill="#493521" />
                    <path d="M76 41L142 63M90 34L155 56M103 28L168 49M87 54L133 33M109 62L155 40" stroke="#f3c65a" strokeWidth="1.5" />
                    <path d="M59 58L69 61V70L59 67V58ZM79 64L89 67V76L79 73V64ZM99 71L109 74V83L99 80V71Z" fill="#fffaf0" />
                    <path d="M143 75L157 68V82L143 89V75Z" fill="#493521" />
                    <path d="M169 63L179 58V65L169 70V63Z" fill="#fffaf0" />
                    <path d="M202 73V94M192 80L202 61L212 80H192Z" stroke="#9da183" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="page-eyebrow mb-3 flex items-center gap-2 text-sm text-[#85765f]">
                      <MapPin className="h-4 w-4" />
                      {location.city}
                    </div>

                    <h3 className="text-xl font-semibold">
                      {location.name}
                    </h3>
                  </div>

                  <StatusBadge status={location.status} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#eee8db] pt-5">
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

                <div className="availability-track" aria-hidden="true">
                  <span style={{ width: `${location.availability}%` }} />
                </div>

                <div className="facility-footer mt-6 flex items-center justify-between text-sm font-medium">
                  <span className="text-[#85765f]">
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
          <section id="alerts" className="attention-banner mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-amber-100 p-3">
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
    <div className="metric-card rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#85765f]">{label}</p>

        <div className="rounded-lg bg-[#f2ebdc] p-2.5 text-[#766449]">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>

      <p className="mt-1 text-sm text-[#85765f]">
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
      <span className="text-sm text-[#d4c5af]">{label}</span>

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
      <p className="text-xs font-medium uppercase tracking-wide text-[#968367]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#302b23]">
        {value}
      </p>
    </div>
  );
}