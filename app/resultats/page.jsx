import { Suspense } from "react";
import ResultatsClient from "./ResultatsClient";

export default function ResultatsPage() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-10">Résultats</h1>
      <Suspense fallback={<p className="text-center mt-10">Chargement…</p>}>
        <ResultatsClient />
      </Suspense>
    </div>
  );
}
