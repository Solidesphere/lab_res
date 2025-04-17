"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";

const Form = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (identifiant) {
      const query = `?identifiant=${identifiant}`;
      try {
        const response = await fetch(`/api/download/${identifiant}.pdf`);

        if (response.status === 404) {
          setErrorMessage(
            "Résultat non disponible, veuillez réessayer plus tard."
          );
        } else {
          router.push(`/resultats${query}`);
        }
      } catch (error) {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-5 m-10 lg:px-8 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src={logo}
          alt="Logo du laboratoire"
          className="mx-auto h-24 w-auto"
        />
        <h2 className="mt-7 text-center text-xl font-bold tracking-tight text-gray-900">
          Veuillez saisir votre identifiant pour accéder à vos résultats
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifiant"
              className="block text-xl font-medium text-gray-900"
            >
              Identifiant :
            </label>
            <div className="mt-2">
              <input
                id="identifiant"
                name="identifiant"
                type="text"
                required
                autoComplete="off"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mt-4 animate-slide-fade transition-all duration-500 ease-out"
              >
                <div className="bg-orange-500 text-white font-bold rounded-t px-4 py-2">
                  Oops !
                </div>
                <div className="border border-t-0 border-orange-400 rounded-b bg-red-100 px-4 py-3 text-orange-700">
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-fade-in"
            >
              Consulter les résultats
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
