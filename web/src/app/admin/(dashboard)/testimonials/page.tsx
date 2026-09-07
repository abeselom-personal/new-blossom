"use client";

import { useEffect, useState } from "react";
import { api, type Testimonial } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/testimonials");
      setItems(data.data as Testimonial[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ rating: 5, is_published: true, sort_order: 0 });
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await api.put("/admin/testimonials", form);
      else await api.post("/admin/testimonials", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save testimonial"); }
  };

  const remove = async (item: Testimonial) => {
    try { await api.delete(`/admin/testimonials?id=${item.id}`); load(); }
    catch { alert("Failed to delete testimonial"); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-space-2xl">
        <span className="font-body-md text-body-md text-outline">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Testimonials
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage guest reviews and testimonials
        </p>
      </div>

      <CrudTable
        items={items}
        title="All Testimonials"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={remove}
        addLabel="Add Testimonial"
        addIcon="add_circle"
        emptyMessage="No testimonials yet"
        columns={[
          {
            key: "rating",
            label: "Rating",
            render: (i) => (
              <div className="flex items-center gap-space-2xs">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {i.rating}
                </div>
                <span className="font-title-md text-title-md text-secondary font-bold">
                  {"★".repeat(i.rating)}
                </span>
              </div>
            ),
          },
          {
            key: "image_url",
            label: "Image",
            render: (i) => i.image_url ? (
              <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
            ) : (
              <span className="text-outline">—</span>
            ),
          },
          {
            key: "is_published",
            label: "Status",
            render: (i) => <StatusPill status={i.is_published ? "published" : "draft"} />,
          },
        ]}
      />

      <Modal
        open={modalOpen}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        subtitle={editing ? `Rating ${editing.rating}/5` : "Create a new guest review"}
        icon="reviews"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          <FormField
            label="Rating (1-5)"
            type="number"
            value={form.rating ?? 5}
            onChange={(v) => setForm({ ...form, rating: Math.min(5, Math.max(1, parseInt(v) || 5)) })}
          />
          <FormField
            label="Image URL"
            value={form.image_url || ""}
            onChange={(v) => setForm({ ...form, image_url: v })}
            placeholder="https://..."
          />
          <Toggle
            label="Published"
            checked={form.is_published ?? true}
            onChange={(v) => setForm({ ...form, is_published: v })}
          />
          <div className="flex justify-end gap-space-xs pt-space-sm">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </ActionButton>
            <ActionButton onClick={save} icon="check">
              {editing ? "Update Testimonial" : "Create Testimonial"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
