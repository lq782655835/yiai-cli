hconst fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const exec = require('./exec');
const execa = require('execa');

/**
 * git clone and run commands
 * @param {string} gitPath - Git Path
 * @param {string} options.branch - Which git branch
 */
module.exports = function gitClone(gitPath, name, options) {
    options = Object.assign({}, options);

    const tmpPath = path.resolve(__dirname, '../tmp');
    shell.cd(tmpPath);

    name = name || path.basename(gitPath, '.git');
    if (fs.existsSync(name)) {
        console.warn(`[WARN] An existing test project already exists for ${name}. May get unexpected test results due to project re-use`);
        console.warn('');
        shell.cd(name);
    } else {
        exec(`git clone ${gitPath} --depth 1${options.branch ? ' --branch ' + options.branch : ''} ` + name);
        shell.rm('-rf', '.git');
        shell.cd(name);

        exec('npm i --registry=https://registry.npm.taobao.org');
    }
    // 由于 vue-cli-plugin-vusion 在外面，有些包需要共用，指定路径和软链都不行，所以只能用拷贝的方式
    shell.rm('-rf', 'node_modules/vue-cli-plugin-vusion/*');
    const files = fs.readdirSync('../../../').filter((file) => file[0] !== '.' && file !== 'test' && file !== 'node_modules');
    files.forEach((file) => shell.cp('-r', `../../../${file}`, 'node_modules/vue-cli-plugin-vusion'));

    const projectRoot = path.join(tmpPath, name);

    return {
        name,
        dir: projectRoot,
        exec,
        execa: (command, args) => {
            [command, ...args] = command.split(/\s+/);
            return execa(command, args);
        },
        has(file) {
            return fs.existsSync(path.resolve(projectRoot, file));
        },
        read(file) {
            return fs.readFile(path.resolve(projectRoot, file), 'utf8');
        },
        write(file, content) {
            const targetPath = path.resolve(projectRoot, file);
            const dir = path.dirname(targetPath);
            return fs.ensureDir(dir).then(() => fs.writeFile(targetPath, content));
        },
        rm(file) {
            return fs.remove(path.resolve(projectRoot, file));
        },
    };
};
