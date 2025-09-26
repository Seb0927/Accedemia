import React from "react";
import { AlertTriangle } from "lucide-react";

export default function IOSFallback() {
  return (
    <>
      {/* Background overlay */}
      <div className={`
        bg-warning absolute size-full min-h-full rounded-lg opacity-20
      `} />

      {/* Content card */}
      <div className={`
        absolute z-1 flex size-full items-center justify-center p-4
      `}>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-warning/20 rounded-full p-4">
                <AlertTriangle />
              </div>
            </div>
            <h2 className="card-title mb-2 justify-center text-xl">
              Previsualización no disponible
            </h2>
            <p>
              Lo sentimos, la previsualización en vivo no está disponible en 
              <span className="font-bold">dispositivos móviles iOS</span>.
              Puedes visualizar las lecciones en Accedemia, pero no podrás ver la 
              previsualización en vivo ni editar el código.
            </p>
            <p className="mt-2 text-sm">
              Para una experiencia completa, te recomendamos utilizar un navegador 
              de escritorio como <span className="font-bold">Chrome, Firefox o Edge.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}