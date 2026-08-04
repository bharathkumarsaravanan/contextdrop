import { LegalHeader } from "@/components/legal/legal-header";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how ContextDrop collects, stores, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout>
      <LegalHeader
        title="Privacy Policy"
        description="Learn how ContextDrop collects, stores and protects your information while providing reusable project context across AI assistants."
        lastUpdated="August 4, 2026"
      />

      <div className="my-12 border-t border-border" />

      <LegalSection title="Introduction">
        <p>
          ContextDrop helps developers save and reuse project context across AI
          assistants such as ChatGPT, Claude, Gemini, and Cursor. This Privacy
          Policy explains what information we collect, how we use it, and the
          choices you have regarding your data.
        </p>
        <p>
          We only collect the information necessary to provide and improve
          ContextDrop. We do not sell your personal information or your project
          data to third parties.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>
          To provide ContextDrop, we collect information that you choose to
          provide when using the platform. This includes your account
          information, workspaces, memory blocks, generated context, and any
          content you intentionally save within the application.
        </p>

        <p>
          We also collect limited technical information, such as browser type,
          device information, and usage analytics, to improve the reliability,
          performance, and user experience of ContextDrop.
        </p>
      </LegalSection>

      <LegalSection title="Authentication">
        <p>
          ContextDrop uses Supabase Authentication to securely manage user
          accounts and sign-in sessions. Depending on the authentication method
          you choose, your email address and basic account information may be
          processed by Supabase for authentication purposes.
        </p>

        <p>
          We do not store your passwords. Authentication credentials are
          securely handled by Supabase.
        </p>
      </LegalSection>

      <LegalSection title="Workspace Data">
        <p>
          ContextDrop stores the workspaces, memory blocks, generated context,
          and other content that you create in order to provide the core
          functionality of the platform.
        </p>

        <p>
          Your workspace data remains yours. You can edit or delete your saved
          content at any time through the application.
        </p>
      </LegalSection>

      <LegalSection title="Generated Context">
        <p>
          ContextDrop allows you to generate structured project context from the
          information you save in your workspaces. Generated context is stored
          only when you choose to save it. Unsaved generated content is not
          permanently retained by ContextDrop.
        </p>

        <p>
          You are responsible for reviewing generated content before sharing or
          using it with third-party AI services.
        </p>
      </LegalSection>

      <LegalSection title="Shared Context">
        <p>
          ContextDrop allows you to generate shareable links for context that
          you explicitly choose to share. Anyone with access to a shared link
          may be able to view the shared content.
        </p>

        <p>
          You are responsible for ensuring that shared context does not contain
          confidential, personal, or sensitive information before generating a
          share link.
        </p>
      </LegalSection>

      <LegalSection title="OpenRouter API Keys (Bring Your Own Key)">
        <p>
          ContextDrop allows you to connect your own OpenRouter API key to
          access AI-powered features. Your API key is stored securely and is
          used only to make requests that you initiate within the application.
        </p>

        <p>
          ContextDrop does not sell AI credits or use your API key for unrelated
          purposes. You remain responsible for any usage, costs, or policies
          associated with your OpenRouter account.
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          ContextDrop uses privacy-conscious analytics to understand how the
          platform is used, improve performance, and identify areas for
          improvement. These analytics help us understand product usage without
          accessing the contents of your private workspaces.
        </p>

        <p>
          We currently use Vercel Analytics, Vercel Speed Insights, and PostHog
          Product Analytics to measure application performance and feature
          usage.
        </p>
      </LegalSection>

      <LegalSection title="Third-party Services">
        <p>
          ContextDrop relies on trusted third-party services to provide parts of
          the platform. These services may process information as necessary to
          perform their respective functions.
        </p>

        <p>
          These services currently include Supabase for authentication and
          database services, OpenRouter for AI requests initiated by users, and
          Vercel for application hosting and delivery.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We take reasonable measures to protect your information using secure
          connections, authenticated access, and industry-standard security
          practices. However, no internet-based service can guarantee absolute
          security.
        </p>

        <p>
          We continuously improve ContextDrop to provide a secure experience for
          all users.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          You may access, update, or delete your account information and saved
          content through ContextDrop. If you require additional assistance
          regarding your personal data, you may contact us using the information
          provided below.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          If you have questions about this Privacy Policy or how your
          information is handled, please contact us at:
        </p>

        <p>
          <strong>Email:</strong> <a href="mailto:real.bharathsaravanan@email.com">real.bharathsaravanan@email.com</a>
        </p>
      </LegalSection>

      <LegalSection title="Changes to this Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in ContextDrop, legal requirements, or improvements to our services.
          When significant changes are made, the Last updated date at the top
          of this page will be revised accordingly.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
