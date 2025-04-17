import React from "react";

const Contact = () => {
  return (
    <section className="flex justify-center items-center py-10 px-4">
      <div className="max-w-2xl w-full rounded-2xl bg-white/30 backdrop-blur-md shadow-xl ring-1 ring-black/10 p-8 space-y-10 transition-all duration-500 ease-in-out animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Contactez-nous
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Phone Block */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100/80 text-blue-600 rounded-full shadow-sm ring-1 ring-blue-300">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              Téléphone
            </h3>
            <div className="mt-2 space-y-1 text-blue-500 dark:text-blue-400 text-base">
              <a href="tel:0774320278" className="hover:underline">
                0774 32 02 78
              </a>
              <br />
              <a href="tel:0665648966" className="hover:underline">
                0665 64 89 66
              </a>
            </div>
          </div>

          {/* Location Block */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100/80 text-blue-600 rounded-full shadow-sm ring-1 ring-blue-300">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              Localisation
            </h3>
            <p className="mt-2 text-blue-500 dark:text-blue-400 text-lg leading-relaxed">
              بجانب العيادة متعددة الخدمات ـ شفة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
