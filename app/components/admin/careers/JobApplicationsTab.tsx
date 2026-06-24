"use client";

import { Fragment, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import {
  AdminLoading,
  AdminStatus,
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/app/components/admin/AdminTable";

type JobApplication = {
  _id: string;
  jobTitle?: string;
  jobPostingId?: string;
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  linkedIn?: string;
  status: string;
  createdAt: string;
};

const STATUS_OPTIONS = ["new", "reviewing", "interview", "rejected", "hired"] as const;

export default function JobApplicationsTab({
  canEdit = true,
  canDelete = false,
}: {
  canEdit?: boolean;
  canDelete?: boolean;
}) {
  const [items, setItems] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState("");

  async function load() {
    setLoading(true);
    const res = await clientApi<JobApplication[]>("/admin/job-applications");
    if (res.success && res.data) setItems(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    if (!canEdit) return;
    setStatusMsg("Updating...");
    const res = await clientApi(`/admin/job-applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setStatusMsg(res.success ? "" : (res.error?.message ?? "Update failed"));
    if (res.success) await load();
  }

  async function deleteApplication(id: string) {
    if (!canDelete) return;
    if (!window.confirm("Delete this job application? This cannot be undone.")) return;
    setStatusMsg("Deleting...");
    const res = await clientApi(`/admin/job-applications/${id}`, {
      method: "DELETE",
    });
    setStatusMsg(res.success ? "" : (res.error?.message ?? "Delete failed"));
    if (res.success) await load();
  }

  if (loading) return <AdminLoading />;

  return (
    <div>
      {statusMsg && (
        <p className="mb-4">
          <AdminStatus>{statusMsg}</AdminStatus>
        </p>
      )}
      <AdminTable>
        <AdminTableHead>
          <tr>
            <AdminTh>Date</AdminTh>
            <AdminTh>Name</AdminTh>
            <AdminTh>Email</AdminTh>
            <AdminTh>Position</AdminTh>
            <AdminTh>Resume</AdminTh>
            <AdminTh>Status</AdminTh>
            <AdminTh>Details</AdminTh>
            {(canEdit || canDelete) && <AdminTh>Actions</AdminTh>}
          </tr>
        </AdminTableHead>
        <tbody>
          {items.map((item) => (
            <Fragment key={item._id}>
              <AdminTr>
                <AdminTd muted>
                  {new Date(item.createdAt).toLocaleDateString()}
                </AdminTd>
                <AdminTd>{item.applicantName}</AdminTd>
                <AdminTd>{item.email}</AdminTd>
                <AdminTd muted>{item.jobTitle ?? "—"}</AdminTd>
                <AdminTd>
                  {item.resumeUrl ? (
                    <a
                      href={item.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#00a69c] hover:underline"
                      title="Open resume on Cloudinary"
                    >
                      {item.resumeFileName ?? "View resume"}
                    </a>
                  ) : (
                    "—"
                  )}
                </AdminTd>
                <AdminTd>
                  {canEdit ? (
                    <select
                      value={item.status ?? "new"}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="capitalize text-slate-600">{item.status ?? "new"}</span>
                  )}
                </AdminTd>
                <AdminTd>
                  <button
                    type="button"
                    className="font-medium text-[#00a69c] hover:underline"
                    onClick={() =>
                      setExpandedId(expandedId === item._id ? null : item._id)
                    }
                  >
                    {expandedId === item._id ? "Hide" : "View"}
                  </button>
                </AdminTd>
                {(canEdit || canDelete) && (
                  <AdminTd>
                    {canDelete && (
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:underline"
                        onClick={() => deleteApplication(item._id)}
                      >
                        Delete
                      </button>
                    )}
                  </AdminTd>
                )}
              </AdminTr>
              {expandedId === item._id && (
                <tr key={`${item._id}-detail`} className="bg-slate-50">
                  <td colSpan={canEdit || canDelete ? 8 : 7} className="px-4 py-4 text-sm text-slate-700">
                    <div className="grid gap-3 md:grid-cols-2">
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {item.phone ?? "—"}
                      </p>
                      <p>
                        <span className="font-medium">LinkedIn:</span>{" "}
                        {item.linkedIn ? (
                          <a
                            href={item.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00a69c] hover:underline"
                          >
                            Profile
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                      <p className="md:col-span-2">
                        <span className="font-medium">Resume:</span>{" "}
                        {item.resumeUrl ? (
                          <a
                            href={item.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00a69c] hover:underline"
                          >
                            {item.resumeFileName ?? "Open on Cloudinary"}
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                    {item.coverLetter && (
                      <div className="mt-3">
                        <p className="mb-1 font-medium">Cover letter</p>
                        <p className="whitespace-pre-wrap rounded-lg bg-white p-3 text-slate-600">
                          {item.coverLetter}
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </AdminTable>
      {items.length === 0 && (
        <p className="p-8 text-center text-gray-600 font-medium">
          No applications yet.
        </p>
      )}
    </div>
  );
}
