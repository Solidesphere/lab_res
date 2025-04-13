"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const Form = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset any previous error
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={logo} alt="logo" className="mx-auto h-30 w-auto" />
        <h2 className="mt-7 text-center text-xl font-bold tracking-tight text-gray-900">
          Veuillez saisir votre identifiant pour accéder à vos résultats
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="Identifiant"
              className="block text-base font-medium text-gray-900"
            >
              Identifiant
            </label>
            <div className="mt-2">
              <input
                id="Identifiant"
                name="Identifiant"
                type="text"
                required
                autoComplete="Identifiant"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={identifiant}
                onChange={(e) => {
                  setIdentifiant(e.target.value);
                }}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
