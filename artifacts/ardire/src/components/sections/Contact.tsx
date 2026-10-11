import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const SERVICE_OPTIONS = [
  { value: "luxury-tours", label: "Luxury Tours" },
  { value: "golf-tours", label: "Golf Tours" },
  { value: "private-chauffeur", label: "Private Chauffeur" },
  { value: "self-guided-tours", label: "Self-Guided Tours" },
  { value: "concierge", label: "Concierge" },
  { value: "corporate-incentives", label: "Corporate Incentives" },
  { value: "event-management", label: "Event Management" },
  { value: "event-staffing", label: "Event Staffing" },
  { value: "other", label: "Other / General" },
] as const;

const EMAIL_FALLBACK = "Please try again, or email us directly at enquiries@ardire.co.uk";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const loadTimeRef = useRef(Date.now());
  const successRef = useRef<HTMLHeadingElement>(null);

  // Submitting unmounts the whole form, so focus would otherwise fall back to
  // the body and a keyboard user would lose their place with no confirmation.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", service: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Both guards used to return silently, so the button appeared dead and the
    // visitor had no idea why. A genuine person caught by either needs telling.
    if (honeypotRef.current?.value) {
      setSubmitError(EMAIL_FALLBACK);
      return;
    }
    if (Date.now() - loadTimeRef.current < 3000) {
      setSubmitError("Just a moment — please press Submit once more.");
      loadTimeRef.current = 0;
      return;
    }

    const serviceLabel =
      SERVICE_OPTIONS.find((o) => o.value === values.service)?.label ?? values.service;

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
      if (!accessKey) {
        throw new Error("Form not yet configured — please email us directly at enquiries@ardire.co.uk");
      }

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("from_name", "Árdíre Website");
      formData.append("subject", `New Enquiry: ${serviceLabel} — ${values.name}`);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", `Area of Interest: ${serviceLabel}\n\n${values.message}`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json() as { success: boolean; message?: string };
      if (!data.success) throw new Error(data.message || "Submission failed");

      setSubmitted(true);
      setSubmitError(null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Please try again or email us directly.");
    }
  }

  return (
    <section id="enquiry" className="py-16 md:py-32 bg-background relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Begin Your <span className="italic text-primary">Journey</span>
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-12 max-w-md">
              Allow us to craft an experience that surpasses expectation. Share your initial thoughts and our team will be in touch to arrange a private consultation.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Based In</h3>
                <p className="font-display text-lg text-foreground">The ÁrdÍre Group</p>
                <p className="text-muted-foreground font-sans mt-1">Glasgow, Scotland</p>
              </div>
              <div>
                <h3 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Direct Enquiries</h3>
                <a href="mailto:enquiries@ardire.co.uk" className="font-display text-lg text-foreground hover:text-primary transition-colors block">
                  enquiries@ardire.co.uk
                </a>
              </div>
              <div>
                <h3 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Telephone</h3>
                <a href="tel:+441412550796" className="font-display text-lg text-foreground hover:text-primary transition-colors">
                  +44 (0)141 255 0796
                </a>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card p-8 md:p-10 border border-border/50"
          >
            {submitted ? (
              <div role="status" aria-live="polite" className="flex flex-col items-start justify-center h-full min-h-[360px] space-y-6">
                <div className="w-10 h-px bg-primary" />
                <h3 ref={successRef} tabIndex={-1} className="font-display text-2xl text-foreground outline-none">
                  Enquiry Received
                </h3>
                <p className="text-muted-foreground font-sans font-light text-base leading-relaxed max-w-sm">
                  Thank you for reaching out. Our team will be in touch within 24 hours to arrange a private consultation.
                </p>
                <button
                  onClick={() => { setSubmitted(false); form.reset(); loadTimeRef.current = Date.now(); }}
                  className="font-sans text-xs tracking-widest uppercase text-primary hover:text-primary/70 transition-colors underline-offset-4 hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Full Name</FormLabel>
                          <FormControl>
                            <Input autoComplete="name" placeholder="Your name..." className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Area of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/50 rounded-none focus:ring-primary h-12">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border rounded-none">
                            {SERVICE_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Your Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about what you have in mind..."
                            className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <p role="alert" className="text-destructive font-sans text-sm">{submitError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs h-14 rounded-none transition-all duration-300 disabled:opacity-60"
                  >
                    {form.formState.isSubmitting ? "Sending…" : "Submit Enquiry"}
                  </Button>
                </form>
              </Form>
            )}
          </m.div>

        </div>
      </div>
    </section>
  );
}
