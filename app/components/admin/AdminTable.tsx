export function AdminTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-900">{children}</table>
      </div>
    </div>
  );
}

export function AdminTableHead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-slate-100 bg-slate-50/80">{children}</thead>;
}

export function AdminTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
      {children}
    </th>
  );
}

export function AdminTr({ children }: { children: React.ReactNode }) {
  return <tr className="border-t border-slate-100 transition hover:bg-slate-50/60">{children}</tr>;
}

export function AdminTd({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <td className={`p-4 align-top ${muted ? "text-slate-500" : "text-slate-900"}`}>{children}</td>
  );
}

export function AdminPageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">{children}</h1>
  );
}

export function AdminMuted({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-slate-500">{children}</p>;
}

export function AdminBackLink({
  onClick,
  label = "← Back to list",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 text-sm font-medium text-slate-500 transition hover:text-teal-600"
    >
      {label}
    </button>
  );
}

export function AdminAddButton({
  onClick,
  label = "Add new",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-[#00a69c] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0d8a99]"
    >
      {label}
    </button>
  );
}

export function AdminLoading() {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-teal-600" />
      Loading...
    </div>
  );
}

export function AdminStatus({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-slate-600">{children}</span>;
}
