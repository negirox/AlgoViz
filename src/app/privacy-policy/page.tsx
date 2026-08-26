import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | AlgoViz',
  description: 'Privacy Policy for AlgoViz, explaining how we handle data and how third-party vendors like Google use cookies to serve ads.',
  alternates: {
    canonical: 'https://algo-viz-nu.vercel.app/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
      <div className="container max-w-3xl px-4 md:px-6 py-12 md:py-16 space-y-6">
        <div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            &larr; Back to AlgoViz
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: August 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            AlgoViz ("we", "our", or "us") is committed to protecting your privacy. This Privacy
            Policy explains how information is handled when you use algo-viz-nu.vercel.app (the "Site").
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Information We Don't Collect</h2>
            <p>
              AlgoViz does not require an account and does not collect personally identifiable
              information (PII). The algorithms you visualize and the inputs you provide are
              processed locally in your browser and are never sent to or stored on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Cookies and Advertising</h2>
            <p>
              This Site uses Google AdSense to display advertisements. Google, as a third-party
              vendor, uses cookies (such as the DoubleClick cookie) to serve ads based on a user's
              prior visits to this and other websites. Google's use of advertising cookies enables
              it and its partners to serve ads based on your visit to this Site and/or other sites
              on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com/authenticated"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              . Alternatively, you can opt out of a third-party vendor's use of cookies for
              personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.aboutads.info
              </a>
              . Learn more about how Google uses information from sites that use its services at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Third-Party Vendors</h2>
            <p>
              Third-party vendors, including Google, may use cookies to serve ads based on your
              prior visits to this Site or other websites. This allows Google and its partners to
              serve ads to you based on your visit to this Site and/or other sites on the
              Internet. Users may opt out of the use of the DoubleClick cookie for interest-based
              advertising by visiting Google's Ads Settings linked above.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
            <p>
              We may use standard web analytics tools to understand aggregate, anonymized traffic
              patterns (such as page views). These tools do not identify individual users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Children's Privacy</h2>
            <p>
              This Site is not directed at children under the age of 13, and we do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out via{' '}
              <a
                href="mailto:mukeshsingh.negi07@gmail.com"
                className="text-primary hover:underline"
              >
                email
              </a>{' '}
              or through our{' '}
              <a
                href="https://github.com/negirox/AlgoViz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
  );
}
