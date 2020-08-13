const fs = require('fs-extra');
const childProcess = require('child_process');

try {
    fs.removeSync('./dist/');
    
    fs.copySync('./src/srv/public', './dist/public');
    fs.copySync('./src/srv/views', './dist/views');
    
    childProcess.exec('tsc --build tsconfig.json');
} catch (err) {
    console.log(err);
}