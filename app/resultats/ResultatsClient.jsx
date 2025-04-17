"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultatsClient() {
  const searchParams = useSearchParams();
  const identifiant = searchParams.get("identifiant");

  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    const checkPDF = async () => {
      try {
        const response = await fetch(`/api/download/${identifiant}.pdf`);
        const contentType = response.headers.get("Content-Type");

        if (response.ok && contentType === "application/pdf") {
          setPdfExists(true);
        } else {
          setPdfExists(false);
        }
      } catch (error) {
        setPdfExists(false);
      }
    };

    if (identifiant) {
      checkPDF();
    }
  }, [identifiant]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download/${identifiant}.pdf`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${identifiant}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10">
      {pdfExists && (
        <div className="mb-8 animate-fade-in">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
          >
            📄 Télécharger les Résultats
          </button>
        </div>
      )}

      <div className="w-full sm:w-[90%] lg:w-[80%] rounded-xl bg-white/30 backdrop-blur-lg p-4 shadow-xl ring-1 ring-black/10 animate-fade-in">
        {pdfExists ? (
          <embed
            src={`/api/download/${identifiant}.pdf`}
            type="application/pdf"
            className="w-full h-[500px] rounded-lg border-none"
          />
        ) : (
          <div
            role="alert"
            className="mt-6 max-w-xl mx-auto rounded-lg border border-orange-300 bg-orange-50 px-4 py-4 text-orange-800 shadow-md animate-fade-in"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
              <p className="text-md font-medium">
                Résultat non disponible, veuillez réessayer plus tard.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
