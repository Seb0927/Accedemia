import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import Directory from './Directory';

const Code = (props) => {
  const { selectedFile, setSelectedFile } = props;
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
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
      'md': 'markdown'
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
          defaultValue="// Select a file from directory below"
          value={selectedFile ? `// Content of ${selectedFile}\n// Replace with actual file content` : "// Select a file to edit"}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbersMinChars: 2,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
      <Directory selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
    </div>
  );
};

export default Code;