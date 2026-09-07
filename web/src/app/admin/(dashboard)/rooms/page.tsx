"use client";

import { useEffect, useState } from "react";
import { api, type Room } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function RoomsAdminPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [form, setForm] = useState<Partial<Room>>({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/rooms");
      setRooms(data.data as Room[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      slug: "",
      capacity: 2,
      amenities: [],
      gallery_urls: [],
      is_published: true,
      is_featured: false,
      sort_order: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm(room);
    setModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await api.put("/admin/rooms", form);
      else await api.post("/admin/rooms", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save room"); }
  };

  const remove = async (room: Room) => {
    try { await api.delete(`/admin/rooms?id=${room.id}`); load(); }
    catch { alert("Failed to delete room"); }
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
          Rooms & Suites
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage room types, pricing, amenities, and availability
        </p>
      </div>

      <CrudTable
        items={rooms}
        title="All Rooms"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={remove}
        addLabel="Add Room"
        addIcon="add_circle"
        searchPlaceholder="Filter by slug..."
        searchKeys={["slug"] as (keyof Room)[]}
        columns={[
          {
            key: "slug",
            label: "Room Type",
            render: (r) => (
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {r.slug.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    {r.slug.replace(/-/g, " ")}
                  </span>
                  <span className="font-body-sm text-body-sm text-outline font-mono">
                    /{r.slug}
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "price",
            label: "Price",
            render: (r) => (
              <span className="font-price-md text-price-md text-on-surface font-bold">
                {r.price ? `$${r.price}` : "—"}
              </span>
            ),
          },
          {
            key: "capacity",
            label: "Capacity",
            render: (r) => (
              <div className="flex items-center gap-space-2xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">group</span>
                <span className="font-label-md text-label-md">{r.capacity} guests</span>
              </div>
            ),
          },
          {
            key: "is_featured",
            label: "Featured",
            render: (r) => r.is_featured ? (
              <span className="material-symbols-outlined text-secondary text-[20px]">star</span>
            ) : (
              <span className="text-outline">—</span>
            ),
          },
          {
            key: "is_published",
            label: "Status",
            render: (r) => <StatusPill status={r.is_published ? "published" : "draft"} />,
          },
        ]}
      />

      <Modal
        open={modalOpen}
        title={editing ? "Edit Room" : "Add Room"}
        subtitle={editing ? `/${editing.slug}` : "Create a new room type"}
        icon="bed"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          <FormField
            label="Slug"
            value={form.slug || ""}
            onChange={(v) => setForm({ ...form, slug: v })}
            placeholder="deluxe-suite"
          />
          <div className="grid grid-cols-2 gap-space-sm">
            <FormField
              label="Price ($)"
              type="number"
              value={form.price ?? ""}
              onChange={(v) => setForm({ ...form, price: v ? parseFloat(v) : null })}
            />
            <FormField
              label="Capacity"
              type="number"
              value={form.capacity ?? 2}
              onChange={(v) => setForm({ ...form, capacity: parseInt(v) || 2 })}
            />
          </div>
          <div className="grid grid-cols-2 gap-space-sm">
            <FormField
              label="Size (sqm)"
              type="number"
              value={form.size_sqm ?? ""}
              onChange={(v) => setForm({ ...form, size_sqm: v ? parseInt(v) : null })}
            />
            <FormField
              label="Bed Type"
              value={form.bed_type || ""}
              onChange={(v) => setForm({ ...form, bed_type: v })}
              placeholder="King, Queen, Twin..."
            />
          </div>
          <FormField
            label="Image URL"
            value={form.image_url || ""}
            onChange={(v) => setForm({ ...form, image_url: v })}
            placeholder="https://..."
          />
          <FormField
            label="Amenities (comma-separated)"
            value={(form.amenities || []).join(", ")}
            onChange={(v) =>
              setForm({
                ...form,
                amenities: v.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            placeholder="WiFi, AC, Minibar"
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
              {editing ? "Update Room" : "Create Room"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
