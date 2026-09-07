"use client";

import { useEffect, useState } from "react";
import { api, type Setting } from "@/lib/api/client";
import { Modal, FormField, Toggle, ActionButton, StatusPill } from "@/components/admin/crud-table";

interface SettingForm {
  key: string;
  type: string;
  is_public: boolean;
  translations: { locale: string; value: string }[];
}

const TYPE_OPTIONS = ["text", "json", "image", "contact"];

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Setting | null>(null);
  const [form, setForm] = useState<SettingForm>({
    key: "",
    type: "text",
    is_public: true,
    translations: [],
  });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/settings");
      setSettings(data.data as Setting[]);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openEdit = (s: Setting) => {
    setEditing(s);
    setForm({
      key: s.key,
      type: s.type,
      is_public: s.is_public,
      translations: s.translations?.length
        ? s.translations
        : [{ locale: "en", value: "" }, { locale: "am", value: "" }],
    });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      key: "",
      type: "text",
      is_public: true,
      translations: [{ locale: "en", value: "" }, { locale: "am", value: "" }],
    });
    setModalOpen(true);
  };

  const save = async () => {
    try {
      await api.put("/admin/settings", form);
      setModalOpen(false);
      load();
    } catch { alert("Failed to save setting"); }
  };

  const remove = async (s: Setting) => {
    if (!window.confirm(`Delete setting "${s.key}"?`)) return;
    try { await api.delete(`/admin/settings?key=${s.key}`); load(); }
    catch { alert("Failed to delete setting"); }
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
      <div className="flex items-start justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Settings
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Manage site-wide configuration and translations
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-space-md py-space-xs rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-space-2xs transition-all shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Add Setting
        </button>
      </div>

      {/* Settings list */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        {settings.length === 0 ? (
          <div className="px-space-lg py-space-2xl text-center">
            <span className="material-symbols-outlined text-outline text-[40px]">tune</span>
            <p className="font-body-md text-body-md text-outline mt-space-sm">
              No settings configured
            </p>
          </div>
        ) : (
          <div className="divide-y divide-surface-container">
            {settings.map((s) => (
              <div
                key={s.id}
                className="px-space-md md:px-space-lg py-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low/60 transition-colors cursor-pointer"
                onClick={() => openEdit(s)}
              >
                <div className="flex items-center gap-space-sm min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-md text-title-md text-on-surface font-mono truncate">
                      {s.key}
                    </span>
                    <div className="flex items-center gap-space-xs mt-space-2xs">
                      <span className="px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-bold capitalize">
                        {s.type}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline flex items-center gap-space-2xs">
                        <span className="material-symbols-outlined text-[14px]">translate</span>
                        {s.translations?.length || 0} translations
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm shrink-0">
                  <StatusPill status={s.is_public ? "published" : "draft"} />
                  <div className="flex items-center gap-space-xs" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openEdit(s)}
                      className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline hover:text-primary transition-all"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => remove(s)}
                      className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline hover:text-error transition-all"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal
        open={modalOpen}
        title={editing ? "Edit Setting" : "Add Setting"}
        subtitle={editing ? editing.key : "Create a new configuration key"}
        icon="tune"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-space-sm">
          {editing ? (
            <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs opacity-70">
              <label className="font-label-sm text-label-sm text-outline">Key</label>
              <input
                type="text"
                value={form.key}
                disabled
                placeholder="hotel_name"
                className="bg-transparent font-title-md text-title-md text-on-surface font-mono focus:outline-none w-full cursor-not-allowed"
              />
            </div>
          ) : (
            <FormField
              label="Key"
              value={form.key}
              onChange={(v) => setForm({ ...form, key: v })}
              placeholder="hotel_name"
            />
          )}

          {/* Type select */}
          <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
            <label className="font-label-sm text-label-sm text-outline">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-transparent font-title-md text-title-md text-on-surface focus:outline-none w-full capitalize"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>

          <Toggle
            label="Public"
            checked={form.is_public}
            onChange={(v) => setForm({ ...form, is_public: v })}
          />

          {/* Translations */}
          <div className="flex flex-col gap-space-xs pt-space-sm">
            <div className="flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-primary text-[18px]">translate</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Translations
              </span>
            </div>
            {form.translations.map((t, i) => (
              <div key={t.locale} className="flex items-center gap-space-sm">
                <span className="font-label-md text-label-md text-on-surface-variant font-mono w-10 shrink-0 uppercase">
                  {t.locale}
                </span>
                <div className="flex-1">
                  <FormField
                    label={`Value (${t.locale})`}
                    value={t.value}
                    onChange={(v) => {
                      const translations = [...form.translations];
                      translations[i] = { ...t, value: v };
                      setForm({ ...form, translations });
                    }}
                    placeholder={`Value (${t.locale})`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-space-xs pt-space-sm">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </ActionButton>
            <ActionButton onClick={save} icon="check">
              {editing ? "Update Setting" : "Create Setting"}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
