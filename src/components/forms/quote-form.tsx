"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Hammer, Home, Bath,
  CookingPot, Layers, Landmark, Blocks, HardHat, Compass,
} from "lucide-react";
import { inputCls, labelCls, FieldError } from "@/components/ui";
import { cn } from "@/lib/utils";

const schema = z.object({
  projectType: z.string().min(1, "Choose a project type"),
  budget: z.string().min(1, "Choose a budget range"),
  timeline: z.string().min(1, "Choose a timeline"),
  city: z.string().min(2, "Tell us the project city"),
  name: z.string().min(2, "Your name, please"),
  email: z.string().email("A valid email helps us reply"),
  phone: z.string().optional(),
  preferredContact: z.string().optional(),
  message: z.string().max(4000).optional(),
  emailOptIn: z.boolean().optional(),
  website: z.string().optional(), // honeypot — bots fill, humans never see
});

type Values = z.infer<typeof schema>;

const PROJECT_TYPES = [
  { id: "kitchen", label: "Kitchen Remodel", icon: CookingPot },
  { id: "bathroom", label: "Bathroom Remodel", icon: Bath },
  { id: "addition", label: "Addition / ADU", icon: Home },
  { id: "basement", label: "Basement", icon: Layers },
  { id: "foundation", label: "Foundation / Seismic", icon: Landmark },
  { id: "whole-home", label: "Whole-Home Remodel", icon: Blocks },
  { id: "new-build", label: "New Build / Estate", icon: HardHat },
  { id: "other", label: "Something Else", icon: Compass },
];

const BUDGETS = [
  "Under $50k", "$50k – $100k", "$100k – $250k", "$250k – $500k",
  "$500k+", "Not sure yet",
];
const TIMELINES = [
  "ASAP", "1–3 months", "3–6 months", "6–12 months", "Just planning",
];

const STEPS = ["Project", "Scope", "You"] as const;

export function QuoteForm({ source = "contact" }: { source?: string }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "email", emailOptIn: false },
  });

  const projectType = watch("projectType");
  const budget = watch("budget");
  const timeline = watch("timeline");

  function pick(field: "projectType" | "budget" | "timeline", value: string) {
    setValue(field, value, { shouldValidate: true });
    window.bctrack?.("form_start", { form: "quote", field });
  }

  async function next() {
    const fields: (keyof Values)[][] = [
      ["projectType"],
      ["budget", "timeline", "city"],
      ["name", "email"],
    ];
    if (await trigger(fields[step])) setStep((s) => Math.min(s + 1, 2));
  }

  async function onSubmit(values: Values) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "quote", source, ...values }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.bctrack?.("lead", { kind: "quote", projectType: values.projectType });
      window.bctrack?.("form_submit", { form: "quote" });
      setDone(true);
    } catch {
      setServerError("Something went wrong sending your request. Please email us directly at atbbrady@yahoo.com — we apologize.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-brass/40 bg-cream p-10 text-center shadow-[var(--shadow-card)]"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brass/15">
          <CheckCircle2 className="h-8 w-8 text-brass-deep" />
        </span>
        <h3 className="display mt-6 text-3xl font-medium text-ink">
          Thank you, {watch("name").split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/65">
          Your project details are on their way to Patrick. Expect a personal
          reply — usually within one business day. Meetings are by appointment.
        </p>
        <a
          href="/work"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brass-deep hover:text-ink"
        >
          Browse our work while you wait <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-3xl border border-ink/10 bg-cream p-6 shadow-[var(--shadow-card)] sm:p-10"
    >
      {/* Honeypot — hidden from humans, bots fill it */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">
          {STEPS.map((label, i) => (
            <span key={label} className={cn(i <= step && "text-brass-deep")}>
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/8">
          <motion.div
            className="h-full bg-brass"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.fieldset
            key="s0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
          >
            <legend className="display mb-1 text-2xl font-medium text-ink">
              What are you dreaming up?
            </legend>
            <p className="mb-6 text-sm text-ink/55">
              Pick the closest fit — we&apos;ll dig into details together.
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {PROJECT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pick("projectType", t.id)}
                  className={cn(
                    "flex flex-col items-center gap-2.5 rounded-2xl border px-3 py-5 text-center transition-all",
                    projectType === t.id
                      ? "border-brass bg-brass/10 shadow-sm"
                      : "border-ink/12 bg-bone hover:border-ink/30"
                  )}
                >
                  <t.icon className={cn("h-6 w-6", projectType === t.id ? "text-brass-deep" : "text-ink/45")} />
                  <span className="text-[12.5px] font-semibold leading-tight text-ink">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
            <FieldError>{errors.projectType?.message}</FieldError>
          </motion.fieldset>
        )}

        {step === 1 && (
          <motion.fieldset
            key="s1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="space-y-7"
          >
            <legend className="display mb-1 text-2xl font-medium text-ink">
              Scope &amp; budget
            </legend>
            <div>
              <span className={labelCls}>Budget range</span>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => pick("budget", b)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[13px] font-medium transition-all",
                      budget === b
                        ? "border-brass bg-brass text-ink"
                        : "border-ink/15 bg-bone text-ink/70 hover:border-ink/35"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <FieldError>{errors.budget?.message}</FieldError>
            </div>
            <div>
              <span className={labelCls}>Timeline</span>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => pick("timeline", t)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[13px] font-medium transition-all",
                      timeline === t
                        ? "border-brass bg-brass text-ink"
                        : "border-ink/15 bg-bone text-ink/70 hover:border-ink/35"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <FieldError>{errors.timeline?.message}</FieldError>
            </div>
            <div>
              <label htmlFor="city" className={labelCls}>Project city</label>
              <input
                id="city"
                {...register("city")}
                placeholder="Sonoma, Woodside, San Rafael…"
                className={inputCls}
              />
              <FieldError>{errors.city?.message}</FieldError>
            </div>
          </motion.fieldset>
        )}

        {step === 2 && (
          <motion.fieldset
            key="s2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            <legend className="display mb-1 text-2xl font-medium text-ink">
              Almost done — how do we reach you?
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelCls}>Name</label>
                <input id="name" {...register("name")} placeholder="Your name" className={inputCls} />
                <FieldError>{errors.name?.message}</FieldError>
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Email</label>
                <input id="email" type="email" {...register("email")} placeholder="you@email.com" className={inputCls} />
                <FieldError>{errors.email?.message}</FieldError>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={labelCls}>Phone <span className="normal-case tracking-normal text-ink/40">(optional)</span></label>
                <input id="phone" type="tel" {...register("phone")} placeholder="(707) 555-0123" className={inputCls} />
              </div>
              <div>
                <span className={labelCls}>Preferred contact</span>
                <div className="flex gap-2">
                  {["email", "phone"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setValue("preferredContact", m)}
                      className={cn(
                        "flex-1 rounded-lg border px-4 py-3 text-sm font-medium capitalize transition-all",
                        watch("preferredContact") === m
                          ? "border-brass bg-brass/10 text-ink"
                          : "border-ink/15 text-ink/60"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelCls}>
                Tell us about the project <span className="normal-case tracking-normal text-ink/40">(optional)</span>
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                placeholder="Ideas, must-haves, links to plans or inspiration…"
                className={cn(inputCls, "resize-none")}
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-[13px] text-ink/60">
              <input type="checkbox" {...register("emailOptIn")} className="mt-0.5 h-4 w-4 accent-brass" />
              Send me occasional remodeling guides and project updates by email.
            </label>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <div className="mt-9 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-bone transition-all hover:bg-coal active:scale-[0.98]"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-brass px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-brass-bright active:scale-[0.98] disabled:opacity-60"
          >
            <Hammer className="h-4 w-4" />
            {submitting ? "Sending…" : "Request My Quote"}
          </button>
        )}
      </div>
      {serverError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-800">{serverError}</p>
      )}
      <p className="mt-5 text-center text-[12px] text-ink/45">
        No spam, no pressure. Your details go straight to Patrick — that&apos;s it.
      </p>
    </form>
  );
}
