import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Directory from './Directory';
import { writeIndexJS, readFileFromWebContainer } from '../../../utils/webcontainer';

const Code = (props) => {
  const { selectedFile, setSelectedFile } = props;
  const editorRef = useRef(null);
  const [content, setContent] = useState("// Select a file to edit");
  const [originalContent, setOriginalContent] = useState(""); // To track changes
  
  // Load file content when selectedFile changes
  useEffect(() => {
    const loadFileContent = async () => {
      if (!selectedFile) {
        setContent("// Select a file to edit");
        return;
      }
      
      try {
        // Get actual file content from WebContainer
        const fileContent = await readFileFromWebContainer(selectedFile);
        setContent(fileContent);
        setOriginalContent(fileContent); // Save original to detect changes
      } catch (error) {
        console.error("Error loading file:", error);
        setContent(`// Error loading ${selectedFile}\n// ${error.message}`);
      }
    };
    
    loadFileContent();
  }, [selectedFile]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  
  // Handle content changes
  function handleEditorChange(value) {
    setContent(value);
    
    // Optional: implement auto-save with debounce
    // This could be wrapped in a useCallback with debounce for performance
    if (value !== originalContent && selectedFile) {
      console.log(`File ${selectedFile} has been modified, saving changes...`);
      saveFile(selectedFile, value);
    }
  }
  
  // Save file content
  async function saveFile(path, content) {
    try {
      // Convert the path from the format used in your UI to the actual file path
      // This may vary depending on how your paths are structured
      const filePath = path; // Assuming path is already the full path format
      
      await writeIndexJS(filePath, content);
      setOriginalContent(content); // Update original content after save
      console.log(`File ${path} saved successfully`);
    } catch (error) {
      console.error("Error saving file:", error);
      // Consider showing an error message to the user
    }
  }

  const getLanguageFromFilename = (filename) => {
    if (!filename) return 'javascript';
    
    const extension = filename.split('.').pop().toLowerCase();
    const languageMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript', 
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'vtt': 'vtt',
    };
    
    return languageMap[extension] || 'plaintext';
  };

  return (
    <div className='h-full w-[30%] bg-gray-dark border border-black flex flex-col p-2'>
      <div className='flex-1 w-full border border-slate-700 mb-2'>
        <Editor
          height="100%"
          theme="vs-light"
          defaultLanguage="javascript"
          language={getLanguageFromFilename(selectedFile)}
          value={content}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbersMinChars: 2,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </div>
      <Directory selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
    </div>
  );
};

export default Code;