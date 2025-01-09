import { access, copyFile, mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

async function copyDirectory(src: string, destination: string) {
    await mkdir(destination, { recursive: true });

    const entries = await readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(destination, entry.name);

        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else if (entry.isFile()) {
            await copyFile(srcPath, destPath);
        }
    }
}

async function getVersion() {
    const pkg = await getPackage();
    return pkg.version;
}

async function getPackage() {
    const isExists = await validate('./package.json');
    if (!isExists) throw new Error('package.json is not exists');

    const pkg = await readFile('./package.json', 'utf8');
    return JSON.parse(pkg);
}

async function validate(src: string) {
    try {
        await access(src);
        return true;
    } catch (err) {
        return false;
    }
}

async function build() {
    const version = await getVersion();

    const root = resolve(fileURLToPath(import.meta.url), '../../docs');
    const scoped = join(root, '@kabeep');
    const src = join(scoped, `exception/${version}`);
    const isExists = await validate(src);
    if (!isExists) throw new Error('Docs directory does not exist.');

    await copyDirectory(src, root);
    await rm(scoped, { force: true, recursive: true, maxRetries: 3, retryDelay: 100 });
    return 'Successfully copied files to docs directory root.';
}

build().then(console.log).catch(console.error);
