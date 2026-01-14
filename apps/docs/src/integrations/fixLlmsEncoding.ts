import type { AstroIntegration } from 'astro';
import { writeFileSync, readFileSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';

export default function fixLlmsEncoding(): AstroIntegration {
  return {
    name: 'fix-llms-encoding',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = dir.pathname;
        
        // Copy component and guide files to root for easier access
        const componentsSrc = join(distPath, '_llms-txt/components.txt');
        const guidesSrc = join(distPath, '_llms-txt/guides.txt');
        const componentsDest = join(distPath, 'llms-components.txt');
        const guidesDest = join(distPath, 'llms-guides.txt');
        
        if (existsSync(componentsSrc)) {
          copyFileSync(componentsSrc, componentsDest);
          console.log('[fix-llms-encoding] ✅ Copied llms-components.txt to root');
        }
        
        if (existsSync(guidesSrc)) {
          copyFileSync(guidesSrc, guidesDest);
          console.log('[fix-llms-encoding] ✅ Copied llms-guides.txt to root');
        }
        
        const llmsFiles = [
          'llms-full.txt',
          'llms-components.txt',
          'llms-guides.txt',
          'llms.txt',
          'llms-small.txt',
          '_llms-txt/components.txt',
          '_llms-txt/guides.txt',
        ];

        console.log(`[fix-llms-encoding] Checking files in ${distPath}`);
        
        for (const fileName of llmsFiles) {
          const filePath = join(distPath, fileName);
          try {
            if (!existsSync(filePath)) {
              continue;
            }
            
            // Read file as UTF-8
            const content = readFileSync(filePath, 'utf-8');
            
            // Normalize line endings and ensure UTF-8 encoding
            // Add BOM for explicit UTF-8 marking
            const normalizedContent = content
              .replace(/^\uFEFF/, '') // Remove BOM if present
              .replace(/\r\n/g, '\n') // Normalize line endings
              .replace(/\r/g, '\n');
            
            // Add BOM and write file back with explicit UTF-8 encoding
            const contentWithBom = '\uFEFF' + normalizedContent;
            writeFileSync(filePath, contentWithBom, { encoding: 'utf8' });
            
            console.log(`✅ Fixed encoding for ${fileName}`);
          } catch (error) {
            // File might not exist, which is fine
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              console.warn(`⚠️  Could not fix encoding for ${fileName}:`, error);
            }
          }
        }
      },
    },
  };
}
