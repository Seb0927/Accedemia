"use client";

import { useState, useEffect } from "react";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";
import webContainerService, { FileEntry } from "../services/webContainerService";

interface FileExplorerProps {
  onSelectFile: (path: string) => void;
  currentFilePath: string;
}

export default function FileExplorer({ onSelectFile, currentFilePath }: FileExplorerProps) {
  const [fileTree, setFileTree] = useState<FileEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/src"]));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFileTree = async () => {
      if (!webContainerService.isReady()) {
        const timeoutId = setTimeout(loadFileTree, 1000);
        return () => clearTimeout(timeoutId);
      }

      try {
        setIsLoading(true);
        const tree = await webContainerService.getFileTree("/");
        setFileTree(tree);
        setError(null);
      } catch (err) {
        console.error("Error loading file tree:", err);
        setError("No se pudo cargar la estructura de archivos");
      } finally {
        setIsLoading(false);
      }
    };

    loadFileTree();
  }, []);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderFileTree = (items: FileEntry[], level = 0) => {
    return items.map((item) => {
      const isExpanded = expandedFolders.has(item.path);
      const isSelected = currentFilePath === item.path;
      
      return (
        <div key={item.path} style={{ paddingLeft: `${level * 16}px` }}>
          <div 
            className={`
              flex cursor-pointer items-center rounded px-2 py-1
              hover:bg-base-100
              ${
              isSelected ? "bg-base-200" : ""
            }
            `}
            onClick={() => {
              if (item.type === "directory") {
                toggleFolder(item.path);
              } else {
                onSelectFile(item.path);
              }
            }}
          >
            {item.type === "directory" ? (
              <>
                <span className="mr-1 text-lg">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <Folder className="mr-2 text-blue-400" size={16} />
              </>
            ) : (
              <File className="mr-2 ml-5 text-gray-400" size={16} />
            )}
            <span className={`
              truncate text-sm
              ${isSelected ? "font-medium" : ""}
            `}>
              {item.name}
            </span>
          </div>
          
          {item.type === "directory" && isExpanded && item.children && (
            <div>
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="loading loading-sm loading-spinner"></div>
        <span className="ml-2 text-sm">Cargando archivos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-base-100 text-sm">
      <div className="p-2">{renderFileTree(fileTree)}</div>
    </div>
  );
}