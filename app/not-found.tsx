import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Number */}
        <div className="text-9xl font-bold opacity-80">
          404
        </div>
        
        {/* Error Message */}
        <div className="mt-4">
          <h1 className="text-base-content mb-4 text-4xl font-bold">
            Página No Encontrada
          </h1>
          <p className="text-base-content/70 mb-8 text-lg">
            Lo siento, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn btn-primary gap-2">
            <Home size={20} />
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;