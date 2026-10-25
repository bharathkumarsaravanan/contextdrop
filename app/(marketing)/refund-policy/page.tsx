import { LegalHeader } from "@/components/legal/legal-header";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Learn how refunds and subscription cancellations work for ContextDrop purchases.",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout>
      <LegalHeader
        title="Refund Policy"
        description="Information about refunds, billing, and subscription cancellations for ContextDrop."
        lastUpdated="Oct 25, 2026"
      />

      <div className="my-12 border-t border-border" />

      <LegalSection title="Payments">
        <p>
          Payments for ContextDrop subscriptions are processed by Paddle.com,
          which acts as the merchant of record. Paddle handles payment
          processing, applicable taxes, invoices, and payment-related support.
        </p>
      </LegalSection>

      <LegalSection title="Refund requests">
        <p>
          Refund eligibility is determined under Paddle&apos;s{" "}
          <a
            href="https://www.paddle.com/legal/refund-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Buyer Refund Policy
          </a>{" "}
          and any consumer rights that apply to your purchase. To request a
          refund or ask about a payment, use the support link in your Paddle
          receipt or contact Paddle through its buyer support channels.
        </p>
        <p>
          If you need help using ContextDrop, contact us at{" "}
          <a
            href="mailto:real.bharathsaravanan@email.com"
            className="text-primary hover:underline"
          >
            real.bharathsaravanan@email.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Canceling a subscription">
        <p>
          You can cancel a subscription through the Paddle customer portal
          linked from your account or receipt. Cancellation stops future
          renewals. Unless Paddle confirms otherwise, your paid access remains
          available through the end of the current billing period.
        </p>
        <p>
          Canceling a subscription does not by itself issue a refund for a
          payment already made. Refund requests are handled under Paddle&apos;s
          Buyer Refund Policy and applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For product or account assistance, contact{" "}
          <a
            href="mailto:real.bharathsaravanan@email.com"
            className="text-primary hover:underline"
          >
            real.bharathsaravanan@email.com
          </a>
          . For payment or refund requests, contact Paddle using the support
          link on your receipt.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
