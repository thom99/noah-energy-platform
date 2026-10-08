import type { SystemStatus } from "@/types/domain";

import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: SystemStatus;
};

const statusStyles: Record<SystemStatus, string> = {
  normal: "bg-[#f0f4e9] text-[#5c704c] ring-[#839767]/25",
  warning: "bg-[#fff4d9] text-[#916818] ring-[#c69c3e]/25",
  fault: "bg-[#faece5] text-[#a6503c] ring-[#c98268]/25",
  offline: "bg-[#f0eee9] text-[#777367] ring-[#a7a08f]/25",
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}