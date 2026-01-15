import { execSync } from 'child_process';
import { logError, logWarning } from './console';

/**
 * Get git user name
 */
export function getGitUserName(): string {
  try {
    return execSync('git config user.name', { encoding: 'utf-8' }).trim();
  } catch {
    return 'Unknown';
  }
}

/**
 * Get git user email
 */
export function getGitEmail(): string {
  try {
    return execSync('git config user.email', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown@example.com';
  }
}

/**
 * Fetch latest changes from remote
 */
export function gitFetch(): void {
  try {
    execSync('git fetch', { encoding: 'utf-8', stdio: 'ignore' });
  } catch {
    logWarning('Could not fetch latest changes from remote');
  }
}

/**
 * Check if current branch is behind master/main
 */
export function checkIfBehindMaster(): void {
  try {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    const defaultBranch = getDefaultBranch();
    
    if (currentBranch === defaultBranch) {
      const behind = execSync(`git rev-list --count HEAD..origin/${defaultBranch}`, {
        encoding: 'utf-8',
      }).trim();

      if (parseInt(behind) > 0) {
        logWarning(`Your branch is ${behind} commit(s) behind origin/${defaultBranch}`);
      }
    }
  } catch {
    // Ignore errors
  }
}

/**
 * Get default branch name (main or master)
 */
function getDefaultBranch(): string {
  try {
    const remoteInfo = execSync('git remote show origin', { encoding: 'utf-8' });
    const match = remoteInfo.match(/HEAD branch: (.*)/);
    return match ? match[1].trim() : 'main';
  } catch {
    return 'main';
  }
}
