"use client";

import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { sendEmailAction } from "@/app/actions/send-email";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const templates: Record<string, string> = {
  "job-frontend": `Hi AperturePrism Team,

I'm interested in the Frontend Developer position.

About me:
- Name:
- Email:
- GitHub/Portfolio:

Experience:
-

Why I'm interested:
-

I'd love to discuss how I can contribute to your team.

Best regards,`,
  "job-backend": `Hi AperturePrism Team,

I'm interested in the Backend Developer position.

About me:
- Name:
- Email:
- GitHub/Portfolio:

Experience:
-

Why I'm interested:
-

I'd love to discuss how I can contribute to your team.

Best regards,`,
  "project": `Hi AperturePrism Team,

I'd like to discuss a potential project collaboration.

Project Overview:
-

Requirements:
-

Timeline:
-

Budget Range:
-

Looking forward to hearing from you.

Best regards,`,
  "general": `Hi AperturePrism Team,

I'd like to get in touch regarding.

Message:

Best regards,`,
};

export function ContactForm() {
  const t = useTranslations('Contact');
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(sendEmailAction, {
    success: false,
    message: "",
  });

  const templateKey = searchParams.get("template");
  const position = searchParams.get("position");
  const initialMessage = templateKey === "job" && position
    ? templates[`job-${position}`] || templates["general"]
    : templateKey && templates[templateKey]
      ? templates[templateKey]
      : "";

  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    if (templateKey) {
      const msg = templateKey === "job" && position
        ? templates[`job-${position}`] || templates["general"]
        : templates[templateKey] || templates["general"];
      setMessage(msg);
    }
  }, [templateKey, position]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">{t('form.firstName')}</label>
          <input
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            placeholder={t('form.placeholders.firstName')}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">{t('form.lastName')}</label>
          <input
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            placeholder={t('form.placeholders.lastName')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">{t('form.email')}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          placeholder={t('form.placeholders.email')}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="text-sm font-medium">{t('form.message')}</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMessage(templates["job-frontend"])}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              职位申请
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              type="button"
              onClick={() => setMessage(templates["project"])}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              项目咨询
            </button>
          </div>
        </div>
        <textarea
          id="message"
          name="message"
          rows={10}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none font-mono text-sm"
          placeholder={t('form.placeholders.message')}
        />
      </div>

      {state.message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${state.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {state.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="glass-button-primary w-full md:w-auto font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          t('form.submit')
        )}
      </button>
    </form>
  );
}
