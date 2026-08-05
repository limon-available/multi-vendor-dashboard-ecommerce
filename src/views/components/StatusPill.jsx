import React from "react";

// Maps an order / payment / account status to a colored pill.
// Purely presentational — it only styles the existing status string.
const TONES = {
  emerald: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-100 text-amber-700 ring-amber-200",
  rose: "bg-rose-100 text-rose-700 ring-rose-200",
  sky: "bg-sky-100 text-sky-700 ring-sky-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
};

const toneFor = (status) => {
  const s = String(status || "").toLowerCase();
  if (["paid", "delivered", "placed", "active", "approved", "completed"].includes(s))
    return "emerald";
  if (["pending", "processing", "warehouse", "unpaid", "warning"].includes(s))
    return "amber";
  if (["cancelled", "canceled", "deactive", "rejected", "failed"].includes(s))
    return "rose";
  if (["shipped", "out_for_delivery"].includes(s)) return "sky";
  return "slate";
};

const StatusPill = ({ status }) => {
  const tone = TONES[toneFor(status)];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ${tone}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status || "—"}
    </span>
  );
};

export default StatusPill;
