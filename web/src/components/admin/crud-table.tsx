"use client";

import { useState } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CrudTableProps<T> {
  items: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  addLabel?: string;
  addIcon?: string;
  emptyMessage?: string;
  title?: string;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
}

export function CrudTable<T extends { id: string }>({
  items,
  columns,
  onEdit,
  onDelete,
  onAdd,
  addLabel = "Add New",
  addIcon = "add_circle",
  emptyMessage = "No items found",
  title,
  searchPlaceholder = "Filter...",
  searchKeys,
}: CrudTableProps<T>) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = query && searchKeys
    ? items.filter((item) =>
        searchKeys.some((key) =>
          String(item[key] ?? "").toLowerCase().includes(query.toLowerCase())
        )
      )
    : items;

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-space-md md:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          {title && (
            <div className="flex items-center gap-space-xs">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {title}
              </h2>
              <span className="px-space-xs py-space-2xs rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                {filtered.length} total
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
          {searchKeys && (
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-lg flex-1 md:w-64">
              <span className="material-symbols-outlined text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none w-full placeholder:text-outline"
              />
            </div>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="px-space-md py-space-xs rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-space-2xs transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                {addIcon}
              </span>
              {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="px-space-lg py-space-2xl text-center">
          <span className="material-symbols-outlined text-outline text-[40px]">
            inbox
          </span>
          <p className="font-body-md text-body-md text-outline mt-space-sm">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="py-space-sm px-space-md">
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="py-space-sm px-space-md text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-surface-container-low/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-space-md px-space-md">
                      {col.render
                        ? col.render(item)
                        : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                  <td className="py-space-md px-space-md text-right">
                    <div className="flex items-center justify-end gap-space-xs">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline hover:text-primary transition-all"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      )}
                      {onDelete &&
                        (deleteId === item.id ? (
                          <div className="flex items-center gap-space-2xs">
                            <button
                              onClick={() => {
                                onDelete(item);
                                setDeleteId(null);
                              }}
                              className="px-space-sm py-space-2xs rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-bold"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline hover:text-error transition-all"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

interface ModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, subtitle, icon = "edit", onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-space-md"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl max-w-2xl w-full shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-space-lg pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {title}
              </h3>
              {subtitle && (
                <p className="font-body-sm text-body-sm text-outline">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="px-space-lg pb-space-lg overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

export function FormField({ label, value, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
      <label className="font-label-sm text-label-sm text-outline">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent font-title-md text-title-md text-on-surface placeholder:text-outline focus:outline-none w-full"
      />
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low">
      <div className="flex items-center gap-space-xs">
        <span className="material-symbols-outlined text-primary text-[18px]">
          {checked ? "check_circle" : "circle"}
        </span>
        <span className="font-label-md text-label-md text-on-surface">{label}</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all" />
      </label>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  variant?: "primary" | "ghost";
  icon?: string;
  children: React.ReactNode;
}

export function ActionButton({ onClick, variant = "primary", icon, children }: ActionButtonProps) {
  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className="px-space-md py-space-xs rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container transition-all"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-space-lg py-space-xs rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm flex items-center gap-space-2xs transition-all"
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}

interface StatusPillProps {
  status: string;
}

export function StatusPill({ status }: StatusPillProps) {
  const isPublished = status === "published";
  const isActive = status === "active" || status === "confirmed";
  const isError = status === "suspended" || status === "cancelled" || status === "error";
  const isPending = status === "pending" || status === "draft";

  const colors = isActive
    ? "bg-tertiary-fixed text-on-tertiary-fixed"
    : isError
    ? "bg-error-container text-on-error-container"
    : isPending
    ? "bg-secondary-fixed text-on-secondary-container"
    : isPublished
    ? "bg-tertiary-fixed text-on-tertiary-fixed"
    : "bg-surface-container text-on-surface-variant";

  const dotColor = isActive || isPublished
    ? "bg-tertiary"
    : isError
    ? "bg-error"
    : isPending
    ? "bg-secondary"
    : "bg-outline";

  return (
    <span
      className={`inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-bold capitalize ${colors}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {String(status)}
    </span>
  );
}
