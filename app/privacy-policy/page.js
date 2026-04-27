import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for WordUnscrambler.gg — how we handle data, cookies, and analytics.',
  alternates: { canonical: 'https://wordunscrambler.gg/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: April 27, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p>
            WordUnscrambler.gg (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website at
            <a href="https://wordunscrambler.gg" className="text-blue-600 hover:underline"> https://wordunscrambler.gg</a>.
            This page describes what information we collect, how we use it, and the choices you have.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Information We Collect</h2>
          <p>
            We do not require an account to use this site. The letters you type into the unscrambler are processed in
            order to return matching words. We do not store the letters you submit beyond what is needed to serve the
            request.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors use the site so we can improve it. Google Analytics may
            set cookies and collect information such as your IP address, browser type, pages visited, and time spent on
            the site. This information is aggregated and used for traffic analysis. You can review Google&apos;s privacy
            practices at
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> policies.google.com/privacy</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Cookies</h2>
          <p>
            Cookies are small text files stored on your device. We use them only for analytics as described above. You
            can disable cookies in your browser settings; the site will continue to work normally.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Third-Party Services</h2>
          <p>
            The site is hosted on Vercel and may be served through their content delivery network. Vercel may collect
            request logs as part of normal hosting operations.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Children&apos;s Privacy</h2>
          <p>
            The site is suitable for general audiences and does not knowingly collect personal information from
            children under 13.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this page will
            reflect any changes.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
          <p>
            If you have questions about this privacy policy, you can reach us at
            <a href="mailto:support@elurashop.co" className="text-blue-600 hover:underline"> support@elurashop.co</a>.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to home</Link>
        </div>
      </section>
    </main>
  );
}
