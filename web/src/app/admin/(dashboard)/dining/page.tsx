"use client";

import { useEffect, useState } from "react";
import { api, type Venue, type MenuItem } from "@/lib/api/client";
import { CrudTable, Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

export default function DiningAdminPage() {
  const [tab, setTab] = useState<"venues" | "menu">("venues");
  const [venues, setVenues] = useState<Venue[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Venue | MenuItem | null>(null);
  const [venueForm, setVenueForm] = useState<Partial<Venue>>({});
  const [menuForm, setMenuForm] = useState<Partial<MenuItem>>({});

  const load = async () => {
    setLoading(true);
    try {
      const [v, m] = await Promise.all([
        api.get("/admin/dining/venues"),
        api.get("/admin/dining/menu"),
      ]);
      setVenues(v.data.data as Venue[]);
      setMenuItems(m.data.data as MenuItem[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  // Venue handlers
  const openAddVenue = () => {
    setEditing(null);
    setVenueForm({ slug: "", gallery_urls: [], is_published: true, sort_order: 0 });
    setModalOpen(true);
  };

  const openEditVenue = (v: Venue) => {
    setEditing(v);
    setVenueForm(v);
    setModalOpen(true);
  };

  const saveVenue = async () => {
    try {
      if (editing) await api.put("/admin/dining/venues", venueForm);
      else await api.post("/admin/dining/venues", venueForm);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save venue"); }
  };

  const removeVenue = async (v: Venue) => {
    try { await api.delete(`/admin/dining/venues?id=${v.id}`); load(); }
    catch { alert("Failed to delete venue"); }
  };

  // Menu item handlers
  const openAddMenuItem = () => {
    setEditing(null);
    setMenuForm({ category: "", price: 0, is_available: true, is_published: true, sort_order: 0 });
    setModalOpen(true);
  };

  const openEditMenuItem = (m: MenuItem) => {
    setEditing(m);
    setMenuForm(m);
    setModalOpen(true);
  };

  const saveMenuItem = async () => {
    try {
      if (editing) await api.put("/admin/dining/menu", menuForm);
      else await api.post("/admin/dining/menu", menuForm);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save menu item"); }
  };

  const removeMenuItem = async (m: MenuItem) => {
    try { await api.delete(`/admin/dining/menu?id=${m.id}`); load(); }
    catch { alert("Failed to delete menu item"); }
  };

  const isVenueModal = tab === "venues";

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
          Dining &amp; Menu
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Manage dining venues and menu items
        </p>
      </div>

      {/* Tab selector */}
      <div className="bg-surface-container rounded-lg p-space-2xs inline-flex gap-space-2xs w-fit">
        <button
          onClick={() => setTab("venues")}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-2xs ${
            tab === "venues"
              ? "bg-surface-container-lowest shadow-sm text-primary font-bold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">restaurant</span>
          Venues
        </button>
        <button
          onClick={() => setTab("menu")}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-2xs ${
            tab === "menu"
              ? "bg-surface-container-lowest shadow-sm text-primary font-bold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">lunch_dining</span>
          Menu Items
        </button>
      </div>

      {tab === "venues" ? (
        <CrudTable
          items={venues}
          title="All Venues"
          onAdd={openAddVenue}
          onEdit={openEditVenue}
          onDelete={removeVenue}
          addLabel="Add Venue"
          addIcon="add_circle"
          searchPlaceholder="Filter by slug..."
          searchKeys={["slug"] as (keyof Venue)[]}
          emptyMessage="No venues yet"
          columns={[
            {
              key: "slug",
              label: "Venue",
              render: (v) => (
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {v.slug.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface font-semibold">
                      {v.slug.replace(/-/g, " ")}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline font-mono">
                      /{v.slug}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              key: "hours",
              label: "Hours",
              render: (v) => (
                <div className="flex items-center gap-space-2xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span className="font-label-md text-label-md">{v.hours || "—"}</span>
                </div>
              ),
            },
            {
              key: "is_published",
              label: "Status",
              render: (v) => <StatusPill status={v.is_published ? "published" : "draft"} />,
            },
          ]}
        />
      ) : (
        <CrudTable
          items={menuItems}
          title="All Menu Items"
          onAdd={openAddMenuItem}
          onEdit={openEditMenuItem}
          onDelete={removeMenuItem}
          addLabel="Add Menu Item"
          addIcon="add_circle"
          searchPlaceholder="Filter by category..."
          searchKeys={["category"] as (keyof MenuItem)[]}
          emptyMessage="No menu items yet"
          columns={[
            {
              key: "category",
              label: "Category",
              render: (m) => (
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {m.category.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-title-md text-title-md text-on-surface font-semibold capitalize">
                    {m.category}
                  </span>
                </div>
              ),
            },
            {
              key: "price",
              label: "Price",
              render: (m) => (
                <span className="font-price-md text-price-md text-on-surface font-bold">
                  ${m.price}
                </span>
              ),
            },
            {
              key: "is_available",
              label: "Available",
              render: (m) => m.is_available ? (
                <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
              ) : (
                <span className="text-outline">—</span>
              ),
            },
            {
              key: "is_published",
              label: "Status",
              render: (m) => <StatusPill status={m.is_published ? "published" : "draft"} />,
            },
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title={isVenueModal ? (editing ? "Edit Venue" : "Add Venue") : (editing ? "Edit Menu Item" : "Add Menu Item")}
        subtitle={isVenueModal ? "Dining venue details" : "Menu item details"}
        icon={isVenueModal ? "restaurant" : "lunch_dining"}
        onClose={() => setModalOpen(false)}
      >
        {isVenueModal ? (
          <div className="flex flex-col gap-space-sm">
            <FormField
              label="Slug"
              value={venueForm.slug || ""}
              onChange={(v) => setVenueForm({ ...venueForm, slug: v })}
              placeholder="rooftop-restaurant"
            />
            <FormField
              label="Hours"
              value={venueForm.hours || ""}
              onChange={(v) => setVenueForm({ ...venueForm, hours: v })}
              placeholder="6:00 PM - 11:00 PM"
            />
            <FormField
              label="Image URL"
              value={venueForm.image_url || ""}
              onChange={(v) => setVenueForm({ ...venueForm, image_url: v })}
              placeholder="https://..."
            />
            <Toggle
              label="Published"
              checked={venueForm.is_published ?? true}
              onChange={(v) => setVenueForm({ ...venueForm, is_published: v })}
            />
            <div className="flex justify-end gap-space-xs pt-space-sm">
              <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </ActionButton>
              <ActionButton onClick={saveVenue} icon="check">
                {editing ? "Update Venue" : "Create Venue"}
              </ActionButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-space-sm">
            <FormField
              label="Category"
              value={menuForm.category || ""}
              onChange={(v) => setMenuForm({ ...menuForm, category: v })}
              placeholder="appetizers"
            />
            <FormField
              label="Price ($)"
              type="number"
              value={menuForm.price ?? 0}
              onChange={(v) => setMenuForm({ ...menuForm, price: parseFloat(v) || 0 })}
            />
            <FormField
              label="Image URL"
              value={menuForm.image_url || ""}
              onChange={(v) => setMenuForm({ ...menuForm, image_url: v })}
              placeholder="https://..."
            />
            <div className="flex items-center gap-space-sm">
              <div className="flex-1">
                <Toggle
                  label="Available"
                  checked={menuForm.is_available ?? true}
                  onChange={(v) => setMenuForm({ ...menuForm, is_available: v })}
                />
              </div>
              <div className="flex-1">
                <Toggle
                  label="Published"
                  checked={menuForm.is_published ?? true}
                  onChange={(v) => setMenuForm({ ...menuForm, is_published: v })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-space-xs pt-space-sm">
              <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </ActionButton>
              <ActionButton onClick={saveMenuItem} icon="check">
                {editing ? "Update Menu Item" : "Create Menu Item"}
              </ActionButton>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
