var shell = require("shelljs");
var command = [
  'git commit -am "Save local changes"',
  'git checkout -B gh-pages',
  'git add -f build',
  'git commit -am "Rebuild website"',
  'git filter-branch -f --prune-empty --subdirectory-filter build',
  'git push -f origin gh-pages',
  'git checkout -'
];

console.log('Launching upload to Github Pages');

shell.exec(command.join(' && '), function() {
  console.log('Upload finished !');
});


