import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Search, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import {
  Badge,
  ConfirmModal,
  Empty,
  ErrorBox,
  STATUSES,
  Spinner,
  btn,
  fmtDate,
  useLoad,
  useToast,
} from "./ui";

export default function InquiriesManager() {
  const { data, loading, error, reload, setData } = useLoad(
    () => api.inquiries.list(),
    [],
  );
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const counts = useMemo(
    () =>
      (data || []).reduce(
        (a, i) => ({ ...a, [i.status]: (a[i.status] || 0) + 1 }),
        {},
      ),
    [data],
  );
  const shown = useMemo(
    () =>
      (data || []).filter(
        (i) =>
          (filter === "All" || i.status === filter) &&
          (!q ||
            `${i.name} ${i.email} ${i.company} ${i.message}`
              .toLowerCase()
              .includes(q.toLowerCase())),
      ),
    [data, filter, q],
  );

  const setStatus = async (i, status) => {
    try {
      const u = await api.inquiries.update(i._id, { status });
      setData(data.map((x) => (x._id === i._id ? u : x)));
      toast(`Marked as ${status}`);
    } catch (e) {
      toast(e.message, "error");
    }
  };
  const remove = async () => {
    setBusy(true);
    try {
      await api.inquiries.remove(deleting._id);
      setData(data.filter((x) => x._id !== deleting._id));
      toast("Inquiry deleted");
      setDeleting(null);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="scroll-hide flex gap-2 overflow-x-auto"
          role="tablist"
          aria-label="Filter by status"
        >
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={filter === s}
              onClick={() => setFilter(s)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${filter === s ? "border-accent bg-accent/15 text-accent-soft" : "border-white/10 text-white/60 hover:border-white/30"}`}
            >
              {s}{" "}
              <span className="ml-1 text-xs opacity-60">
                {s === "All" ? data.length : counts[s] || 0}
              </span>
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inquiries"
            aria-label="Search inquiries"
            className="w-full rounded-lg border border-white/10 bg-panel py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      {shown.length === 0 ? (
        <Empty
          title={
            data.length ? "No inquiries match this filter" : "No inquiries yet"
          }
          hint={
            data.length
              ? "Try another status or clear the search."
              : "Messages sent from the website contact form will appear here."
          }
        />
      ) : (
        <ul className="space-y-3">
          {shown.map((i) => {
            const isOpen = open === i._id;
            return (
              <li
                key={i._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-panel"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i._id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {i.name}
                      {i.company && (
                        <span className="text-white/40"> · {i.company}</span>
                      )}
                    </p>
                    <p className="truncate text-sm text-white/50">
                      {i.message}
                    </p>
                  </div>
                  <span className="hidden text-xs text-white/40 sm:block">
                    {fmtDate(i.createdAt)}
                  </span>
                  <Badge status={i.status} />
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/40 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-5 border-t border-white/10 px-5 py-5">
                        <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            ["Email", i.email],
                            ["Phone", i.phone],
                            ["Service", i.service],
                            ["Budget", i.budget],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="text-xs text-white/40">{k}</dt>
                              <dd className="mt-1 break-words">{v || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="whitespace-pre-wrap rounded-xl bg-ink p-4 text-sm leading-relaxed text-white/80">
                          {i.message}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="flex items-center gap-2 text-sm text-white/60">
                            Status
                            <select
                              value={i.status}
                              onChange={(e) => setStatus(i, e.target.value)}
                              className="rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-accent"
                            >
                              {STATUSES.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </label>
                          <a
                            href={`mailto:${i.email}?subject=${encodeURIComponent("Re: your enquiry to AutoCraft Web")}`}
                            className={btn.ghost}
                          >
                            <Mail size={15} /> Reply by email
                          </a>
                          <button
                            type="button"
                            onClick={() => setDeleting(i)}
                            className={`${btn.ghost} ml-auto hover:!bg-red-600/20`}
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
      <AnimatePresence>
        {deleting && (
          <ConfirmModal
            message={`Delete the inquiry from ${deleting.name}? This cannot be undone.`}
            busy={busy}
            onConfirm={remove}
            onCancel={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
