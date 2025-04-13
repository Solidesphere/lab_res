"use client";
import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Resultats({ searchParams: { identifiant } }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setShowDownloadButton(true);
  }

  if (!identifiant) {
    return <div>Identifiant is required</div>;
  }

  return (
    <div className="text-center mx-auto">
      {showDownloadButton && (
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
          telecharger resultats
        </button>
      )}

      <Document
        className="flex flex-col items-center justify-center"
        file={`/api/download/${identifiant}.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
        error={"resultat non disponible, veuillez réessayer plus tard"}
        loading={"chargement..."}
        canvas={"canvas"}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default Resultats;
