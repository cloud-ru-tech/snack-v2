import { execSync } from 'child_process';

import inquirer from 'inquirer';

import { logDebug, logError, logHelp, logInfo, logSuccess } from './utils/console';
import { bootstrapFiles, ExistingPackageNames } from './utils/files';
import * as gitUtils from './utils/git';

const user = gitUtils.getGitUserName();
const email = gitUtils.getGitEmail();

gitUtils.gitFetch();
gitUtils.checkIfBehindMaster();

const generatePackageName = (title: string) => title.trim().replace(/\s+/g, '-').toLowerCase();

const generatePackageTitle = (input: string) =>
  input
    .toLowerCase()
    .replace(/(^| )(\w)/g, x => x.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();

const generateComponentName = (title: string) => generatePackageTitle(title).replace(/\s+/g, '');

const printInfoMessages = () => {
  logInfo(`Package Title format (the script will throw a validation error if you dont follow these rules):
  1. Can only contain a-z,A-Z,0-9 and spaces
  2. Has to be unique
  3. Will automatically be Capitalized`);

  logInfo(`The package title will be used for:
  1. Package Title in package.json (Example package name: "My New Package")
  2. Folder- and filenames - will be converted to lowercase and hyphen-separated (for example my-new-package)
  3. Componentname - will remove spaces and get PascalCased (for example MyNewPackage)`);

  logHelp('Answer the following questions to get started, or press CTRL+C (or Control+C) to abort...');
};

printInfoMessages();

inquirer
  .prompt([
    {
      type: 'input',
      name: 'packageTitle',
      message: 'Package Title (e.g., "Button", "Modal Dialog"):',
      filter: (input: string) => generatePackageTitle(input),
      validate: (input: string) => {
        if (!input.match(/^([0-9a-zA-Z]+ ?)*$/)) {
          return 'Package title can only contain letters a-z, A-Z, numbers 0-9 and spaces';
        }
        if (ExistingPackageNames.includes(generatePackageName(input))) {
          return `A package with the name ${input} already exists - please see if it fits your use-case, or choose a different name`;
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'packageDescription',
      message: 'Package Description (optional):',
      default: '',
    },
  ])
  .then(answers => {
    logDebug('Generating files...');

    const packageTitle = answers.packageTitle.trim();
    const packageName = generatePackageName(packageTitle);
    const componentName = generateComponentName(packageTitle);
    const packageRootFolderName = packageName.toLowerCase();

    bootstrapFiles({
      packageRootFolderName,
      user,
      email,
      packageTitle,
      packageName,
      componentName,
      packageDescription: answers.packageDescription,
    });

    logSuccess('Finished generating files!');
    logInfo('Installing dependencies...');

    try {
      execSync('pnpm install', { stdio: 'inherit' });
      logSuccess('Dependencies installed!');
    } catch {
      logError('Failed to install dependencies');
      logError('Please run "pnpm install" manually');
    }

    logSuccess(`Your new package is located in packages/${packageRootFolderName}`);
    logHelp('You can start working on the package now :)');
    logInfo(`
Next steps:
  1. Customize the component in packages/${packageRootFolderName}/src/${componentName}.tsx
  2. Add JSDoc comments to props for automatic documentation
  3. Update documentation in packages/${packageRootFolderName}/docs/index.mdx
  4. Update styles in packages/${packageRootFolderName}/src/styles.module.scss
  5. Add stories in packages/${packageRootFolderName}/stories/${componentName}/ (Playground уже создан по стандарту)
  6. Generate documentation: pnpm docgen:all
  7. Build all packages: pnpm -w run build:packages
  8. View in Storybook: pnpm storybook

Documentation generation:
  - Props table will be auto-generated in docs/index.mdx from TypeScript types
  - README.md will be auto-generated from the documentation
  - Use JSDoc comments (/** ... */) to document your props
  - Run 'pnpm docgen:all' after making changes to regenerate docs
    `);
  })
  .catch(err => {
    if (err.isTtyError) {
      logError("Prompt couldn't be rendered in the current environment");
    } else {
      logError('Something went wrong:');
      logError(err.message);
    }
    process.exit(1);
  });
