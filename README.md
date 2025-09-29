# Accedemia

![Accedemia Logo](public/images/light-logotype.png)

## Plataforma de Aprendizaje sobre Accesibilidad Web

Accedemia es una plataforma educativa interactiva diseñada para enseñar las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1) a través de ejercicios prácticos y asistencia de inteligencia artificial. El proyecto forma parte de una investigación sobre cómo las tecnologías de IA pueden mejorar el aprendizaje de conceptos técnicos complejos.

## Características principales

- **Lecciones estructuradas** organizadas por criterios de éxito WCAG
- **Editor de código integrado** con Monaco Editor (tecnología de VS Code)
- **Entorno de ejecución en navegador** mediante WebContainer
- **Evaluación automática** de código mediante Google Gemini AI
- **Proyecto de práctica "CompraFácil"** con problemas reales de accesibilidad
- **Feedback instantáneo** sobre implementaciones de accesibilidad
- **Seguimiento de progreso** por cada criterio de éxito

## Tecnologías utilizadas

- **Frontend:** Next.js 15.5, React 19.1, Tailwind CSS, DaisyUI
- **Edición de código:** Monaco Editor
- **Ejecución de código:** WebContainer API
- **Estado:** Zustand
- **IA:** Google Gemini AI

## Requisitos previos

- Node.js 20.19.3 o superior
- npm/yarn

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/yourusername/accedemia.git
   cd accedemia
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crea un archivo .env.local con el siguiente contenido:

   ```text
   GOOGLE_API_KEY=tu_clave_api_de_gemini
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del proyecto

```text
accedemia/
├── public/
│   ├── curriculum/        # Contenido de las lecciones
│   ├── learning-project/  # Proyecto "CompraFácil" para práctica
│   └── images/            # Imágenes y recursos estáticos
├── src/
│   ├── app/               # Rutas y páginas (Next.js App Router)
│   ├── components/        # Componentes reutilizables
│   ├── features/
│   │   └── learn/         # Funcionalidades específicas de aprendizaje
│   ├── lib/               # Utilidades y configuraciones
│   └── types/             # Definiciones de tipos TypeScript
└── docs/                  # Documentación adicional
```

## Uso

1. Navega a la página principal para ver la introducción
2. Selecciona una lección desde el menú de navegación
3. Lee la explicación del criterio de éxito WCAG
4. Explora el código del proyecto con problemas de accesibilidad
5. Implementa la solución en el editor de código
6. Evalúa tu solución para recibir feedback de la IA
7. Continúa con la siguiente lección

## Licencia

Este proyecto está licenciado bajo [LICENSE_TYPE] - consulta el archivo LICENSE para más detalles.

---

> Proyecto desarrollado como parte de una investigación sobre métodos de enseñanza asistidos por IA para conceptos técnicos complejos.
