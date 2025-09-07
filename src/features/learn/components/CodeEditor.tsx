'use client';

import { useState, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import webContainerService from '../services/webContainerService';
import monacoService from '../services/monacoService';
import FileExplorer from './FileExplorer';
import { useSystemTheme } from '@/hooks/useSystemTheme';

const DEFAULT_FILE_PATH = 'src/components/assistance/Assistance.jsx';

export default function CodeEditor() {
  const isDarkMode = useSystemTheme();
  console.log(isDarkMode)
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

  // Handle file selection from the FileExplorer
  const handleFileSelect = (path: string) => {
    setFilePath(path);
  };

  // Handle Monaco instance being loaded
  function handleBeforeMount(monacoInstance: typeof monaco) {
    // Initialize Shiki for Monaco (will only run once)
    monacoService.initialize(monacoInstance, isDarkMode);
  }

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorInstance(editor);

    // Update language based on file extension
    const language = monacoService.getLanguageFromPath(filePath);
    const model = editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
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
    <div className="flex flex-col h-full w-full overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="bg-base-100 p-2 text-sm flex justify-between items-center">
        <span className='font-semibold'>Editor de Código: <span className='font-medium'>{filePath.split('/').pop()}</span></span>
        {isLoading && <span className="text-xs text-amber-300">Cargando...</span>}
        {error && <span className="text-xs text-red-300">{error}</span>}
      </div>

      {/* Content area - split with explicit percentages */}
      <div className="flex flex-col h-[calc(100%-2.5rem)] overflow-hidden">
        {/* Monaco editor area - 70% height */}
        <div className="h-7/10 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-70 z-10">
              <div className="loading loading-spinner loading-md"></div>
            </div>
          )}
          <Editor
            height="100%"
            defaultLanguage={monacoService.getLanguageFromPath(filePath)}
            value={content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleBeforeMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            theme={isDarkMode ? 'github-dark' : 'github-light'}
          />
        </div>

        {/* File explorer area - 30% height */}
        <div className="h-3/10 border-t border-base-300 overflow-hidden">
          <FileExplorer
            onSelectFile={handleFileSelect}
            currentFilePath={filePath}
          />
        </div>
      </div>
    </div>
  );
}