"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Battery,
  Gauge,
  Thermometer,
  Activity,
  HeartPulse,
  Save,
} from "lucide-react";

import type {
  Asset,
  BatteryAsset,
  OperatingMode,
} from "@/types/domain";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { BatteryChart } from "./battery-chart";

type BatteryHistoryPoint = {
  time: string;
  stateOfCharge: number;
  powerKw: number;
  temperatureC: number;
};

type MaintenanceNote = {
  id: string;
  locationId: string;
  assetId: string;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
};

type AssetDashboardProps = {
  asset: Asset;
  history: BatteryHistoryPoint[];
  initialMaintenanceNotes: MaintenanceNote[];
};

export function AssetDashboard({
  asset,
  history,
  initialMaintenanceNotes,
}: AssetDashboardProps) {
  const battery =
    asset.type === "battery"
      ? (asset as BatteryAsset)
      : null;

  const [mode, setMode] = useState<OperatingMode>(
    battery?.operatingMode ?? "automatic"
  );

  const [notes, setNotes] = useState(initialMaintenanceNotes);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    const newNote: MaintenanceNote = {
      id: crypto.randomUUID(),
      locationId: asset.locationId,
      assetId: asset.id,
      title,
      description,
      priority,
      createdAt: new Date().toISOString(),
    };

    setNotes((currentNotes) => [
      newNote,
      ...currentNotes,
    ]);

    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  function deleteNote(noteId: string) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId)
    );
  }

  return (
    <main className="noah-dashboard asset-dashboard min-h-screen bg-[#f7f5ef] text-[#302b23]">
      <div className="dashboard-content mx-auto max-w-[1500px] px-5 py-8 sm:px-6 lg:px-10">
        <Link
          href={`/locations/${asset.locationId}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#85765f] transition hover:text-[#302b23]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to facility
        </Link>

        <header className="page-header mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="page-eyebrow mb-3 flex items-center gap-2 text-sm font-medium uppercase text-[#85765f]">
              <Activity className="h-4 w-4" />
              {asset.type.replace("-", " ")}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
                {asset.name}
              </h1>

              <StatusBadge status={asset.status} />
            </div>

            <p className="mt-3 text-[#756958]">
              Operational metrics, historical performance and maintenance notes.
            </p>
          </div>

          <p className="text-sm text-[#85765f]">
            Asset ID: {asset.id}
          </p>
        </header>

        <section className="metric-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Current power"
            value={`${asset.powerKw} kW`}
            icon={<Gauge className="h-5 w-5" />}
          />

          <MetricCard
            label="Availability"
            value={`${asset.availability}%`}
            icon={<Activity className="h-5 w-5" />}
          />

          {battery && (
            <>
              <MetricCard
                label="State of charge"
                value={`${battery.stateOfCharge}%`}
                icon={<Battery className="h-5 w-5" />}
              />

              <MetricCard
                label="Temperature"
                value={`${battery.temperatureC}°C`}
                icon={<Thermometer className="h-5 w-5" />}
              />

              <MetricCard
                label="Battery health"
                value={`${battery.health}%`}
                icon={<HeartPulse className="h-5 w-5" />}
              />

              <MetricCard
                label="Capacity"
                value={`${battery.capacityKwh} kWh`}
                icon={<Battery className="h-5 w-5" />}
              />
            </>
          )}
        </section>

        {battery && (
          <section className="performance-grid mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
              <p className="text-sm font-medium text-[#85765f]">
                HISTORICAL PERFORMANCE
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Battery performance
              </h2>

              <div className="mt-6">
                <BatteryChart data={history} />
              </div>
            </div>

            <div className="system-panel rounded-xl bg-[#493521] p-6 text-white shadow-sm">
              <p className="text-sm font-medium text-[#d4c5af]">
                OPERATING MODE
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Control strategy
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#d4c5af]">
                Select a simulated operating mode.
                Changes only affect this prototype session and are not sent to a control system.
              </p>

              <div className="mt-6 grid gap-3">
                {(
                  [
                    "automatic",
                    "charge",
                    "discharge",
                    "standby",
                  ] as OperatingMode[]
                ).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMode(option)}
                    className={`rounded-lg border px-4 py-3 text-left capitalize transition ${
                      mode === option
                        ? "border-[#f3c65a] bg-[#f3c65a] text-[#302b23]"
                        : "border-white/10 bg-[#fffefa]/5 text-white hover:bg-[#fffefa]/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase text-[#baa68b]">
                  Current selection
                </p>

                <p className="mt-1 text-lg font-semibold capitalize">
                  {mode}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
            <p className="text-sm font-medium text-[#85765f]">
              MAINTENANCE
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Maintenance notes
            </h2>

            <div className="mt-6 space-y-4">
              {notes.length === 0 ? (
                <p className="text-sm text-[#85765f]">
                  No maintenance notes yet.
                </p>
              ) : (
                notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-lg border border-[#e7e2d8] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold">
                        {note.title}
                      </h3>

                      <span className="rounded-full bg-[#f2ebdc] px-2.5 py-1 text-xs font-medium capitalize text-[#756958]">
                        {note.priority}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#756958]">
                      {note.description}
                    </p>

                    <p className="mt-3 text-xs text-[#968367]">
                      {new Date(note.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => deleteNote(note.id)}
                        className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-panel rounded-xl border border-[#e7e2d8] bg-[#fffefa] p-6 shadow-sm">
            <p className="text-sm font-medium text-[#85765f]">
              NEW MAINTENANCE NOTE
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Add a note
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Title
                </label>

                <input
                  id="title"
                  required
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  className="w-full rounded-lg border border-[#d9d0c0] bg-[#fffefa] px-4 py-3 outline-none transition focus:border-neutral-800"
                  placeholder="e.g. Inspect inverter"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#d9d0c0] bg-[#fffefa] px-4 py-3 outline-none transition focus:border-neutral-800"
                  placeholder="Describe the maintenance task..."
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value)
                  }
                  className="w-full rounded-lg border border-[#d9d0c0] bg-[#fffefa] px-4 py-3 outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#493521] px-5 py-3 font-medium text-white transition hover:bg-[#60472c]"
              >
                <Save className="h-4 w-4" />
                Add maintenance note
              </button>
            </form>
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