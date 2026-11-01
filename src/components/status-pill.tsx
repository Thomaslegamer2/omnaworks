export function StatusPill({ status }: { status: "En ligne" | "En chantier" }) {
  const live = status === "En ligne";
  return (
    <span
      className={
        live
          ? "inline-flex items-center rounded-full bg-ok/15 px-2.5 py-1 text-xs font-semibold text-ok"
          : "inline-flex items-center rounded-full bg-violet/15 px-2.5 py-1 text-xs font-semibold text-glow"
      }
    >
      {status}
    </span>
  );
}
