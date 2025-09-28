import Card from "@/components/card";
import { Info } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex size-full items-center justify-center p-4">
        <Card className="bg-base-100 max-h-10/12 max-w-2xl overflow-auto p-8">
          <h1 className="mb-1 w-full text-center text-3xl font-bold">Atribuciones</h1>
          <p className="mb-4">
            Este proyecto ha sido desarrollado gracias a las siguientes librerías de código abierto:
          </p>

          <h2 className="text-xl font-semibold">Librerías Principales</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/vercel/next.js" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>Next.js (v15.5.2)</strong>
              </a> - Framework de React para aplicaciones web
            </li>
            <li>
              <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>React (v19.1.0)</strong>
              </a> - Biblioteca para construir interfaces de usuario
            </li>
            <li>
              <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>Zustand (v5.0.6)</strong>
              </a> - Gestor de estados para React
            </li>
          </ul>

          <h2 className="text-xl font-semibold">Editor de Código</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/microsoft/monaco-editor" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>Monaco Editor (v0.52.2)</strong>
              </a> - Editor de código usado en VS Code
            </li>
            <li>
              <a href="https://github.com/suren-atoyan/monaco-react" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>@monaco-editor/react (v4.7.0)</strong>
              </a> - Integración de Monaco Editor para React
            </li>
            <li>
              <a href="https://github.com/shikijs/shiki" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>@shikijs/monaco (v3.12.2)</strong>
              </a> - Resaltado de sintaxis para Monaco
            </li>
          </ul>

          <h2 className="text-xl font-semibold">Entorno de Ejecución</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/stackblitz/webcontainer-core" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>@webcontainer/api (v1.6.1)</strong>
              </a> - Contenedor web para ejecutar código
            </li>
          </ul>

          <h2 className="text-xl font-semibold">IA y Procesamiento</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/googleapis/js-genai" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>@google/genai (v1.19.0)</strong>
              </a> - API de Google Gemini AI
            </li>
          </ul>

          <h2 className="text-xl font-semibold">Contenido y UI</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/remarkjs/react-markdown" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>React Markdown (v10.1.0)</strong>
              </a> - Renderizado de Markdown en React
            </li>
            <li>
              <a href="https://github.com/remarkjs/remark-gfm" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>remark-gfm (v4.0.1)</strong>
              </a> - Soporte para GitHub Flavored Markdown
            </li>
            <li>
              <a href="https://github.com/rehypejs/rehype-highlight" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>rehype-highlight (v7.0.2)</strong>
              </a> - Resaltado de código en Markdown
            </li>
            <li>
              <a href="https://github.com/rehypejs/rehype-raw" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>rehype-raw (v7.0.0)</strong>
              </a> - Procesamiento de HTML en Markdown
            </li>
            <li>
              <a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>Lucide React (v0.532.0)</strong>
              </a> - Iconos para la interfaz
            </li>
          </ul>

          <h2 className="text-xl font-semibold">Estilizado</h2>
          <ul className="mb-6 list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/tailwindlabs/tailwindcss" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>Tailwind CSS (v4)</strong>
              </a> - Framework CSS utilitario
            </li>
            <li>
              <a href="https://github.com/saadeghi/daisyui" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>DaisyUI (v5.0.46)</strong>
              </a> - Componentes para Tailwind CSS
            </li>
          </ul>

          <h2 className="text-xl font-semibold">Desarrollo</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <a href="https://github.com/microsoft/TypeScript" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>TypeScript (v5)</strong>
              </a> - Superset tipado de JavaScript
            </li>
            <li>
              <a href="https://github.com/eslint/eslint" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>ESLint (v9)</strong>
              </a> - Analizador de código estático
            </li>
            <li>
              <a href="https://github.com/TypeStrong/ts-node" target="_blank" rel="noopener noreferrer" className={`
                link link-hover
              `}>
                <strong>TS-Node (v10.9.2)</strong>
              </a> - Ejecutor de TypeScript
            </li>
          </ul>

          <div className="alert alert-info alert-soft mt-8">
            <Info />
            <div>
              <h3 className="font-bold">Agradecimientos</h3>
              <div className="text-sm">
                Un sincero agradecimiento a todos los autores y mantenedores de estas librerías, cuyo trabajo desinteresado ha hecho posible este proyecto educativo sobre accesibilidad web.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}