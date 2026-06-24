export default function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
      <div className="w-2 h-2 bg-[#00a69c] rounded-full" />
      <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="w-16 h-px bg-[#00a69c]" />
      <div className="w-3 h-3 bg-[#00a69c] rounded-full" />
      <div className="w-16 h-px bg-[#00a69c]" />
    </div>
  );
}
