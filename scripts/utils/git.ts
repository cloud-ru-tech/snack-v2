import { execSync } from 'child_process';
import { resolve } from 'path';

import { logWarning } from './console';

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
 * Get list of staged files
 */
export function getStagedFiles(): string[] {
  return String(execSync('git diff --name-only --cached', { encoding: 'utf-8' }))
    .split('\n')
    .filter(Boolean)
    .map((file) => resolve(__dirname, './../../', file));
}

/**
 * Get list of changed unstaged files
 */
export function getChangedUnstagedFiles(): string[] {
  return String(execSync('git ls-files --exclude-standard --others -m', { encoding: 'utf-8' }))
    .split('\n')
    .filter(Boolean)
    .map((file) => resolve(__dirname, './../../', file));
}
