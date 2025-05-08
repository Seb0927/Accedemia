export function buildFileStructure(obj, basePath = '.') {
  return Object.entries(obj)
    .filter(([name]) => !name.startsWith('.')) // Optionally skip dotfiles/folders
    .map(([name, value]) => {
      if (value.directory) {
        return {
          name,
          type: 'directory',
          children: buildFileStructure(value.directory, `${basePath}/${name}`)
        };
      } else if (value.file) {
        // Extract extension if possible
        const extMatch = name.match(/\.([^.]+)$/);
        return {
          name: extMatch ? name.replace(/\.[^.]+$/, '') : name,
          type: 'file',
          extension: extMatch ? extMatch[1] : ''
        };
      }
      return null;
    })
    .filter(Boolean);
}