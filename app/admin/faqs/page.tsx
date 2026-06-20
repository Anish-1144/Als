"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import {
  AdminAddButton,
  AdminBackLink,
  AdminLoading,
  AdminPageTitle,
  AdminStatus,
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/app/components/admin/AdminTable";

type FaqItem = {
  _id?: string;
  question: string;
  answerText: string;
  category: string;
  order: number;
  isActive: boolean;
};

const categories = [
  { value: "home-loans", label: "Home Loans" },
  { value: "refinancing", label: "Refinancing" },
  { value: "investment", label: "Investment" },
  { value: "commercial-loans", label: "Commercial" },
  { value: "smsf", label: "SMSF" },
  { value: "general", label: "General" },
];

function answerToText(answer: unknown): string {
  if (typeof answer === "string") return answer;
  if (Array.isArray(answer)) {
    return answer
      .flatMap((block: { children?: { text?: string }[] }) =>
        (block.children ?? []).map((c) => c.text ?? ""),
      )
      .join("\n");
  }
  return "";
}

function textToAnswer(text: string) {
  return [
    {
      type: "paragraph",
      children: [{ text }],
    },
  ];
}

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await clientApi<Record<string, unknown>[]>("/admin/faqs");
    if (res.success && res.data) {
      setItems(
        res.data.map((f) => ({
          _id: String(f._id),
          question: String(f.question ?? ""),
          answerText: answerToText(f.answer),
          category: String(f.category ?? "general"),
          order: Number(f.order ?? 0),
          isActive: f.isActive !== false,
        })),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setStatus("Saving...");
    const body = {
      question: editing.question,
      answer: textToAnswer(editing.answerText),
      category: editing.category,
      order: editing.order,
      isActive: editing.isActive,
    };
    const res = editing._id
      ? await clientApi(`/admin/faqs/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        })
      : await clientApi("/admin/faqs", {
          method: "POST",
          body: JSON.stringify(body),
        });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await clientApi(`/admin/faqs/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="max-w-2xl">
        <AdminBackLink onClick={() => setEditing(null)} />
        <h1 className="text-2xl font-besley font-semibold text-[#1d293d] mb-6">
          {editing._id ? "Edit" : "New"} FAQ
        </h1>
        <AdminField label="Question">
          <input className={inputClass()} value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} />
        </AdminField>
        <AdminField label="Answer">
          <textarea className={inputClass()} rows={6} value={editing.answerText} onChange={(e) => setEditing({ ...editing, answerText: e.target.value })} />
        </AdminField>
        <AdminField label="Category">
          <select className={inputClass()} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Order">
          <input type="number" className={inputClass()} value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} />
        </AdminField>
        <AdminField label="Active">
          <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
        </AdminField>
        <div className="flex gap-4 items-center mt-6">
          <SaveButton onClick={save} />
          {status && <AdminStatus>{status}</AdminStatus>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <AdminPageTitle>FAQs</AdminPageTitle>
        <AdminAddButton
          onClick={() =>
            setEditing({
              question: "",
              answerText: "",
              category: "general",
              order: 0,
              isActive: true,
            })
          }
        />
      </div>
      <AdminTable>
        <AdminTableHead>
          <tr>
            <AdminTh>Question</AdminTh>
            <AdminTh>Category</AdminTh>
            <AdminTh>Actions</AdminTh>
          </tr>
        </AdminTableHead>
        <tbody>
          {items.map((item) => (
            <AdminTr key={item._id}>
              <AdminTd>{item.question}</AdminTd>
              <AdminTd muted>{item.category}</AdminTd>
              <AdminTd>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="font-medium text-[#00a69c] hover:underline"
                    onClick={() => setEditing(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="font-medium text-red-600 hover:underline"
                    onClick={() => item._id && remove(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </AdminTd>
            </AdminTr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
