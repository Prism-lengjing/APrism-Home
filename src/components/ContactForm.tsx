"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { sendEmailAction } from "@/app/actions/send-email";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations('Contact');
  const [state, formAction, isPending] = useActionState(sendEmailAction, {
    success: false,
    message: "",
  });

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
        <label htmlFor="message" className="text-sm font-medium">{t('form.message')}</label>
        <textarea 
          id="message" 
          name="message" 
          rows={6} 
          required
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none" 
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
