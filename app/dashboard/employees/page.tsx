"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  Trash2,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type EmployerRow = {
  user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  company_name?: string | null;
  email: string;
  phone_number: string | null;
  state: string | null;
  created_at: string | null;
};

export default function EmployeesPage() {
  const [rows, setRows] = useState<EmployerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const [total, setTotal] = useState<number | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ user_id: string } | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuOpenId) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpenId]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    supabase
      .from("employer_profile")
      .select(
        "user_id, first_name, last_name, company_name, email, phone_number, state, created_at",
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        if (!mounted) return;
        setRows((data as EmployerRow[]) ?? []);
        setTotal(typeof count === "number" ? count : null);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setRows([]);
        setTotal(null);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [page, pageSize]);

  return (
    <div className="min-w-0 overflow-x-hidden">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">SN</th>
                  <th className="px-3 py-2 text-left font-medium">User ID</th>
                  <th className="px-3 py-2 text-left font-medium">Name</th>
                  <th className="px-3 py-2 text-left font-medium">Email</th>
                  <th className="px-3 py-2 text-left font-medium">Phone</th>
                  <th className="px-3 py-2 text-left font-medium">State</th>
                  <th className="px-3 py-2 text-left font-medium">Created</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td className="px-3 py-3" colSpan={8}>
                      Loading...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3" colSpan={8}>
                      No employees found
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => {
                    const name =
                      r.company_name ||
                      [r.first_name, r.last_name].filter(Boolean).join(" ") ||
                      "-";
                    return (
                      <tr
                        key={r.user_id}
                        className="hover:bg-gray-50/60 dark:hover:bg-gray-900/60"
                      >
                        <td className="px-3 py-2">
                          {idx + 1 + (page - 1) * pageSize}
                        </td>
                        <td className="px-3 py-2">
                          {r.user_id ? r.user_id.slice(-5) : "-"}
                        </td>
                        <td className="px-3 py-2">{name}</td>
                        <td className="px-3 py-2">{r.email}</td>
                        <td className="px-3 py-2">{r.phone_number ?? "-"}</td>
                        <td className="px-3 py-2">{r.state ?? "-"}</td>
                        <td className="px-3 py-2">
                          {r.created_at
                            ? new Date(r.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-3 py-2">
                          <div
                            className="relative inline-block text-left"
                            ref={menuOpenId === r.user_id ? menuRef : null}
                          >
                            <Button
                              size="icon"
                              variant="outline"
                              aria-label="Actions"
                              onClick={() =>
                                setMenuOpenId((id) =>
                                  id === r.user_id ? null : r.user_id,
                                )
                              }
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            {menuOpenId === r.user_id ? (
                              <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                                <button
                                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  onClick={async () => {
                                    setMenuOpenId(null);
                                    setViewLoading(true);
                                    setDetail(null);
                                    setViewOpen(true);
                                    const { data } = await supabase
                                      .from("employer_profile")
                                      .select("*")
                                      .eq("user_id", r.user_id)
                                      .single();
                                    setDetail(data ?? null);
                                    setViewLoading(false);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                  View details
                                </button>
                                <button
                                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    setDeleteTarget({ user_id: r.user_id });
                                    setDeleteOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-2 py-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {(() => {
                const from = rows.length ? (page - 1) * pageSize + 1 : 0;
                const to = (page - 1) * pageSize + rows.length;
                return `Showing ${from}-${to} of ${total ?? "…"}`;
              })()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={loading || page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-xs">
                Page {page}
                {total !== null
                  ? ` of ${Math.max(1, Math.ceil(total / pageSize))}`
                  : ""}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => {
                    if (total === null) return p + 1;
                    const last = Math.max(1, Math.ceil(total / pageSize));
                    return Math.min(last, p + 1);
                  })
                }
                disabled={
                  loading ||
                  (total !== null &&
                    page >= Math.max(1, Math.ceil(total / pageSize)))
                }
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Employee Details</DialogTitle>
          </DialogHeader>
          {viewLoading ? (
            <div className="space-y-3">
              <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="h-16 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-16 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-16 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-16 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
              </div>
            </div>
          ) : !detail ? (
            <div>No data</div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900 dark:text-white truncate">
                    {detail.company_name
                      ? detail.company_name
                      : [detail.first_name, detail.last_name]
                          .filter(Boolean)
                          .join(" ") || "-"}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {detail.email}
                  </div>
                </div>
                <button
                  className="ml-auto h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center"
                  onClick={() => setViewOpen(false)}
                  aria-label="Close"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    User ID
                  </div>
                  <div className="font-medium" title={detail.user_id}>
                    {detail.user_id ? String(detail.user_id).slice(-5) : "-"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div className="font-medium">{detail.email ?? "-"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Phone
                  </div>
                  <div className="font-medium">
                    {detail.phone_number ?? "-"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    State
                  </div>
                  <div className="font-medium">{detail.state ?? "-"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Created At
                  </div>
                  <div className="font-medium">
                    {detail.created_at
                      ? new Date(detail.created_at).toLocaleString()
                      : "-"}
                  </div>
                </div>
                {detail.company_name ? (
                  <div className="space-y-1 sm:col-span-2">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                      Company
                    </div>
                    <div className="font-medium">{detail.company_name}</div>
                  </div>
                ) : null}
                {detail.address ? (
                  <div className="space-y-1 sm:col-span-2">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                      Address
                    </div>
                    <div className="font-medium">{detail.address}</div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewOpen(false)}
              title="Close"
            >
              Close
            </Button>
            {detail ? (
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setDeleteTarget({ user_id: detail.user_id });
                  setDeleteOpen(true);
                }}
                title="Delete Account"
              >
                Delete Account
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <div className="text-sm">
            Are you sure you want to delete this account? This action cannot be
            undone.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (!deleteTarget) return;
                const res = await fetch("/api/admin/delete-user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ user_id: deleteTarget.user_id }),
                });
                if (!res.ok) {
                  let msg = "Failed to delete";
                  try {
                    const j = await res.json();
                    if (j?.error) msg = j.error;
                  } catch {}
                  alert(msg);
                  return;
                }
                setRows((prev) =>
                  prev.filter((row) => row.user_id !== deleteTarget.user_id),
                );
                setDeleteOpen(false);
                setDeleteTarget(null);
                setViewOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
