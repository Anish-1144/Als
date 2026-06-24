"use client";

import { useEffect, useState } from "react";
import JobApplicationsTab from "@/app/components/admin/careers/JobApplicationsTab";
import { clientApi } from "@/lib/api-client";
import { getModulePermissions, useAdminSession } from "@/lib/use-admin-session";
import {
  AdminLoading,
  AdminPageTitle,
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/app/components/admin/AdminTable";

interface Lead {
  _id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt: string;
}

type LeadFilter = "all" | "contact" | "consultation" | "assessment" | "job-apply";

const LEAD_FILTERS: { value: LeadFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "consultation", label: "Consultation" },
  { value: "assessment", label: "Assessment" },
  { value: "job-apply", label: "Job Apply" },
];

export default function AdminLeadsPage() {
  const { user, loading: sessionLoading } = useAdminSession();
  const leadsAccess = getModulePermissions(user, "leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadFilter>("all");
  const [loading, setLoading] = useState(true);

  async function load(type: LeadFilter) {
    if (type === "job-apply") {
      setLoading(false);
      return;
    }
    setLoading(true);
    const path = type === "all" ? "/admin/leads" : `/admin/leads?type=${type}`;
    const res = await clientApi<Lead[]>(path);
    if (res.success && res.data) setLeads(res.data);
    setLoading(false);
  }

  useEffect(() => {
    if (!sessionLoading) load(filter);
  }, [filter, sessionLoading]);

  async function markRead(id: string) {
    if (!leadsAccess.canEdit) return;
    await clientApi(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "read" }),
    });
    await load(filter);
  }

  async function deleteLead(id: string) {
    if (!leadsAccess.canDelete) return;
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    await clientApi(`/admin/leads/${id}`, { method: "DELETE" });
    await load(filter);
  }

  if (sessionLoading) return <AdminLoading />;

  return (
    <div>
      <AdminPageTitle>Leads</AdminPageTitle>
      {!leadsAccess.canEdit && leadsAccess.canView && (
        <p className="mt-2 text-sm text-slate-500">View only — you cannot update or delete leads.</p>
      )}
      <div className="mb-6 mt-6 flex flex-wrap gap-2">
        {LEAD_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "border-[#00a69c] bg-[#00a69c] text-white"
                : "border-gray-300 bg-white text-gray-800 hover:border-[#00a69c]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filter === "job-apply" ? (
        <div>
          <p className="mb-4 text-sm text-slate-500">
            Career form submissions with resumes uploaded to Cloudinary.
          </p>
          <JobApplicationsTab
            canEdit={leadsAccess.canEdit}
            canDelete={leadsAccess.canDelete}
          />
        </div>
      ) : loading ? (
        <AdminLoading />
      ) : (
        <>
          <AdminTable>
            <AdminTableHead>
              <tr>
                <AdminTh>Date</AdminTh>
                <AdminTh>Type</AdminTh>
                <AdminTh>Name</AdminTh>
                <AdminTh>Email</AdminTh>
                <AdminTh>Subject</AdminTh>
                {(leadsAccess.canEdit || leadsAccess.canDelete) && <AdminTh>Actions</AdminTh>}
              </tr>
            </AdminTableHead>
            <tbody>
              {leads.map((lead) => (
                <AdminTr key={lead._id}>
                  <AdminTd muted>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </AdminTd>
                  <AdminTd>
                    <span className="capitalize">{lead.type}</span>
                  </AdminTd>
                  <AdminTd>{lead.name}</AdminTd>
                  <AdminTd>{lead.email}</AdminTd>
                  <AdminTd muted>{lead.subject ?? lead.message?.slice(0, 40) ?? "—"}</AdminTd>
                  {(leadsAccess.canEdit || leadsAccess.canDelete) && (
                    <AdminTd>
                      <div className="flex flex-wrap items-center gap-3">
                        {leadsAccess.canEdit && lead.status !== "read" && (
                          <button
                            type="button"
                            className="font-medium text-[#00a69c] hover:underline"
                            onClick={() => markRead(lead._id)}
                          >
                            Mark read
                          </button>
                        )}
                        {leadsAccess.canDelete && (
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:underline"
                            onClick={() => deleteLead(lead._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </AdminTd>
                  )}
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
          {leads.length === 0 && (
            <p className="p-8 text-center font-medium text-gray-600">No leads yet.</p>
          )}
        </>
      )}
    </div>
  );
}
