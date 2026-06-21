export function inputClass() {
  return "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/15";
}

/** Project primary green — buttons and active states */
export const adminPrimaryButtonClass =
  "rounded-xl bg-[#00a69c] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0d8a99] disabled:opacity-50";

export const adminActiveTabClass = "bg-[#00a69c] text-white shadow-sm";

export function labelClass() {
  return "mb-1.5 block text-[13px] font-medium text-slate-700";
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className={labelClass()}>{label}</label>
      {children}
    </div>
  );
}

export function readOnlyInputClass() {
  return "w-full cursor-not-allowed select-all rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 shadow-sm outline-none";
}

export function AdminReadOnlyUrlField({
  label,
  value,
  hint = "Fixed site route — cannot be changed here.",
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <AdminField label={label}>
      <input
        readOnly
        tabIndex={-1}
        aria-readonly
        className={readOnlyInputClass()}
        value={value || "—"}
      />
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </AdminField>
  );
}

export function ReadOnlyUrlInput({ value }: { value: string }) {
  return (
    <>
      <input
        readOnly
        tabIndex={-1}
        aria-readonly
        className={readOnlyInputClass()}
        value={value || "—"}
      />
      <p className="mt-1 text-xs text-slate-400">Fixed site route — cannot be changed here.</p>
    </>
  );
}

export function AdminSectionVisibilityToggle({
  visible,
  onChange,
  label = "Show section on live site",
  description = "Turn off to hide this section from visitors",
}: {
  visible: boolean;
  onChange: (visible: boolean) => void;
  label?: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <span>
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        <span className="block text-xs text-slate-500">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={visible}
        onClick={() => onChange(!visible)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          visible ? "bg-[#00a69c]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            visible ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function SaveButton({
  onClick,
  loading,
  label = "Save changes",
}: {
  onClick: () => void;
  loading?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={adminPrimaryButtonClass}
    >
      {loading ? "Saving..." : label}
    </button>
  );
}

export function AdminGhostButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-sm font-medium text-teal-600 transition hover:text-teal-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
