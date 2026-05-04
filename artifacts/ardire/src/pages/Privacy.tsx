import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="font-display text-2xl text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground font-sans font-light leading-relaxed">
      {children}
    </div>
  </div>
);

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | Árdíre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute("content", "Privacy Policy for Árdíre Group — Scotland's luxury private tour and concierge specialists based in Glasgow.");
    return () => {
      document.title = "Luxury Private Tours & Event Management | Árdíre - Scotland";
      if (desc && prev) desc.setAttribute("content", prev);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 w-full py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="space-y-4 border-b border-border/40 pb-10">
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs">Legal</p>
              <h1 className="font-display text-4xl md:text-5xl text-foreground">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground font-sans font-light text-base">
                Last updated: March 2025
              </p>
            </div>

            <Section title="Who We Are">
              <p>
                This Privacy Policy explains how Árd Íre Group (&ldquo;Árdíre&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects your personal data when you visit our website or contact us regarding our services.
              </p>
              <p>
                We are the data controller for the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <p>
                <span className="text-foreground font-normal">Árd Íre Group</span><br />
                Clyde Offices, 2nd Floor<br />
                48 West George Street<br />
                Glasgow, G2 1BP<br />
                <a href="mailto:enquiries@ardire.co.uk" className="text-primary hover:underline">enquiries@ardire.co.uk</a><br />
                +44 (0)141 255 0796
              </p>
            </Section>

            <Section title="What Data We Collect">
              <p>
                We collect personal data only when you choose to share it with us. The information we may collect includes:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li><span className="text-foreground font-normal">Contact information</span> — your name, email address, and any details you include in your enquiry via our contact form.</li>
                <li><span className="text-foreground font-normal">Communication records</span> — any correspondence between you and our team.</li>
                <li><span className="text-foreground font-normal">Technical data</span> — basic information your browser sends automatically, such as your IP address and browser type. We do not use tracking cookies or third-party analytics on this website.</li>
              </ul>
              <p>
                We do not collect sensitive personal data (such as health information or payment card details) through this website.
              </p>
            </Section>

            <Section title="How We Use Your Data">
              <p>
                We use the information you provide solely to:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Respond to your enquiry and discuss how we can assist you.</li>
                <li>Arrange and manage the services you have requested.</li>
                <li>Comply with any legal obligations that may apply to us.</li>
              </ul>
              <p>
                Our legal basis for processing your data is <span className="text-foreground font-normal">legitimate interests</span> (responding to your direct enquiry) and, where applicable, <span className="text-foreground font-normal">performance of a contract</span>.
              </p>
              <p>
                We will never sell your personal data or share it with third parties for marketing purposes.
              </p>
            </Section>

            <Section title="How We Process Your Enquiry">
              <p>
                Messages submitted via our contact form are delivered to us by Web3Forms, a third-party form submission service. Web3Forms processes your message data solely to transmit the enquiry on our behalf and does not retain or use it for any other purpose. You can review their privacy practices at <a href="https://web3forms.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">web3forms.com/privacy</a>.
              </p>
            </Section>

            <Section title="How Long We Keep Your Data">
              <p>
                We retain your enquiry and any correspondence for up to <span className="text-foreground font-normal">12 months</span> from the date of last contact, unless you become a client, in which case we will retain records for as long as is necessary to provide our services and meet our legal obligations.
              </p>
              <p>
                We review the data we hold regularly and delete anything we no longer need.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>
                Under UK GDPR, you have the following rights in relation to your personal data:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li><span className="text-foreground font-normal">Right of access</span> — to request a copy of the personal data we hold about you.</li>
                <li><span className="text-foreground font-normal">Right to rectification</span> — to ask us to correct any inaccurate information.</li>
                <li><span className="text-foreground font-normal">Right to erasure</span> — to request deletion of your personal data, where we have no lawful reason to retain it.</li>
                <li><span className="text-foreground font-normal">Right to restrict processing</span> — to ask us to limit how we use your data in certain circumstances.</li>
                <li><span className="text-foreground font-normal">Right to object</span> — to object to our processing of your data based on legitimate interests.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:enquiries@ardire.co.uk" className="text-primary hover:underline">enquiries@ardire.co.uk</a>. We will respond within 30 days.
              </p>
              <p>
                If you are not satisfied with how we handle your data, you have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO) at{" "}
                <a href="https://ico.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This website does not use analytics cookies or advertising trackers. We do not profile visitors or share browsing data with any third party.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised &ldquo;last updated&rdquo; date. We encourage you to review this page periodically.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please get in touch:
              </p>
              <p>
                <a href="mailto:enquiries@ardire.co.uk" className="text-primary hover:underline">enquiries@ardire.co.uk</a><br />
                +44 (0)141 255 0796
              </p>
            </Section>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
