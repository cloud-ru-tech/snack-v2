import fs from 'fs/promises';

import { ensureArray } from './ensureArray.js';
import { logger } from './logger.js';

export const deleteFiles = async (pathParam: string | string[]): Promise<void> => {
  const paths = ensureArray(pathParam);

  for (const path of paths) {
    try {
      await fs.unlink(path);
      logger.debug(`- ${path} deleted`);
    } catch (_error) {
      // File might not exist, ignore error
    }
  }
};
