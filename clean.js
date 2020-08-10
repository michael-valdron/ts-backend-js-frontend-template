const fs = require('fs-extra');

try {
    fs.removeSync('./dist/');
} catch (err) {
    console.log(err);
}