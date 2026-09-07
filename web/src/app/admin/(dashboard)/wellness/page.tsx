"use client";

import { useEffect, useState } from "react";
import { api, type WellnessRetreat } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function WellnessAdminPage() {
  const [items, setItems] = useState<WellnessRetreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WellnessRetreat | null>(null);
  const [form, setForm] = useState<Partial<WellnessRetreat>>({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/wellness");
      setItems(data.data as WellnessRetreat[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      slug: "",
      duration_days: 3,
      gallery_urls: [],
      is_published: true,
      sort_order: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (item: WellnessRetreat) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await api.put("/admin/wellness", form);
      else await api.post("/admin/wellness", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save retreat"); }
  };

  const remove = async (item: WellnessRetreat) => {
    try { await api.delete(`/admin/wellness?id=${item.id}`); load(); }
    catch { alert("Failed to delete retreat"); }
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
          Wellness Retreats
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage wellness programs and restorative retreats
        </p>
      </div>

      <CrudTable
        items={items}
        title="All Retreats"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={remove}
        addLabel="Add Retreat"
        addIcon="add_circle"
        searchPlaceholder="Filter by slug..."
        searchKeys={["slug"] as (keyof WellnessRetreat)[]}
        columns={[
          {
            key: "slug",
            label: "Retreat",
            render: (i) => (
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {i.slug.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    {i.slug.replace(/-/g, " ")}
                  </span>
                  <span className="font-body-sm text-body-sm text-outline font-mono">
                    /{i.slug}
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "duration_days",
            label: "Duration",
            render: (i) => (
              <div className="flex items-center gap-space-2xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span className="font-label-md text-label-md">
                  {i.duration_days ? `${i.duration_days} days` : "—"}
                </span>
              </div>
            ),
          },
          {
            key: "price",
            label: "Price",
            render: (i) => (
              <span className="font-price-md text-price-md text-on-surface font-bold">
                {i.price ? `$${i.price}` : "—"}
              </span>
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
        title={editing ? "Edit Retreat" : "Add Retreat"}
        subtitle={editing ? `/${editing.slug}` : "Create a new wellness retreat"}
        icon="self_improvement"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          <FormField
            label="Slug"
            value={form.slug || ""}
            onChange={(v) => setForm({ ...form, slug: v })}
            placeholder="3-day-detox"
          />
          <div className="grid grid-cols-2 gap-space-sm">
            <FormField
              label="Duration (days)"
              type="number"
              value={form.duration_days ?? 3}
              onChange={(v) => setForm({ ...form, duration_days: parseInt(v) || 3 })}
            />
            <FormField
              label="Price ($)"
              type="number"
              value={form.price ?? ""}
              onChange={(v) => setForm({ ...form, price: v ? parseFloat(v) : null })}
            />
          </div>
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
              {editing ? "Update Retreat" : "Create Retreat"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
