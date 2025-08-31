'use client';

import { useState, useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { createHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as monaco from 'monaco-editor';
import webContainerService from '../services/webContainerService';

const DEFAULT_FILE_PATH = 'src/components/assistance/Assistance.jsx';

export default function CodeEditor() {
  const [content, setContent] = useState<string>('// Cargando...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string>(DEFAULT_FILE_PATH);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  // Setup Shiki once before the editor mounts
  useEffect(() => {
    async function setupShiki() {
      try {
        // Create the highlighter
        const highlighter = await createHighlighter({
          themes: ['github-dark'],
          langs: ['javascript', 'typescript', 'jsx', 'tsx'],
        });

        // Only run this once before the editor is created
        if (monacoRef.current) {
          // Register the languageIds first
          monacoRef.current.languages.register({ id: 'jsx' });
          monacoRef.current.languages.register({ id: 'tsx' });
          monacoRef.current.languages.register({ id: 'javascript' });
          monacoRef.current.languages.register({ id: 'typescript' });

          // Register the themes and provide syntax highlighting
          shikiToMonaco(highlighter, monacoRef.current);
        }
      } catch (err) {
        console.error('Failed to initialize Shiki:', err);
      }
    }

    // Run setup if Monaco is already loaded
    if (monacoRef.current) {
      setupShiki();
    }
  }, [monacoRef.current]);

  // Load file content when component mounts or file path changes
  useEffect(() => {
    async function loadFileContent() {
      if (!webContainerService.isReady()) {
        // Wait a bit and try again if the container isn't ready
        const timeoutId = setTimeout(loadFileContent, 1000);
        return () => clearTimeout(timeoutId);
      }

      setIsLoading(true);
      try {
        const fileContent = await webContainerService.readFile(filePath);
        setContent(fileContent);
        setError(null);
      } catch (err) {
        console.error(`Error loading file ${filePath}:`, err);
        setError(`No se pudo cargar el archivo ${filePath}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadFileContent();
  }, [filePath]);

  // Handle Monaco instance being loaded
  function handleBeforeMount(monacoInstance: typeof monaco) {
    monacoRef.current = monacoInstance;
  }

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor, monaco) => {
  setEditorInstance(editor);
  
  // Update language based on file extension
  const language = getLanguageFromPath(filePath);
  const model = editor.getModel();
  if (model) {
    monaco.editor.setModelLanguage(model, language);
  }
};

  // Helper to determine language from file path
  const getLanguageFromPath = (path: string): string => {
    if (path.endsWith('.jsx')) return 'jsx';
    if (path.endsWith('.tsx')) return 'tsx';
    if (path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.ts')) return 'typescript';
    return 'javascript'; // Default
  };

  // Handle content change
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && value !== content) {
      setContent(value);
      // Debounce file saves to avoid too many writes
      debounceSave(value);
    }
  };

  // Debounce helper for saving
  const debounceSave = (() => {
    let timeout: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => saveFile(value), 500);
    };
  })();

  // Save file to WebContainer
  const saveFile = async (value: string) => {
    if (!webContainerService.isReady()) {
      setError('El WebContainer no está listo para guardar archivos');
      return;
    }

    try {
      await webContainerService.writeFile(filePath, value);
      console.log(`File ${filePath} saved successfully`);
    } catch (err) {
      console.error(`Error saving file ${filePath}:`, err);
      setError(`No se pudo guardar el archivo ${filePath}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-slate-800 text-white p-2 text-sm flex justify-between items-center">
        <span>Editor de Código: {filePath}</span>
        {isLoading && <span className="text-xs text-amber-300">Cargando...</span>}
        {error && <span className="text-xs text-red-300">{error}</span>}
      </div>
      <div className="flex-grow relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-70 z-10">
            <div className="loading loading-spinner loading-md"></div>
          </div>
        )}
        <Editor
          height="100%"
          defaultLanguage={getLanguageFromPath(filePath)}
          value={content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleBeforeMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          theme="github-dark"
        />
      </div>
    </div>
  );
}