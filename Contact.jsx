import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { api } from "../../services/api";
import { budgets, services, site } from "../../data/site";
import { SplitWords } from "../Reveal";
import Button from "../Button";
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzco6MD-KfJ6ZVKt5UX7MaLET2S-JmnjmtDbHXkowBoC_up6eYj2cMQdvrlK3ZiJuMVEg/exec";

const empty = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

function Field({ id, label, as = "input", children, required, ...p }) {
  const Tag = as;
  return (
    <div className="group relative pt-5">
      <Tag
        id={id}
        name={id}
        required={required}
        placeholder=" "
        {...p}
        className={`field peer ${as === "textarea" ? "min-h-[110px] resize-none" : ""} ${as === "select" ? "appearance-none bg-ink" : ""}`}
      >
        {children}
      </Tag>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 top-8 origin-left text-white/45 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent-soft ${p.value ? "-translate-y-6 scale-75" : "peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"}`}
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const set = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      return setError("Please enter a valid email address.");
    if (form.message.trim().length < 10)
      return setError(
        "Tell us a little more about your project (at least 10 characters).",
      );
    setStatus("loading");
    try {
      if (form.website.trim()) return;

      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          budget: form.budget,
          description: form.message,
        }),
      });
      setStatus("success");
      setForm(empty);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const socials = site.socials.filter((s) => s.url);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-16 overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <h2
          id="contact-title"
          className="display text-[clamp(2.6rem,9.6vw,10rem)]"
        >
          <SplitWords text="Have an idea?" />
          <SplitWords
            text="Let's build it."
            className="block text-accent [filter:drop-shadow(0_0_34px_rgba(26,123,255,.4))]"
            delay={0.2}
          />
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
          <div className="space-y-6 text-white/60 lg:col-span-4">
            <p className="max-w-xs text-lg">
              Tell us about your project. We read every message and reply
              personally.
            </p>
            {(site.contact.email || site.contact.phone) && (
              <div className="space-y-1 text-bone">
                {site.contact.email && (
                  <a
                    className="u-link block"
                    href={`mailto:${site.contact.email}`}
                  >
                    {site.contact.email}
                  </a>
                )}
                {site.contact.phone && (
                  <a
                    className="u-link block"
                    href={`tel:${site.contact.phone}`}
                  >
                    {site.contact.phone}
                  </a>
                )}
              </div>
            )}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="relative lg:col-span-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="ok"
                  role="status"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass flex min-h-[460px] flex-col items-center justify-center rounded-3xl p-10 text-center"
                >
                  <motion.svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#1a7bff"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9 }}
                    />
                    <motion.path
                      d="M28 50 L42 63 L69 35"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    />
                  </motion.svg>
                  {[...Array(10)].map((_, k) => (
                    <motion.span
                      key={k}
                      aria-hidden="true"
                      className="absolute left-1/2 top-[38%] h-1.5 w-1.5 rounded-full bg-accent"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(k * 0.628) * 140,
                        y: Math.sin(k * 0.628) * 140,
                        opacity: 0,
                      }}
                      transition={{ delay: 1.2, duration: 1 }}
                    />
                  ))}
                  <h3 className="display mt-8 text-4xl md:text-5xl">
                    Message received
                  </h3>
                  <p className="mt-4 max-w-sm text-white/60">
                    Thanks for reaching out. We&apos;ll review your project and
                    get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="u-link mt-8 text-sm text-white/70"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-x-8 gap-y-3 md:grid-cols-2"
                >
                  <Field
                    id="name"
                    label="Name"
                    required
                    value={form.name}
                    onChange={set}
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set}
                    autoComplete="email"
                  />
                  <Field
                    id="phone"
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={set}
                    autoComplete="tel"
                  />
                  <Field
                    id="company"
                    label="Company"
                    value={form.company}
                    onChange={set}
                    autoComplete="organization"
                  />
                  <Field
                    id="service"
                    label="Service"
                    as="select"
                    value={form.service}
                    onChange={set}
                  >
                    <option value="" />
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </Field>
                  <Field
                    id="budget"
                    label="Budget"
                    as="select"
                    value={form.budget}
                    onChange={set}
                  >
                    <option value="" />
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Field>
                  <div className="md:col-span-2">
                    <Field
                      id="message"
                      label="Tell us about your project"
                      as="textarea"
                      required
                      value={form.message}
                      onChange={set}
                    />
                  </div>
                  {/* honeypot — hidden from people, bots fill it */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={set}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="mt-6 flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                    <Button type="submit" disabled={status === "loading"}>
                      {status === "loading"
                        ? "Sending…"
                        : "Start the Conversation"}
                    </Button>
                    {error && (
                      <p
                        role="alert"
                        className="flex items-center gap-2 text-sm text-red-400"
                      >
                        <AlertCircle size={16} />
                        {error}
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
