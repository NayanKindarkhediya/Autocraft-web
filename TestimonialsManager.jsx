import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import {
  ConfirmModal,
  Empty,
  ErrorBox,
  Input,
  Modal,
  Select,
  Spinner,
  Textarea,
  btn,
  useLoad,
  useToast,
} from "./ui";

const blank = {
  name: "",
  role: "",
  company: "",
  message: "",
  rating: 5,
  image: "",
};

function TForm({ initial, onSaved, onClose }) {
  const [f, setF] = useState({ ...blank, ...initial });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const toast = useToast();
  const set = (e) => setF((s) => ({ ...s, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const payload = {
        name: f.name,
        role: f.role,
        company: f.company,
        message: f.message,
        rating: Number(f.rating),
        image: f.image,
      };
      initial._id
        ? await api.testimonials.update(initial._id, payload)
        : await api.testimonials.create(payload);
      toast(initial._id ? "Testimonial updated" : "Testimonial added");
      onSaved();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      title={initial._id ? "Edit testimonial" : "New testimonial"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Name *"
          name="name"
          required
          value={f.name}
          onChange={set}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Role" name="role" value={f.role} onChange={set} />
          <Input
            label="Company"
            name="company"
            value={f.company}
            onChange={set}
          />
        </div>
        <Textarea
          label="Message *"
          name="message"
          required
          rows={4}
          maxLength={800}
          value={f.message}
          onChange={set}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Rating" name="rating" value={f.rating} onChange={set}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </Select>
          <Input
            label="Photo (optional)"
            name="image"
            value={f.image}
            onChange={set}
            hint="Path or https:// URL"
          />
        </div>
        {err && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200"
          >
            {err}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className={btn.ghost}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={btn.primary}>
            {busy && <Loader2 size={14} className="animate-spin" />}Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function TestimonialsManager() {
  const { data, loading, error, reload, setData } = useLoad(
    () => api.testimonials.list(),
    [],
  );
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const remove = async () => {
    setBusy(true);
    try {
      await api.testimonials.remove(deleting._id);
      setData(data.filter((x) => x._id !== deleting._id));
      toast("Testimonial deleted");
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
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          className={btn.primary}
          onClick={() => setEditing({})}
        >
          <Plus size={16} /> New testimonial
        </button>
      </div>
      {data.length === 0 ? (
        <Empty
          title="No testimonials yet"
          hint="The website shows clearly-labelled sample testimonials until you add real ones."
        >
          <button
            type="button"
            className={btn.primary}
            onClick={() => setEditing({})}
          >
            <Plus size={14} /> Add testimonial
          </button>
        </Empty>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {data.map((t) => (
            <li
              key={t._id}
              className="flex flex-col rounded-2xl border border-white/10 bg-panel p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/80">
                “{t.message}”
              </p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.name}</p>
                  <p className="truncate text-xs text-white/45">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Edit testimonial"
                    onClick={() => setEditing(t)}
                    className={btn.icon}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete testimonial"
                    onClick={() => setDeleting(t)}
                    className={`${btn.icon} hover:!bg-red-600/30`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence>
        {editing && (
          <TForm
            key={editing._id || "new"}
            initial={editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              reload();
            }}
          />
        )}
        {deleting && (
          <ConfirmModal
            message={`Delete the testimonial from ${deleting.name}?`}
            busy={busy}
            onConfirm={remove}
            onCancel={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
