import { createHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as monaco from 'monaco-editor';

class MonacoService {
  private initialized = false;
  
  async initialize(monacoInstance: typeof monaco, isDarkMode: boolean = true): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Register the languageIds first
      monacoInstance.languages.register({ id: 'jsx' });
      monacoInstance.languages.register({ id: 'tsx' });
      monacoInstance.languages.register({ id: 'javascript' });
      monacoInstance.languages.register({ id: 'typescript' });
      
      // Create the highlighter with theme order based on system preference
      const themes = isDarkMode 
        ? ['github-dark', 'github-light']  // Dark first if system is dark
        : ['github-light', 'github-dark']; // Light first if system is light
      
      const highlighter = await createHighlighter({
        themes,
        langs: ['javascript', 'typescript', 'jsx', 'tsx'],
      });
      
      // Configure Monaco with Shiki's highlighter
      shikiToMonaco(highlighter, monacoInstance);
      
      this.initialized = true;
      console.log('Monaco editor configured with Shiki highlighter');
    } catch (err) {
      console.error('Failed to initialize Shiki for Monaco:', err);
    }
  }
  
  getLanguageFromPath(path: string): string {
    if (path.endsWith('.jsx')) return 'jsx';
    if (path.endsWith('.tsx')) return 'tsx';
    if (path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.ts')) return 'typescript';
    if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.html')) return 'html';
    if (path.endsWith('.json')) return 'json';
    return 'javascript'; // Default
  }
}

const monacoService = new MonacoService();
export default monacoService;