"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
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

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | "contact" | "consultation">("all");
  const [loading, setLoading] = useState(true);

  async function load(type: string) {
    setLoading(true);
    const path = type === "all" ? "/admin/leads" : `/admin/leads?type=${type}`;
    const res = await clientApi<Lead[]>(path);
    if (res.success && res.data) setLeads(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load(filter);
  }, [filter]);

  async function markRead(id: string) {
    await clientApi(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "read" }),
    });
    await load(filter);
  }

  return (
    <div>
      <AdminPageTitle>Leads</AdminPageTitle>
      <div className="flex gap-2 mb-6 mt-6">
        {(["all", "contact", "consultation"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filter === t
                ? "bg-[#00a69c] text-white border-[#00a69c]"
                : "bg-white text-gray-800 border-gray-300 hover:border-[#00a69c]"
            }`}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
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
                <AdminTh>Actions</AdminTh>
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
                  <AdminTd muted>{lead.subject ?? "—"}</AdminTd>
                  <AdminTd>
                    <button
                      type="button"
                      className="font-medium text-[#00a69c] hover:underline"
                      onClick={() => markRead(lead._id)}
                    >
                      Mark read
                    </button>
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
          {leads.length === 0 && (
            <p className="p-8 text-center text-gray-600 font-medium">No leads yet.</p>
          )}
        </>
      )}
    </div>
  );
}
