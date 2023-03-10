module.exports = {

  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',


  '**/*.(ts|tsx|js)': filenames => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],


  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
};
// const path = require('path')

// const buildEslintCommand = (filenames) =>
//   `next lint --fix --file ${filenames
//     .map((f) => path.relative(process.cwd(), f))
//     .join(' --file ')}`

// module.exports = {
//   '*.{js,jsx,ts,tsx}': [buildEslintCommand],
// }