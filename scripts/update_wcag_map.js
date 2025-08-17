const fs = require('fs');
const path = require('path');

// Read the current wcag_rule_map.json
const wcagMapPath = path.join(process.cwd(), 'public', 'curriculum', 'wcag_rule_map.json');
const lessonsDir = path.join(process.cwd(), 'public', 'curriculum', 'lessons');

const wcagMap = JSON.parse(fs.readFileSync(wcagMapPath, 'utf8'));

// Read all lesson files
const lessonFiles = fs.readdirSync(lessonsDir)
  .filter(file => file.startsWith('wcag-') && file.endsWith('.md'));

// Process each lesson file
lessonFiles.forEach(file => {
  const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
  const titleMatch = content.match(/^# (.+)/m);
  if (!titleMatch) return;

  const title = titleMatch[1];
  const [_, p, g, c] = file.match(/wcag-(\d+)-(\d+)-(\d+)\.md/);

  // Update the wcag map with the title
  if (wcagMap[p]?.guidelines?.[g]?.criteria?.[c]) {
    wcagMap[p].guidelines[g].criteria[c].title = title;
  }
});

// Write back the updated map
fs.writeFileSync(wcagMapPath, JSON.stringify(wcagMap, null, 2));
