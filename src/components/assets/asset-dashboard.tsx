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
    <main className="min-h-screen bg-[#f5f3ee] text-[#1d211c]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
        <Link
          href={`/locations/${asset.locationId}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to facility
        </Link>

        <header className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase text-neutral-500">
              <Activity className="h-4 w-4" />
              {asset.type.replace("-", " ")}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                {asset.name}
              </h1>

              <StatusBadge status={asset.status} />
            </div>

            <p className="mt-3 text-neutral-600">
              Operational metrics, historical performance and maintenance notes.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            Asset ID: {asset.id}
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-neutral-500">
                HISTORICAL PERFORMANCE
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Battery performance
              </h2>

              <div className="mt-6">
                <BatteryChart data={history} />
              </div>
            </div>

            <div className="rounded-3xl bg-[#20261f] p-6 text-white shadow-sm">
              <p className="text-sm font-medium text-white/60">
                OPERATING MODE
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Control strategy
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Select the operating mode for this battery.
                This prototype only updates local UI state.
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
                    className={`rounded-2xl border px-4 py-3 text-left capitalize transition ${
                      mode === option
                        ? "border-lime-300 bg-lime-300 text-neutral-950"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase text-white/40">
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
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              MAINTENANCE
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Maintenance notes
            </h2>

            <div className="mt-6 space-y-4">
              {notes.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  No maintenance notes yet.
                </p>
              ) : (
                notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-2xl border border-neutral-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold">
                        {note.title}
                      </h3>

                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize text-neutral-600">
                        {note.priority}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {note.description}
                    </p>

                    <p className="mt-3 text-xs text-neutral-400">
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

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              NEW MAINTENANCE NOTE
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
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
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-neutral-800"
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
                  className="w-full resize-none rounded-2xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-neutral-800"
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
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#20261f] px-5 py-3 font-medium text-white transition hover:bg-[#30382e]"
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