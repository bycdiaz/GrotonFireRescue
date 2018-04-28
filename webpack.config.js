const path = require('path');
const fs = require('fs-extra');

module.exports = {
  entry: getEntries(),
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public', 'javascript'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};

function getEntries() {
  const srcFolder = path.join(__dirname, 'public', 'javascript', 'src');
  const entries = {};
  fs.readdirSync(srcFolder).forEach((entry) => {
    const filename = entry.split('.')[0];
    if (filename === 'layout') {
      entries[filename] = ['babel-polyfill', path.join(srcFolder, `${filename}.js`)];
      return;
    }
    entries[filename] = path.join(srcFolder, `${filename}.js`);
  });

  return entries;
}
