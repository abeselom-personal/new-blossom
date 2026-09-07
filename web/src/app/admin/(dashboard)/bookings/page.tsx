"use client";

import { useEffect, useState } from "react";
import { api, type Booking } from "@/lib/api/client";
import { ActionButton, StatusPill } from "@/components/admin/crud-table";

const STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (filter) params.set("status", filter);
      const { data } = await api.get(`/admin/bookings?${params}`);
      setBookings(data.data as Booking[]);
      setTotal(data.meta?.total ?? (data.data as Booking[]).length);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch("/admin/bookings/status", { id, status });
      load();
      if (selected?.id === id) {
        setSelected({ ...selected, status });
      }
    } catch { alert("Failed to update status"); }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <>
      {/* Page header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Bookings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Review and manage guest booking inquiries
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center p-space-2xs bg-surface-container rounded-lg self-start w-fit">
        <button
          onClick={() => { setFilter(""); setPage(1); }}
          className={`px-space-sm py-space-2xs rounded font-label-sm text-label-sm transition-all ${
            filter === "" ? "bg-surface-container-lowest shadow-sm text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            className={`px-space-sm py-space-2xs rounded font-label-sm text-label-sm capitalize transition-all ${
              filter === s ? "bg-surface-container-lowest shadow-sm text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Bookings table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        {loading ? (
          <div className="px-space-lg py-space-2xl text-center">
            <span className="font-body-md text-body-md text-outline">Loading...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="px-space-lg py-space-2xl text-center">
            <span className="material-symbols-outlined text-outline text-[40px]">inbox</span>
            <p className="font-body-md text-body-md text-outline mt-space-sm">No bookings found</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="py-space-sm px-space-md">Guest</th>
                  <th className="py-space-sm px-space-md">Type</th>
                  <th className="py-space-sm px-space-md">Dates</th>
                  <th className="py-space-sm px-space-md">Created</th>
                  <th className="py-space-sm px-space-md">Status</th>
                  <th className="py-space-sm px-space-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-surface-container-low/60 transition-colors cursor-pointer"
                    onClick={() => setSelected(b)}
                  >
                    <td className="py-space-md px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-label-md">
                          {b.guest_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">
                            {b.guest_name}
                          </span>
                          <span className="font-body-sm text-body-sm text-outline">
                            {b.guest_email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="capitalize font-label-md text-label-md text-on-surface-variant">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">
                      {b.check_in ? new Date(b.check_in).toLocaleDateString() : "—"}
                      {b.check_out ? ` → ${new Date(b.check_out).toLocaleDateString()}` : ""}
                    </td>
                    <td className="py-space-md px-space-md font-body-sm text-body-sm text-outline">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-space-md px-space-md" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className="bg-transparent font-label-sm text-label-sm capitalize cursor-pointer focus:outline-none rounded-full px-space-sm py-space-2xs border-0"
                        style={{
                          backgroundColor:
                            b.status === "pending" ? "var(--color-secondary-fixed)" :
                            b.status === "confirmed" ? "var(--color-tertiary-fixed)" :
                            b.status === "cancelled" ? "var(--color-error-container)" :
                            "var(--color-surface-container)",
                          color:
                            b.status === "pending" ? "var(--color-on-secondary-container)" :
                            b.status === "confirmed" ? "var(--color-on-tertiary-fixed)" :
                            b.status === "cancelled" ? "var(--color-on-error-container)" :
                            "var(--color-on-surface-variant)",
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-space-md px-space-md text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(b); }}
                        className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline hover:text-primary transition-all"
                        title="View details"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-space-md bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} bookings
            </span>
            <div className="flex items-center gap-space-xs">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-space-sm py-space-xs rounded-lg bg-surface-container-lowest text-outline font-label-sm text-label-sm hover:text-on-surface disabled:opacity-50 transition-all"
              >
                Previous
              </button>
              <span className="font-label-md text-label-md text-on-surface px-space-sm">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-space-sm py-space-xs rounded-lg bg-surface-container-lowest text-outline font-label-sm text-label-sm hover:text-on-surface disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-space-md"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-xl max-w-lg w-full shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-space-lg pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">event</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Booking Details
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    {selected.guest_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-space-lg pb-space-lg flex flex-col gap-space-sm">
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
                <DetailRow icon="person" label="Guest" value={selected.guest_name} />
                <DetailRow icon="mail" label="Email" value={selected.guest_email} />
                {selected.guest_phone && (
                  <DetailRow icon="call" label="Phone" value={selected.guest_phone} />
                )}
                <DetailRow icon="category" label="Type" value={selected.type} capitalize />
                {selected.check_in && (
                  <DetailRow icon="login" label="Check-in" value={new Date(selected.check_in).toLocaleDateString()} />
                )}
                {selected.check_out && (
                  <DetailRow icon="logout" label="Check-out" value={new Date(selected.check_out).toLocaleDateString()} />
                )}
                <DetailRow icon="group" label="Adults" value={String(selected.adults)} />
                <DetailRow icon="child_care" label="Children" value={String(selected.children)} />
                {selected.notes && (
                  <DetailRow icon="notes" label="Notes" value={selected.notes} />
                )}
                <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/50">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">Created</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">
                    {new Date(selected.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status actions */}
              <div className="flex items-center gap-space-2xs p-space-2xs bg-surface-container rounded-xl">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`flex-1 px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm capitalize transition-all ${
                      selected.status === s
                        ? "bg-surface-container-lowest shadow-sm text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
  capitalize,
}: {
  icon: string;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-space-xs">
        <span className="material-symbols-outlined text-outline text-[18px]">{icon}</span>
        <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
      </div>
      <span
        className={`font-body-md text-body-md text-on-surface ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
