"use client";

import { useEffect, useState } from "react";
import { api, type HeritageTour } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function HeritageAdminPage() {
  const [items, setItems] = useState<HeritageTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HeritageTour | null>(null);
  const [form, setForm] = useState<Partial<HeritageTour>>({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/heritage");
      setItems(data.data as HeritageTour[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      slug: "",
      gallery_urls: [],
      is_published: true,
      sort_order: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (item: HeritageTour) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await api.put("/admin/heritage", form);
      else await api.post("/admin/heritage", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save tour"); }
  };

  const remove = async (item: HeritageTour) => {
    try { await api.delete(`/admin/heritage?id=${item.id}`); load(); }
    catch { alert("Failed to delete tour"); }
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
          Heritage Tours
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage cultural excursions and Dire Dawa experiences
        </p>
      </div>

      <CrudTable
        items={items}
        title="All Tours"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={remove}
        addLabel="Add Tour"
        addIcon="add_circle"
        searchPlaceholder="Filter by slug..."
        searchKeys={["slug"] as (keyof HeritageTour)[]}
        columns={[
          {
            key: "slug",
            label: "Tour",
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
            key: "duration_hours",
            label: "Duration",
            render: (i) => (
              <div className="flex items-center gap-space-2xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="font-label-md text-label-md">
                  {i.duration_hours ? `${i.duration_hours} h` : "—"}
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
        title={editing ? "Edit Tour" : "Add Tour"}
        subtitle={editing ? `/${editing.slug}` : "Create a new heritage tour"}
        icon="museum"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          <FormField
            label="Slug"
            value={form.slug || ""}
            onChange={(v) => setForm({ ...form, slug: v })}
            placeholder="old-town-walking-tour"
          />
          <div className="grid grid-cols-2 gap-space-sm">
            <FormField
              label="Duration (hours)"
              type="number"
              value={form.duration_hours ?? ""}
              onChange={(v) => setForm({ ...form, duration_hours: v ? parseInt(v) : null })}
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
              {editing ? "Update Tour" : "Create Tour"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
