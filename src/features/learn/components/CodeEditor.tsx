'use client';

import { useState, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import webContainerService from '../services/webContainerService';

const DEFAULT_FILE_PATH = 'src/components/assistance/Assistance.jsx';

export default function CodeEditor() {
  const [content, setContent] = useState<string>('// Cargando...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string>(DEFAULT_FILE_PATH);
  const [editorInstance, setEditorInstance] = useState<any>(null);

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

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor) => {
    setEditorInstance(editor);
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
          defaultLanguage="javascript"
          value={content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}