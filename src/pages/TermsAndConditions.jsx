import React, { useEffect } from "react";

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-24 p-6 min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-light] dark:text-[--text-dark]">



      <h1 className="text-3xl font-bold text-red-600 mb-6 self-center text-center">
        Terms & Conditions
      </h1>

      <p className="">
        Welcome to <b>BingeBox</b>. By accessing or using our website, you agree to the following Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. No Videos Stored</h2>
      <p className="">
        BingeBox does <b>not host, upload, or store</b> any videos on our servers.  
        All media content is provided through third-party platforms.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Fair Usage</h2>
      <p className="">
        You may browse, search, and view movie/series information solely for personal use.  
        Any misuse of this information is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. External Links</h2>
      <p className="">
        We are not responsible for the content, privacy practices, or accuracy of third-party websites.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Accuracy of Information</h2>
      <p className="">
        We try to keep information accurate, but we cannot guarantee the completeness or reliability of data from OMDB API or external sources.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
      <p className="">
        We may update these Terms and Conditions at any time.  
        Continued use of the website means acceptance of any changes.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
      <p className="">
        For any questions regarding these terms, please contact us via the About page.
      </p>
    </div>
  );
}
