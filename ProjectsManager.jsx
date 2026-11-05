import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Download, Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import { projects as sampleProjects } from "../../data/projects";
import { resetProjectsCache } from "../../hooks/useProjects";
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
  title: "",
  slug: "",
  category: "",
  year: String(new Date().getFullYear()),
  description: "",
  overview: "",
  challenge: "",
  solution: "",
  image: "",
  liveUrl: "",
  featured: false,
  features: "",
  results: "",
  gallery: "",
  technologies: "",
};
const lines = (a) => (Array.isArray(a) ? a.join("\n") : "");
const toForm = (p) => ({
  ...blank,
  ...p,
  features: lines(p.features),
  results: lines(p.results),
  gallery: lines(p.gallery),
  technologies: (p.technologies || []).join(", "),
});
const toPayload = (f) => ({
  ...f,
  features: f.features
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
  results: f.results
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
  gallery: f.gallery
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
  technologies: f.technologies
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
});

function ProjectForm({ initial, onSaved, onClose }) {
  const [f, setF] = useState(toForm(initial));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const toast = useToast();
  const set = (e) =>
    setF((s) => ({
      ...s,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const payload = toPayload(f);
      const saved = initial._id
        ? await api.projects.update(initial._id, payload)
        : await api.projects.create(payload);
      resetProjectsCache();
      toast(initial._id ? "Project updated" : "Project created");
      onSaved(saved);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      title={initial._id ? "Edit project" : "New project"}
      onClose={onClose}
      wide
    >
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Title *"
          name="title"
          required
          value={f.title}
          onChange={set}
        />
        <Input
          label="Slug"
          name="slug"
          value={f.slug}
          onChange={set}
          hint="Leave empty to generate from the title (used in /work/slug)"
        />
        <Input
          label="Category *"
          name="category"
          required
          value={f.category}
          onChange={set}
        />
        <Input label="Year" name="year" value={f.year} onChange={set} />
        <div className="sm:col-span-2">
          <Textarea
            label="Short description *"
            name="description"
            required
            value={f.description}
            onChange={set}
            rows={2}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Main image *"
            name="image"
            required
            value={f.image}
            onChange={set}
            hint="Path like /images/projects/my-project.png (file in frontend/public) or a full https:// URL"
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Gallery images"
            name="gallery"
            value={f.gallery}
            onChange={set}
            hint="One path or URL per line"
          />
        </div>
        <Input
          label="Technologies"
          name="technologies"
          value={f.technologies}
          onChange={set}
          hint="Comma separated"
        />
        <Input
          label="Live URL"
          name="liveUrl"
          type="url"
          value={f.liveUrl}
          onChange={set}
          hint="Leave empty to hide the button"
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Overview"
            name="overview"
            value={f.overview}
            onChange={set}
          />
        </div>
        <Textarea
          label="Challenge"
          name="challenge"
          value={f.challenge}
          onChange={set}
        />
        <Textarea
          label="Solution"
          name="solution"
          value={f.solution}
          onChange={set}
        />
        <Textarea
          label="Features"
          name="features"
          value={f.features}
          onChange={set}
          rows={4}
          hint="One per line"
        />
        <Textarea
          label="Results"
          name="results"
          value={f.results}
          onChange={set}
          rows={4}
          hint="One per line"
        />
        <label className="flex items-center gap-3 text-sm sm:col-span-2">
          <input
            type="checkbox"
            name="featured"
            checked={f.featured}
            onChange={set}
            className="h-4 w-4 accent-[#1a7bff]"
          />{" "}
          Featured project
        </label>
        {err && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200 sm:col-span-2"
          >
            {err}
          </p>
        )}
        <div className="flex justify-end gap-3 sm:col-span-2">
          <button type="button" onClick={onClose} className={btn.ghost}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={btn.primary}>
            {busy && <Loader2 size={14} className="animate-spin" />}Save project
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function ProjectsManager() {
  const { data, loading, error, reload, setData } = useLoad(
    () => api.projects.list(),
    [],
  );
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const toggleFeatured = async (p) => {
    try {
      const u = await api.projects.update(p._id, { featured: !p.featured });
      setData(data.map((x) => (x._id === p._id ? u : x)));
      resetProjectsCache();
      toast(u.featured ? "Marked as featured" : "Removed from featured");
    } catch (e) {
      toast(e.message, "error");
    }
  };
  const remove = async () => {
    setBusy(true);
    try {
      await api.projects.remove(deleting._id);
      setData(data.filter((x) => x._id !== deleting._id));
      resetProjectsCache();
      toast("Project deleted");
      setDeleting(null);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };
  const importSamples = async () => {
    setBusy(true);
    try {
      for (const [i, p] of sampleProjects.entries())
        await api.projects.create({ ...p, order: i });
      resetProjectsCache();
      toast("Sample projects imported");
      reload();
    } catch (e) {
      toast(e.message, "error");
      reload();
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
          <Plus size={16} /> New project
        </button>
      </div>
      {data.length === 0 ? (
        <Empty
          title="No projects in the database yet"
          hint="The website is currently showing the sample projects from src/data/projects.js. Import them to edit here, or create your own."
        >
          <button
            type="button"
            className={btn.ghost}
            onClick={importSamples}
            disabled={busy}
          >
            {busy ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            Import sample projects
          </button>
          <button
            type="button"
            className={btn.primary}
            onClick={() => setEditing({})}
          >
            <Plus size={14} /> New project
          </button>
        </Empty>
      ) : (
        <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-panel">
          {data.map((p) => (
            <li key={p._id} className="flex flex-wrap items-center gap-4 p-4">
              <img
                src={p.image}
                alt=""
                className="h-14 w-24 rounded-lg bg-coal object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title}</p>
                <p className="truncate text-xs text-white/45">
                  {p.category} · {p.year} · /work/{p.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={
                    p.featured ? "Unfeature project" : "Feature project"
                  }
                  aria-pressed={p.featured}
                  onClick={() => toggleFeatured(p)}
                  className={btn.icon}
                >
                  <Star
                    size={16}
                    className={
                      p.featured ? "fill-amber-400 text-amber-400" : ""
                    }
                  />
                </button>
                <button
                  type="button"
                  aria-label="Edit project"
                  onClick={() => setEditing(p)}
                  className={btn.icon}
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Delete project"
                  onClick={() => setDeleting(p)}
                  className={`${btn.icon} hover:!bg-red-600/30`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence>
        {editing && (
          <ProjectForm
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
            message={`Delete “${deleting.title}”? This cannot be undone.`}
            busy={busy}
            onConfirm={remove}
            onCancel={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
