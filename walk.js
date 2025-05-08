import React, { useState } from 'react';
import { Folder, FolderOpen, FileText } from 'lucide-react';

const Directory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedDirs, setExpandedDirs] = useState({
    'contexts': true,
    'components': true,
    'components/assistance': true,
  });

  // Sample directory structure - replace with your actual data structure
  const fileStructure = [
    {
      name: 'contexts',
      type: 'directory',
      children: [
        { name: 'shoppingCartContext', type: 'file', extension: 'jsx' },
        { name: 'UserContext', type: 'file', extension: 'jsx' },
      ]
    },
    {
      name: 'components',
      type: 'directory',
      children: [
        {
          name: 'assistance',
          type: 'directory',
          children: [
            { name: 'Assistance', type: 'file', extension: 'jsx' },
          ]
        },
        {
          name: 'background',
          type: 'directory',
          children: []
        }
      ]
    }
  ];

  const toggleDirectory = (path) => {
    setExpandedDirs(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleFileSelect = (filePath) => {
    setSelectedFile(filePath);
  };

  const renderFileTree = (items, basePath = '') => {
    return items.map((item) => {
      const path = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.type === 'directory') {
        const isExpanded = expandedDirs[path];
        return (
          <li key={path} className="ml-2">
            <div 
              className="flex items-center cursor-pointer hover:bg-gray-100 py-1"
              onClick={() => toggleDirectory(path)}
            >
              {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              <span className="ml-1">{item.name}</span>
            </div>
            {isExpanded && item.children && (
              <ul className="ml-4">
                {renderFileTree(item.children, path)}
              </ul>
            )}
          </li>
        );
      } else {
        const filePath = `${path}.${item.extension}`;
        const isSelected = selectedFile === filePath;
        return (
          <li 
            key={filePath} 
            className={`ml-2 flex items-center cursor-pointer py-1 hover:bg-gray-100 ${isSelected ? 'bg-gray-100' : ''}`}
            onClick={() => handleFileSelect(filePath)}
          >
            <FileText size={16} />
            <span className="ml-1">{item.name}.{item.extension}</span>
          </li>
        );
      }
    });
  };

  return (
    <div className="h-1/5 w-full bg-background border border-black overflow-auto">
      <ul className="p-1">
        {renderFileTree(fileStructure)}
      </ul>
    </div>
  );
}

export default Directory;