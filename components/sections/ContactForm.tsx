"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  isValidEmail,
  sendContactMessage,
  type ContactPayload,
} from "@/lib/contact";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

type FieldName = keyof ContactPayload;
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY_VALUES: ContactPayload = { name: "", email: "", message: "" };

const FIELD_CLASSES =
  "w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted transition-colors focus:border-accent";

const inputClasses = (hasError: boolean): string =>
  cn(FIELD_CLASSES, hasError ? "border-red-500" : "border-border");

interface FieldErrorProps {
  id: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const { t } = useLanguage();
  const baseId = useId();
  const form = t.contact.form;

  const [values, setValues] = useState<ContactPayload>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const ids = {
    name: `${baseId}-name`,
    email: `${baseId}-email`,
    message: `${baseId}-message`,
  };

  const validate = (data: ContactPayload): FormErrors => {
    const result: FormErrors = {};

    if (!data.name) {
      result.name = form.required;
    }
    if (!data.email) {
      result.email = form.required;
    } else if (!isValidEmail(data.email)) {
      result.email = form.invalidEmail;
    }
    if (!data.message) {
      result.message = form.required;
    }

    return result;
  };

  const handleChange =
    (field: FieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setStatus((current) => (current === "sending" ? current : "idle"));
    };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const trimmed: ContactPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    const foundErrors = validate(trimmed);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const result = await sendContactMessage(trimmed, form.subject);
      if (result.ok) {
        setStatus("success");
        setValues(EMPTY_VALUES);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className="space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <label htmlFor={ids.name} className="mb-2 block text-sm font-medium">
          {form.name}
        </label>
        <input
          id={ids.name}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder={form.namePlaceholder}
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${ids.name}-error` : undefined}
          className={inputClasses(Boolean(errors.name))}
        />
        <FieldError id={`${ids.name}-error`} message={errors.name} />
      </div>

      <div>
        <label htmlFor={ids.email} className="mb-2 block text-sm font-medium">
          {form.email}
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange("email")}
          placeholder={form.emailPlaceholder}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
          className={inputClasses(Boolean(errors.email))}
        />
        <FieldError id={`${ids.email}-error`} message={errors.email} />
      </div>

      <div>
        <label htmlFor={ids.message} className="mb-2 block text-sm font-medium">
          {form.message}
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          placeholder={form.messagePlaceholder}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          className={cn(inputClasses(Boolean(errors.message)), "min-h-32 resize-y")}
        />
        <FieldError id={`${ids.message}-error`} message={errors.message} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          icon="lucide:send"
          disabled={isSending}
          className="w-full sm:w-auto"
        >
          {isSending ? form.sending : form.send}
        </Button>

        <div role="status" aria-live="polite" className="text-sm">
          {status === "success" ? (
            <p className="text-accent">{form.success}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-red-600 dark:text-red-400">{form.error}</p>
          ) : null}
        </div>
      </div>
    </form>
  );
}