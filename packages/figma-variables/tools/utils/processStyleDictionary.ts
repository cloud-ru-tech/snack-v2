import StyleDictionary, { type Config } from 'style-dictionary';

import { logger } from './logger.js';

export async function processStyleDictionary(
  configs: Config[],
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<string[]> {
  const allCreatedFiles = new Set<string>();

  async function buildConfig(cfg: Config) {
    // Configure logging to suppress token collision warnings and default file output logs
    // Token collisions are expected when merging multiple token sets with overlapping paths
    // We control our own logging via logMessage, so suppress Style Dictionary's default output
    // Merge with existing log config from cfg to preserve settings like brokenReferences
    const logConfig: Config['log'] = {
      warnings: 'disabled', // Disable collision warnings as they are expected in our use case
      verbosity: 'silent', // Suppress default file output logs - we'll output file names ourselves
      // Preserve error settings from cfg if they exist (e.g., brokenReferences: 'console')
      ...(cfg.log?.errors && { errors: cfg.log.errors }),
    };

    const sd = new StyleDictionary({
      ...cfg,
      log: logConfig,
    });

    if (collectResults) {
      // For browser mode: use formatPlatform to get results without writing files
      const platformResults = await sd.formatAllPlatforms();

      for (const [_platform, files] of Object.entries(platformResults)) {
        const fileArray = files as Array<{
          output: unknown;
          destination?: string;
        }>;
        for (const file of fileArray) {
          if (file.destination && file.output) {
            const destination = file.destination;
            const output = String(file.output);

            // Determine type from destination path
            let type: 'css' | 'scss' | 'ts' = 'css';
            if (destination.endsWith('.scss') || destination.endsWith('.module.scss')) {
              type = 'scss';
            } else if (destination.endsWith('.ts') || destination.endsWith('.js')) {
              type = 'ts';
            }

            collectResults(type, destination, output);
          }
        }
      }
    } else {
      // For Node.js mode: write to files and collect file names
      // First, get platform results to determine which files will be created
      // For TS files, we might have reference errors that we can ignore
      // Try to build files directly, even if formatAllPlatforms fails
      let platformResults: Record<string, Array<{ output: unknown; destination?: string }>> = {};
      try {
        platformResults = await sd.formatAllPlatforms();
      } catch (error) {
        // If formatAllPlatforms fails due to reference errors, we'll try to build anyway
        // Sometimes Style Dictionary can still generate files despite reference errors
        const errorMessage = String(error);
        if (errorMessage.includes('Reference Errors') || errorMessage.includes('could not be found')) {
          // Continue to buildAllPlatforms - it might still work
        } else {
          // For other errors, rethrow
          throw error;
        }
      }

      logger.debug('formatAllPlatforms results:', Object.keys(platformResults));

      for (const [_platform, files] of Object.entries(platformResults)) {
        const fileArray = files as Array<{
          output: unknown;
          destination?: string;
        }>;
        logger.debug(`Platform ${_platform} has ${fileArray.length} files`);
        for (const file of fileArray) {
          if (file.destination && file.output) {
            const destination = file.destination;
            // Only collect files that have actual content
            const output = String(file.output);
            if (output.trim().length > 0) {
              allCreatedFiles.add(destination);
              logger.debug(`Will create file: ${destination} (${output.length} chars)`);
            }
          }
        }
      }

      // Build files (this actually writes them to disk)
      // Note: buildAllPlatforms may create additional files, but formatAllPlatforms
      // should give us the list of files that will be created
      try {
        await sd.buildAllPlatforms();
        logger.debug('buildAllPlatforms completed. Created files:', Array.from(allCreatedFiles));
      } catch (error) {
        const errorMessage = String(error);
        // If buildAllPlatforms fails due to reference errors, we might still have created some files
        if (errorMessage.includes('Reference Errors') || errorMessage.includes('could not be found')) {
          // Don't throw - files might have been created anyway
          // Reference errors are expected and handled via brokenReferences: 'console' config
        } else {
          // For other errors, rethrow
          logger.error('buildAllPlatforms failed:', error);
          throw error;
        }
      }
    }
  }

  await Promise.all(configs.map(buildConfig));

  // Return list of created files for validation
  // Файлы теперь логируются в buildCSSFiles/buildSCSSFiles/buildTSFiles через fileList
  return Array.from(allCreatedFiles);
}
