"use client";

import { useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { ChevronUp, ChevronDown } from "lucide-react";
import webContainerService from "@/features/learn/services/webcontainer-service";
import monacoService from "@/features/learn/services/monaco-service";
import FileExplorer from "@/features/learn/components/file-explorer";
import EvaluateButton from "@/features/learn/components/evaluate-button";
import { useSystemTheme } from "@/hooks/use-system-theme";
import { useLessonStore } from "@/features/learn/stores/use-lesson-store";

const DEFAULT_FILE_PATH = "src/components/assistance/Assistance.jsx";

export default function CodeEditor() {
  const isDarkMode = useSystemTheme();
  const [content, setContent] = useState<string>("// Cargando...");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string>(DEFAULT_FILE_PATH);
  const [isExplorerVisible, setIsExplorerVisible] = useState<boolean>(true);

  const selectedLesson = useLessonStore(state => state.selectedLesson);

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
    setIsExplorerVisible(false);
    setFilePath(path);
  };

  // Handle Monaco instance being loaded
  function handleBeforeMount(monacoInstance: typeof monaco) {
    // Initialize Shiki for Monaco (will only run once)
    monacoService.initialize(monacoInstance, isDarkMode);
  }

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor, monaco) => {
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
      setError("El WebContainer no está listo para guardar archivos");
      return;
    }

    try {
      await webContainerService.writeFile(filePath, value);
    } catch (err) {
      console.error(`Error saving file ${filePath}:`, err);
      setError(`No se pudo guardar el archivo ${filePath}`);
    }
  };

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-xl">
      {/* Header */}
      <div className={`
        bg-base-100 flex h-10 items-center justify-between p-2 text-sm
      `}>

        {/* File indicator */}
        <div>
          {isLoading ? (
            <span className='font-semibold'>Editor de código</span>
          ) : (
            <span className='font-semibold'>
              Editor de Código:{" "}
              <span className="font-medium">
                {filePath.split("/").pop()}
              </span>
            </span>
          )}
          {error && <span className="text-error text-xs">{error}</span>}
        </div>

        {/* Evaluation button (only show if a lesson is selected) */}
        <div>
          {selectedLesson && (
            <EvaluateButton
              lessonId={selectedLesson.id}
              filePath={filePath}
            />
          )}
        </div>
      </div>

      {/* Content area with dynamic sizing based on explorer visibility */}
      <div className="flex h-[calc(100%-2.5rem)] flex-col overflow-hidden">
        {/* Monaco editor area - dynamic height */}
        <div className={`
          ${isExplorerVisible ? "h-4/10" : "h-full"}
          relative z-0 transition-all duration-300
        `}>
          {isLoading && (
            <div className={`
              bg-opacity-70 bg-base-100 absolute inset-0 z-10 flex items-center
              justify-center
            `}>
              <div className="loading loading-md loading-spinner"></div>
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
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            theme={isDarkMode ? "github-dark" : "github-light"}
          />
        </div>

        {/* File explorer with toggle */}
        <div className={`
          border-base-300 overflow-hidden border-t transition-all duration-300
          ${isExplorerVisible ? "h-6/10" : "h-10"
          }
        `}>
          {/* Explorer header with toggle button */}
          <div
            className={`
              border-base-300 bg-base-100 sticky top-0 flex cursor-pointer
              items-center justify-between border-b p-2
              hover:bg-base-200
            `}
            onClick={() => setIsExplorerVisible(!isExplorerVisible)}
          >
            <span className="font-medium">Explorador de archivos</span>
            {isExplorerVisible ?
              <ChevronDown size={16} className="text-base-content" /> :
              <ChevronUp size={16} className="text-base-content" />
            }
          </div>

          {/* Explorer content */}
          <div className={`
            transition-all duration-300
            ${isExplorerVisible ? "h-[calc(100%-2.5rem)]" : "h-0"}
            overflow-hidden
          `}>
            <FileExplorer
              onSelectFile={handleFileSelect}
              currentFilePath={filePath}
            />
          </div>
        </div>
      </div>
    </div>
  );
}