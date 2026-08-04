import { LegalHeader } from "@/components/legal/legal-header";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Learn how to reach support, and get help from the team.",
};

export default function ContactsPage() {
  return (
    <LegalLayout>
      <LegalHeader
        title="Contact"
        description="Need help, have a question, or want to report an issue? We'd love to hear from you."
        lastUpdated="August 4, 2026"
      />

      <div className="my-12 border-t border-border" />

      <LegalSection title="Contact Information">
        <p>
          If you need assistance, have a question about ContextDrop, or would
          like to report a bug, you can reach me through any of the following
          channels.
        </p>

        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-3">
            <FiMail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a
                href="mailto:real.bharathsaravanan@email.com"
                className="text-primary hover:underline"
              >
                real.bharathsaravanan@email.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaGithub className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">GitHub</p>
              <a
                href="https://github.com/bharathkumarsaravanan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                bharathkumarsaravanan
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaLinkedin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/bharath--saravanan-engineer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Bharath Saravanan
              </a>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Response Time">
        <p>
          I typically respond to emails, bug reports, and general inquiries
          within 24–48 hours. Thank you for your patience and for helping
          improve ContextDrop.
        </p>
      </LegalSection>

      <LegalSection title="Support">
        <p>
          If you have questions about ContextDrop, encounter a bug, or need
          assistance using the platform, please do not hesitate to get in touch.
        </p>

        <p>
          We aim to respond to support requests as quickly as possible and
          appreciate your patience while ContextDrop continues to grow.
        </p>
      </LegalSection>

      <LegalSection title="Feedback">
        <p>
          We welcome feedback, feature suggestions, and bug reports. Your input
          helps improve ContextDrop and shape future updates.
        </p>
      </LegalSection>

      
    </LegalLayout>
  );
}
