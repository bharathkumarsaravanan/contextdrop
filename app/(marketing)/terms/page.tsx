import { LegalHeader } from "@/components/legal/legal-header";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Learn ContextDrop's terms and conditions",
};

export default function ContactsPage() {
  return (
    <LegalLayout>
      <LegalHeader
        title="Terms of Service"
        description="Please read these Terms of Service carefully before using ContextDrop. By accessing or using the platform, you agree to these terms."
        lastUpdated="August 4, 2026"
      />
      <div className="my-12 border-t border-border" />
      <LegalSection title="Acceptance of Terms">
        <p>
          By accessing or using ContextDrop, you agree to be bound by these
          Terms of Service. If you do not agree with these terms, please do not
          use the platform.
        </p>

        <p>
          These terms apply to all users of ContextDrop, including visitors,
          registered users, and anyone accessing shared content.
        </p>
      </LegalSection>

      <LegalSection title="Description of the Service">
        <p>
          ContextDrop is a productivity tool that helps developers organize,
          generate, optimize, and share reusable project context for AI
          assistants such as ChatGPT, Claude, Gemini, and Cursor.
        </p>

        <p>
          We may improve, modify, or discontinue features of the platform as the
          product evolves.
        </p>
      </LegalSection>

      <LegalSection title="User Accounts">
        <p>
          You are responsible for maintaining the security of your account and
          for all activities that occur under your account.
        </p>

        <p>
          You must provide accurate information when creating an account and
          keep your account information up to date.
        </p>
      </LegalSection>

      <LegalSection title="User Responsibilities">
        <p>
          You agree not to misuse ContextDrop, interfere with the platform, or
          use it for unlawful purposes.
        </p>

        <p>
          You are responsible for ensuring that any content you store or share
          does not violate the rights of others or contain illegal material.
        </p>
      </LegalSection>

      <LegalSection title="AI Disclaimer">
        <p>
          ContextDrop provides AI-assisted features to help improve and organize
          project context. AI-generated content may contain inaccuracies,
          omissions, or unexpected results.
        </p>

        <p>
          You are responsible for reviewing and validating AI-generated content
          before relying on it in your projects or sharing it with others.
        </p>
      </LegalSection>

      <LegalSection title="User Content">
        <p>
          You retain ownership of the workspaces, memory blocks, generated
          context, and other content you create within ContextDrop.
        </p>

        <p>
          By storing content within the platform, you grant ContextDrop the
          limited rights necessary to store, process, and display your content
          in order to provide the service.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          ContextDrop, including its branding, design, software, and related
          content, is the intellectual property of its owner unless otherwise
          stated.
        </p>

        <p>
          You may not copy, modify, distribute, or reverse engineer any part of
          ContextDrop except as permitted by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Service Availability">
        <p>
          We strive to keep ContextDrop available and reliable, but we do not
          guarantee uninterrupted access to the platform.
        </p>

        <p>
          Maintenance, updates, technical issues, or circumstances beyond our
          control may temporarily affect availability.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, ContextDrop shall not be
          liable for any indirect, incidental, or consequential damages arising
          from the use or inability to use the platform.
        </p>

        <p>You use ContextDrop at your own risk.</p>
      </LegalSection>

      <LegalSection title="Changes to these Terms">
        <p>
          We may update these Terms of Service from time to time. Continued use
          of ContextDrop after changes become effective constitutes acceptance
          of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          If you have questions about this Privacy Policy or how your
          information is handled, please contact us at:
        </p>

        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:real.bharathsaravanan@email.com">
            real.bharathsaravanan@email.com
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
