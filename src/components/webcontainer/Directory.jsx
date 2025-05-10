import { useState } from 'react';
import { Folder, FolderOpen, FileText } from 'lucide-react';
import { buildFileStructure } from '../../../utils/fileTree';
import projectFiles from '../../../projectFiles.json';

const Directory = (props) => {
  const { selectedFile, setSelectedFile } = props;

  const [expandedDirs, setExpandedDirs] = useState({});

  // Start with src directory as the root
  const fileStructure = buildFileStructure(projectFiles.src.directory);

  const toggleDirectory = (path) => {
    setExpandedDirs(prev => ({
      ...prev,
      [path]: !prev[path]
    }));  
  };

  const handleFileSelect = (filePath) => {
    // Add the "src/" prefix to make it a full path from project root
    // This ensures WebContainer can find the file
    const fullPath = `src/${filePath}`;
    console.log("Selected file with full path:", fullPath);
    setSelectedFile(fullPath);
  };

  const renderFileTree = (items, basePath = '') => {
    return items.map((item) => {
      const path = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.type === 'directory') {
        const isExpanded = expandedDirs[path];
        return (
          <li key={path}>
            <button
              className="h-7 w-full flex items-center cursor-pointer hover:bg-slate-200 hover:rounded-l-md px-2 py-1"
              onClick={() => toggleDirectory(path)}
            >
              {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              <span className="ml-1">{item.name}</span>
            </button>
            {isExpanded && item.children && (
              <ul className="ml-4">
                {renderFileTree(item.children, path)}
              </ul>
            )}
          </li>
        );
      } else {
        const filePath = `${path}.${item.extension}`;
        // Check against the full path including "src/" prefix
        const fullPath = `src/${filePath}`;
        const isSelected = selectedFile === fullPath;
        return (
          <button
            key={filePath} 
            className={`h-7 w-full flex items-center cursor-pointer px-2 py-1 hover:bg-slate-200 hover:rounded-l-md ${isSelected ? 'bg-slate-200' : ''}`}
            onClick={() => handleFileSelect(filePath)}
          >
            <FileText size={16} />
            <span className={`ml-1 ${isSelected ? 'font-bold' : ''}`}>{item.name}.{item.extension}</span>
          </button>
        );
      }
    });
  };

  return (
    <div className="h-[25vh] w-full overflow-auto bg-background border border-black">
      <ul>
        {renderFileTree(fileStructure)}
      </ul>
    </div>
  );
}

export default Directory;