"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function RecruitmentPage() {
  const [staff, setStaff] = useState<
    Array<{
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string | null;
      state: string | null;
      role: string | null;
      created_at: string | null;
      verified: boolean | null;
      status: boolean | null;
    }>
  >([]);
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
  const CACHE_PREFIX = "recruitment_cache_v1";
  const CACHE_TTL_MS = 5 * 60 * 1000;
  const pageKey = (p: number) => `${CACHE_PREFIX}:p:${p}`;
  const loadFromCache = (p: number) => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(pageKey(p)) : null;
      if (!raw) return null;
      const j = JSON.parse(raw);
      if (!j || typeof j.ts !== "number") return null;
      if (Date.now() - j.ts > CACHE_TTL_MS) return null;
      return { data: j.data ?? [], total: j.total ?? null };
    } catch {
      return null;
    }
  };
  const saveToCache = (p: number, data: any[], totalVal: number | null) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(
        pageKey(p),
        JSON.stringify({ data, total: totalVal, ts: Date.now() }),
      );
    } catch {}
  };
  const clearCache = () => {
    try {
      if (typeof window === "undefined") return;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      }
    } catch {}
  };
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
    const run = async () => {
      const cached = loadFromCache(page);
      if (cached && Array.isArray(cached.data) && cached.data.length) {
        setStaff(cached.data);
        setTotal(cached.total ?? null);
        setLoading(false);
      } else {
        setLoading(true);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      try {
        const { data, count, error } = await supabase
          .from("staff_profile")
          .select(
            "user_id, first_name, last_name, email, phone_number, state, role, created_at, verified, status",
            { count: "exact" },
          )
          .order("created_at", { ascending: false })
          .range(from, to);
        if (!mounted) return;
        if (error) throw error;
        setStaff(data ?? []);
        setTotal(typeof count === "number" ? count : null);
        saveToCache(
          page,
          (data as any[]) ?? [],
          typeof count === "number" ? count : null,
        );
        setLoading(false);
      } catch {
        if (!mounted) return;
        setStaff([]);
        setTotal(null);
        setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [page, pageSize]);
  return (
    <div className="min-w-0 overflow-x-hidden">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Staff Profiles</CardTitle>
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
                  <th className="px-3 py-2 text-left font-medium">Role</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Verified</th>
                  <th className="px-3 py-2 text-left font-medium">Created</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td className="px-3 py-3" colSpan={11}>
                      Loading...
                    </td>
                  </tr>
                ) : staff.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3" colSpan={11}>
                      No staff found
                    </td>
                  </tr>
                ) : (
                  staff.map((s, idx) => (
                    <tr
                      key={s.user_id}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-900/60"
                    >
                      <td className="px-3 py-2">
                        {idx + 1 + (page - 1) * pageSize}
                      </td>
                      <td className="px-3 py-2">
                        {s.user_id ? s.user_id.slice(-5) : "-"}
                      </td>
                      <td className="px-3 py-2">
                        {s.first_name} {s.last_name}
                      </td>
                      <td className="px-3 py-2">{s.email}</td>
                      <td className="px-3 py-2">{s.phone_number ?? "-"}</td>
                      <td className="px-3 py-2">{s.state ?? "-"}</td>
                      <td className="px-3 py-2">{s.role ?? "-"}</td>
                      <td className="px-3 py-2">
                        {(() => {
                          const available = s.status !== false;
                          return (
                            <Badge
                              className={
                                (available
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                                " border-transparent"
                              }
                            >
                              {available ? "Avaliable" : "Unavaliable"}
                            </Badge>
                          );
                        })()}
                      </td>
                      <td className="px-3 py-2">
                        <Badge
                          className={
                            s.verified
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {s.verified ? "Verified" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-3 py-2">
                        {s.created_at
                          ? new Date(s.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2">
                        <div
                          className="relative inline-block text-left"
                          ref={menuOpenId === s.user_id ? menuRef : null}
                        >
                          <Button
                            size="icon"
                            variant="outline"
                            aria-label="Actions"
                            onClick={() =>
                              setMenuOpenId((id) =>
                                id === s.user_id ? null : s.user_id,
                              )
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          {menuOpenId === s.user_id ? (
                            <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                              <button
                                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                onClick={async () => {
                                  setMenuOpenId(null);
                                  setViewLoading(true);
                                  setDetail(null);
                                  setViewOpen(true);
                                  const { data } = await supabase
                                    .from("staff_profile")
                                    .select("*")
                                    .eq("user_id", s.user_id)
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
                                  setDeleteTarget({ user_id: s.user_id });
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
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-2 py-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {(() => {
                const from = staff.length ? (page - 1) * pageSize + 1 : 0;
                const to = (page - 1) * pageSize + staff.length;
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
            <DialogTitle className="text-base">Staff Details</DialogTitle>
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
                {detail.profile_image ? (
                  <img
                    src={detail.profile_image}
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                )}
                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900 dark:text-white truncate">
                    {detail.first_name} {detail.last_name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {detail.email}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      className={
                        (detail.status !== false
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                        " border-transparent text-xs px-2 py-0.5"
                      }
                    >
                      {detail.status !== false ? "Avaliable" : "Unavaliable"}
                    </Badge>
                    <Badge
                      className={
                        (detail.verified
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                        " border-transparent text-xs px-2 py-0.5"
                      }
                    >
                      {detail.verified ? "Verified" : "Pending"}
                    </Badge>
                    {detail.role ? (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-transparent text-xs px-2 py-0.5">
                        {detail.role}
                      </Badge>
                    ) : null}
                    {detail.state ? (
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-transparent text-xs px-2 py-0.5">
                        {detail.state}
                      </Badge>
                    ) : null}
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
                    {detail.user_id ? detail.user_id.slice(-5) : "-"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Email Verified
                  </div>
                  <div className="font-medium">
                    {detail.email_verified ? "Yes" : "No"}
                  </div>
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
                    Created At
                  </div>
                  <div className="font-medium">
                    {detail.created_at
                      ? new Date(detail.created_at).toLocaleString()
                      : "-"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Updated At
                  </div>
                  <div className="font-medium">
                    {detail.updated_at
                      ? new Date(detail.updated_at).toLocaleString()
                      : "-"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Vet Fee
                  </div>
                  <div className="font-medium">
                    {detail.vet_fee ? "Yes" : "No"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    DOB
                  </div>
                  <div className="font-medium">{detail.dob ?? "-"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Address
                  </div>
                  <div className="font-medium">{detail.address ?? "-"}</div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Verification Checks
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        NIN
                      </span>
                      <Badge
                        className={
                          (detail.ninpass
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                          " border-transparent text-xs px-2 py-0.5"
                        }
                      >
                        {detail.ninpass ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID
                      </span>
                      <Badge
                        className={
                          (detail.idpass
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                          " border-transparent text-xs px-2 py-0.5"
                        }
                      >
                        {detail.idpass ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Face
                      </span>
                      <Badge
                        className={
                          (detail.facepass
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300") +
                          " border-transparent text-xs px-2 py-0.5"
                        }
                      >
                        {detail.facepass ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                        Salary
                      </div>
                      <div className="font-medium">
                        {detail.salary_range ?? "-"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                        Experience
                      </div>
                      <div className="font-medium">
                        {detail.experience ?? "-"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                        Rating
                      </div>
                      <div className="font-medium">{detail.rating ?? "-"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                        Location
                      </div>
                      <div className="font-medium">
                        {detail.preferred_work_location ?? "-"}
                      </div>
                    </div>
                  </div>
                </div>
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
                setStaff((prev) =>
                  prev.filter((row) => row.user_id !== deleteTarget.user_id),
                );
                clearCache();
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
