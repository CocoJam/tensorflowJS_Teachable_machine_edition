const fs = require('fs-extra');

const dir = './dist/web';
fs.pathExists(dir)
    .then((exists) => {
    console.log(exists);
if (exists) {
    return ;
} else {
    fs.ensureDirSync(dir);
}
});

fs.copy('./src/web/', './dist/web', err => {
    if (err) return console.error(err);
console.log('success!');
});