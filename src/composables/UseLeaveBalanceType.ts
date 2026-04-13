const TYPE_MAP: Record<string, { label: string; container: string }> = {
  annual_reset: {
    label: "Annual Reset",
    container:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  leave_taken: {
    label: "Ambil Cuti",
    container:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  manual_adjustment: {
    label: "Atur Manual",
    container:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  },
};

export function useLeaveBalanceType() {
  function typeLabel(type: string): string {
    return TYPE_MAP[type]?.label ?? "-";
  }

  function typeColor(type: string): string {
    return (
      TYPE_MAP[type]?.container ??
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    );
  }

  function amountColor(value: string): string {
    if (value.startsWith("+")) {
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    }

    if (value.startsWith("-")) {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }

    return "text-gray-600"; // default kalau tidak ada tanda
  }

  return { typeLabel, typeColor, amountColor };
}
