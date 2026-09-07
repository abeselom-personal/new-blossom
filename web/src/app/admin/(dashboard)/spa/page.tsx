"use client";

import { useEffect, useState } from "react";
import { api, type SpaService } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function SpaAdminPage() {
  const [items, setItems] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SpaService | null>(null);
  const [form, setForm] = useState<Partial<SpaService>>({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/spa");
      setItems(data.data as SpaService[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      slug: "",
      gallery_urls: [],
      is_published: true,
      is_featured: false,
      sort_order: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (item: SpaService) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await api.put("/admin/spa", form);
      else await api.post("/admin/spa", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save spa service"); }
  };

  const remove = async (item: SpaService) => {
    try { await api.delete(`/admin/spa?id=${item.id}`); load(); }
    catch { alert("Failed to delete spa service"); }
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
          Spa Services
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage spa treatments, rituals, and pricing
        </p>
      </div>

      <CrudTable
        items={items}
        title="All Services"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={remove}
        addLabel="Add Service"
        addIcon="add_circle"
        searchPlaceholder="Filter by slug..."
        searchKeys={["slug"] as (keyof SpaService)[]}
        columns={[
          {
            key: "slug",
            label: "Service",
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
            key: "duration_mins",
            label: "Duration",
            render: (i) => (
              <div className="flex items-center gap-space-2xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="font-label-md text-label-md">
                  {i.duration_mins ? `${i.duration_mins} min` : "—"}
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
            key: "is_featured",
            label: "Featured",
            render: (i) => i.is_featured ? (
              <span className="material-symbols-outlined text-secondary text-[20px]">star</span>
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
        title={editing ? "Edit Service" : "Add Service"}
        subtitle={editing ? `/${editing.slug}` : "Create a new spa service"}
        icon="spa"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          <FormField
            label="Slug"
            value={form.slug || ""}
            onChange={(v) => setForm({ ...form, slug: v })}
            placeholder="hammam-ritual"
          />
          <div className="grid grid-cols-2 gap-space-sm">
            <FormField
              label="Duration (min)"
              type="number"
              value={form.duration_mins ?? ""}
              onChange={(v) => setForm({ ...form, duration_mins: v ? parseInt(v) : null })}
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
          <div className="flex items-center gap-space-sm">
            <div className="flex-1">
              <Toggle
                label="Published"
                checked={form.is_published ?? true}
                onChange={(v) => setForm({ ...form, is_published: v })}
              />
            </div>
            <div className="flex-1">
              <Toggle
                label="Featured"
                checked={form.is_featured ?? false}
                onChange={(v) => setForm({ ...form, is_featured: v })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-space-xs pt-space-sm">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </ActionButton>
            <ActionButton onClick={save} icon="check">
              {editing ? "Update Service" : "Create Service"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
