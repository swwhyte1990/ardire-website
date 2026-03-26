import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log(values);
    toast({
      title: "Enquiry Received",
      description: "Our concierge team will contact you shortly.",
      variant: "default",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Begin Your <span className="italic text-primary">Journey</span>
            </h2>
            <p className="text-muted-foreground font-sans font-light text-lg mb-12 max-w-md">
              Allow us to craft an itinerary that surpasses expectation. Share your initial thoughts, and our directors will be in touch to arrange a private consultation.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Headquarters</h4>
                <p className="font-display text-xl text-foreground">Edinburgh, Scotland</p>
              </div>
              <div>
                <h4 className="font-sans uppercase tracking-widest text-xs text-primary mb-2">Direct Enquiries</h4>
                <a href="mailto:concierge@ardire.scot" className="font-display text-xl text-foreground hover:text-primary transition-colors">
                  concierge@ardire.scot
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Lord James..." className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
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
                          <Input placeholder="contact@estate.com" className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary h-12" {...field} />
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
                            <SelectValue placeholder="Select an experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="concierge">Private Concierge</SelectItem>
                          <SelectItem value="expedition">Luxury Expedition</SelectItem>
                          <SelectItem value="events">Event Management</SelectItem>
                          <SelectItem value="whisky">Rare Whisky Vault Access</SelectItem>
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
                          placeholder="Briefly describe what you envision..." 
                          className="bg-background/50 border-border/50 rounded-none focus-visible:ring-primary min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs h-14 rounded-none transition-all duration-300"
                >
                  Submit Enquiry
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
