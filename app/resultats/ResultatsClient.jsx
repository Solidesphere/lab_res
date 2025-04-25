"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { Home, Download } from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";

export default function ResultatsClient() {
  const searchParams = useSearchParams();
  const identifiant = searchParams.get("identifiant") || "";

  const [pdfExists, setPdfExists] = useState(false);

  const pdfUrl = `/api/download/${identifiant}.pdf`;

  // Vérifie que le PDF existe et est de type application/pdf
  useEffect(() => {
    async function checkPDF() {
      try {
        const res = await fetch(pdfUrl);
        const ct = res.headers.get("Content-Type");
        setPdfExists(res.ok && ct === "application/pdf");
      } catch {
        setPdfExists(false);
      }
    }

    if (identifiant) {
      checkPDF();
    }
  }, [pdfUrl, identifiant]);

  // Gestion du téléchargement
  const handleDownload = async () => {
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${identifiant}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erreur lors du téléchargement :", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 space-y-6">
      {/* Bouton de téléchargement */}
      {pdfExists && (
        <div className="mb-4 animate-fade-in">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500
             hover:from-blue-500 hover:to-indigo-600 text-white font-semibold px-6 py-3
             rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Download size={20} />
            <span>Télécharger les Résultats</span>
          </button>
        </div>
      )}

      {/* Bouton Accueil */}
      <div className="mb-4 animate-fade-in">
        <Link href="/">
          <button
            className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600
                                font-semibold px-4 py-2 rounded-full shadow transition duration-200 ease-in-out"
          >
            <Home size={20} />
            <span>Accueil</span>
          </button>
        </Link>
      </div>

      {/* Affichage du PDF */}
      <div
        className="w-full sm:w-[90%] lg:w-[100%] rounded-xl bg-white/30  p-4 shadow-xl
                      ring-1 ring-black/10 animate-fade-in"
      >
        {pdfExists ? (
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        ) : (
          <div
            role="alert"
            className="mt-6 max-w-xl mx-auto rounded-lg border border-orange-300 bg-orange-50 px-4 py-4
                       text-orange-800 shadow-md animate-fade-in"
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
