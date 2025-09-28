import Card from "@/components/card";
import Icon from "@/components/icon";
import { Info, BookOpen, GraduationCap, Target, Brain } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex size-full items-center justify-center p-4">
        <Card className="bg-base-100 max-h-10/12 max-w-2xl overflow-auto p-8">
          <h1 className="mb-6 w-full text-center text-3xl font-bold">Sobre Accedemia</h1>
          
          <div className="mb-8 flex items-center justify-center">
            <div className="avatar">
              <Icon className="w-24 rounded-full" />
            </div>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <BookOpen size={20} className="text-primary" />
                Acerca de Accedemia
              </h2>
              <p className="text-base-content/80">
                Accedemia es un proyecto de investigación enfocado en crear una plataforma de aprendizaje interactiva sobre las pautas de accesibilidad web WCAG (Web Content Accessibility Guidelines). Nuestro objetivo principal es facilitar la comprensión y aplicación de estos estándares para desarrolladores, diseñadores y profesionales del ámbito digital, contribuyendo así a una web más inclusiva.
              </p>
            </section>
            
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <Brain size={20} className="text-primary" />
                Nuestra Misión de Investigación
              </h2>
              <p className="text-base-content/80">
                Este proyecto surge como una iniciativa para investigar cómo las herramientas de inteligencia artificial pueden transformar el aprendizaje de conceptos técnicos complejos como las pautas WCAG. Buscamos determinar si los entornos de aprendizaje asistidos por IA pueden mejorar significativamente la curva de aprendizaje de estos estándares críticos pero frecuentemente percibidos como difíciles de implementar.
              </p>
            </section>
            
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <Info size={20} className="text-primary" />
                El Problema que Abordamos
              </h2>
              <p className="text-base-content/80">
                Las pautas WCAG, aunque esenciales para garantizar la accesibilidad web, presentan desafíos importantes para quienes buscan aprenderlas:
              </p>
              <ul className="text-base-content/80 my-3 list-disc pl-6">
                <li>Son extensas y técnicamente complejas</li>
                <li>Están redactadas en un lenguaje técnico y legal</li>
                <li>Requieren interpretación y contextualización</li>
                <li>Presentan una curva de aprendizaje pronunciada</li>
              </ul>
              <p className="text-base-content/80">
                Estos obstáculos frecuentemente desaniman a profesionales que, aunque motivados, encuentran difícil traducir estas pautas en implementaciones prácticas.
              </p>
            </section>
            
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <Target size={20} className="text-primary" />
                La Solución que Proponemos
              </h2>
              <p className="text-base-content/80">
                Accedemia utiliza la inteligencia artificial para crear un entorno de aprendizaje personalizado que:
              </p>
              <ol className="text-base-content/80 my-3 list-decimal pl-6">
                <li>Simplifica conceptos complejos con explicaciones adaptadas al nivel del usuario</li>
                <li>Proporciona ejemplos prácticos y contextualizados</li>
                <li>Ofrece retroalimentación inmediata sobre implementaciones</li>
                <li>Adapta los materiales educativos según el progreso individual</li>
              </ol>
            </section>
            
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <GraduationCap size={20} className="text-primary" />
                Metodología de Investigación
              </h2>
              <p className="text-base-content/80">
                Nuestro proyecto se fundamenta en una metodología que incluye:
              </p>
              <ul className="text-base-content/80 my-3 list-disc pl-6">
                <li>Análisis de las barreras actuales para el aprendizaje de WCAG</li>
                <li>Diseño centrado en el usuario para la plataforma de aprendizaje</li>
                <li>Implementación de LLMs para personalización de contenidos</li>
                <li>Evaluación continua de la efectividad de las técnicas implementadas</li>
              </ul>
            </section>
            
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <Target size={20} className="text-primary" />
                El Impacto que Buscamos
              </h2>
              <p className="text-base-content/80">
                A través de Accedemia, aspiramos a:
              </p>
              <ul className="text-base-content/80 my-3 list-disc pl-6">
                <li>Reducir significativamente el tiempo necesario para comprender e implementar las pautas WCAG</li>
                <li>Aumentar la adopción de prácticas de accesibilidad web</li>
                <li>Contribuir al conocimiento sobre metodologías efectivas para el aprendizaje asistido por IA</li>
                <li>Crear una web más inclusiva y accesible para todos los usuarios</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
}