import Link from "next/link";
import type { SectionCard } from "@/lib/admin-nav";

function SectionCardLink({ section }: { section: SectionCard }) {
  return (
    <Link
      href={section.href}
      className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-medium text-slate-900 transition group-hover:text-teal-700">
              {section.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{section.description}</p>
          </div>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600 transition group-hover:bg-[#00a69c] group-hover:text-white"
            aria-hidden
          >
            →
          </span>
        </div>
        {section.previewPath && (
          <p className="mt-3 text-xs text-slate-400">
            Shown on <span className="font-mono text-slate-500">{section.previewPath}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export function AdminSectionHub({
  title,
  description,
  sections,
  breadcrumb,
}: {
  title: string;
  description: string;
  sections: SectionCard[];
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <div className="w-full min-w-0">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          {breadcrumb.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-300">/</span>}
              <Link href={item.href} className="transition hover:text-teal-600">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      )}

      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
        {title}
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-slate-500">{description}</p>

      <div className="grid gap-3">
        {sections.map((section) => (
          <SectionCardLink key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
