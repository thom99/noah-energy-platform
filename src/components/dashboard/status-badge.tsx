import type { SystemStatus } from "@/types/domain";

import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: SystemStatus;
};

const statusStyles: Record<SystemStatus, string> = {
  normal: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  fault: "bg-red-50 text-red-700 ring-red-600/20",
  offline: "bg-neutral-100 text-neutral-600 ring-neutral-500/20",
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}