import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef, useState } from "react";
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

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const loadTimeRef = useRef(Date.now());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", service: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (honeypotRef.current?.value) return;
    if (Date.now() - loadTimeRef.current < 3000) return;

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
      if (!accessKey) {
        throw new Error("Form not yet configured — please email us directly at enquiries@ardire.co.uk");
      }

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("from_name", "Árdíre Website");
      formData.append("subject", `New Enquiry: ${values.service} — ${values.name}`);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", `Area of Interest: ${values.service}\n\n${values.message}`);

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
    <section id="enquiry" className="py-24 md:py-32 bg-background relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <motion.div
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
                <h4 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Headquarters</h4>
                <p className="font-display text-lg text-foreground">The ÁrdÍre Group</p>
                <p className="text-muted-foreground font-sans mt-1">Clyde Offices, 2nd Floor<br />48 West George Street<br />Glasgow G2 1BP</p>
              </div>
              <div>
                <h4 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Direct Enquiries</h4>
                <a href="mailto:enquiries@ardire.co.uk" className="font-display text-lg text-foreground hover:text-primary transition-colors block">
                  enquiries@ardire.co.uk
                </a>
              </div>
              <div>
                <h4 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Telephone</h4>
                <a href="tel:+441412550796" className="font-display text-lg text-foreground hover:text-primary transition-colors">
                  +44 (0)141 255 0796
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card p-8 md:p-10 border border-border/50"
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[360px] space-y-6">
                <div className="w-10 h-px bg-primary" />
                <h3 className="font-display text-2xl text-foreground">
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
                            <Input placeholder="Your name..." className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
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
                            <Input placeholder="your@email.com" className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
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
                            <SelectItem value="luxury-tours">Luxury Tours</SelectItem>
                            <SelectItem value="golf-tours">Golf Tours</SelectItem>
                            <SelectItem value="private-chauffeur">Private Chauffeur</SelectItem>
                            <SelectItem value="self-guided">Self-Guided Tours</SelectItem>
                            <SelectItem value="concierge">Concierge</SelectItem>
                            <SelectItem value="corporate-incentives">Corporate Incentives</SelectItem>
                            <SelectItem value="event-management">Event Management</SelectItem>
                            <SelectItem value="staffing">Event Staffing</SelectItem>
                            <SelectItem value="commonwealth">Commonwealth '26</SelectItem>
                            <SelectItem value="other">Other / General</SelectItem>
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
                    <p className="text-destructive font-sans text-sm">{submitError}</p>
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
