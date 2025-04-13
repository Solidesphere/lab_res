"use client";

import { useEffect, useState } from "react";

function Resultats({ searchParams: { identifiant } }) {
  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    const checkPDF = async () => {
      try {
        const response = await fetch(`/api/download/${identifiant}.pdf`);
        // Check content type to confirm it's a valid PDF
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

  return (
    <div className="text-center mx-auto">
      {pdfExists && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center mx-auto mt-20"
          onClick={async () => {
            const response = await fetch(`/api/download/${identifiant}.pdf`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${identifiant}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Télécharger Résultats
        </button>
      )}

      <div className="flex justify-center mt-10">
        {pdfExists ? (
          <iframe
            src={`/api/download/${identifiant}.pdf`}
            className="w-[80%] h-[600px] border-none"
          ></iframe>
        ) : (
          <p className="text-gray-500 mt-10">
            resultat non disponible, veuillez réessayer plus tard .
          </p>
        )}
      </div>
    </div>
  );
}

export default Resultats;
