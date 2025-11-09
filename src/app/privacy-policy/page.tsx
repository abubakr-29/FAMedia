import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="font-inter text-white pt-34 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold pb-4 bg-linear-to-r from-stone-200 to-stone-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-stone-400">Last updated: June 1, 2025</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Introduction
            </h2>
            <p className="text-stone-300 leading-relaxed">
              At FA Media, we respect your privacy and are committed to
              protecting your personal information.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <p className="text-stone-300 leading-relaxed">
                We collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
                <li>
                  Contact details you provide via forms (name, email, phone)
                </li>
                <li>Project-related information you voluntarily share</li>
                <li>
                  Analytics data like IP address, browser type (via Google
                  Analytics or similar)
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              How We Use Your Data
            </h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
              <li>To respond to your inquiries</li>
              <li>To deliver services and manage projects</li>
              <li>To send you relevant updates (only if you opt-in)</li>
              <li>For legal and security reasons</li>
            </ul>
          </section>

          {/* Sharing of Data */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Sharing of Data
            </h2>
            <p className="text-stone-300 leading-relaxed">
              We do not sell your data. We may share it with trusted service
              providers (like payment processors or email tools) solely to
              fulfill our services.
            </p>
          </section>

          {/* Cookies */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Cookies
            </h2>
            <p className="text-stone-300 leading-relaxed">
              Our website may use cookies to enhance your browsing experience.
              You can disable cookies via your browser settings.
            </p>
          </section>

          {/* Security */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Security
            </h2>
            <p className="text-stone-300 leading-relaxed">
              We use secure technologies and practices to safeguard your data.
              However, no online platform is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Your Rights
            </h2>
            <p className="text-stone-300 leading-relaxed">
              You may request access, updates, or deletion of your personal data
              by contacting us at{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@famedia.co.in&su=Inquiry%20from%20FA%20Media%20Website&body=Hi%20FA%20Media%20Team%2C%0D%0A%0D%0AI%20came%20across%20your%20website%20and%20I'm%20interested%20in%20working%20with%20you.%20Please%20let%20me%20know%20how%20we%20can%20proceed.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline underline-offset-4"
              >
                support@famedia.co.in
              </a>
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Third-Party Services
            </h2>
            <p className="text-stone-300 leading-relaxed">
              We are not responsible for the privacy policies of external links
              or third-party tools used on this site.
            </p>
          </section>

          {/* Updates to Policy */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Updates to Policy
            </h2>
            <p className="text-stone-300 leading-relaxed">
              We may modify this Privacy Policy from time to time. Updates will
              be posted here.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-stone-800/50">
            <h2 className="text-2xl font-semibold mb-4 text-stone-200">
              Contact Us
            </h2>
            <p className="text-stone-300 leading-relaxed">
              For any privacy-related concerns, email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@famedia.co.in&su=Inquiry%20from%20FA%20Media%20Website&body=Hi%20FA%20Media%20Team%2C%0D%0A%0D%0AI%20came%20across%20your%20website%20and%20I'm%20interested%20in%20working%20with%20you.%20Please%20let%20me%20know%20how%20we%20can%20proceed.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline underline-offset-4"
              >
                support@famedia.co.in
              </a>
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="flex justify-center my-12">
          <Link
            href={"/"}
            className="p-[3px] relative group cursor-pointer inline-block"
            target="_self"
            rel="noopener noreferrer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#54d265] to-[#2d9f42] rounded-lg transition duration-500" />
            <div className="px-4 sm:px-6 py-2 text-sm sm:text-lg bg-white rounded-md relative text-black transition duration-500 group-hover:bg-transparent group-hover:text-white">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
