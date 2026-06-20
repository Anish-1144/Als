"use client";

import Link from "next/link";
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

interface Loan {
  _id: string;
  title: string;
  slug: string;
  isPublished?: boolean;
}

export default function AdminLoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Loan[]>("/admin/loans").then((res) => {
      if (res.success && res.data) setLoans(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <AdminPageTitle>Loans</AdminPageTitle>
        <Link
          href="/admin/loans/new"
          className="px-4 py-2 bg-[#00a69c] text-white rounded-lg text-sm font-medium hover:bg-[#0d8a99] shadow-sm"
        >
          Add loan
        </Link>
      </div>
      <AdminTable>
        <AdminTableHead>
          <tr>
            <AdminTh>Title</AdminTh>
            <AdminTh>Slug</AdminTh>
            <AdminTh>Status</AdminTh>
            <AdminTh>Actions</AdminTh>
          </tr>
        </AdminTableHead>
        <tbody>
          {loans.map((loan) => (
            <AdminTr key={loan._id}>
              <AdminTd>{loan.title}</AdminTd>
              <AdminTd muted>{loan.slug}</AdminTd>
              <AdminTd>
                <span
                  className={
                    loan.isPublished !== false
                      ? "text-green-700 font-medium"
                      : "text-amber-700 font-medium"
                  }
                >
                  {loan.isPublished !== false ? "Published" : "Draft"}
                </span>
              </AdminTd>
              <AdminTd>
                <Link
                  href={`/admin/loans/${loan._id}`}
                  className="font-medium text-[#00a69c] hover:underline"
                >
                  Edit
                </Link>
              </AdminTd>
            </AdminTr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
