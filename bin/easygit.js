'use strict';

const fs = require('fs');
const git = require('simple-git/promise');
const tryToCatch = require('try-to-catch');

async function main() {
    let inProcess = true;
    console.log(inProcess);
    await git().add('easygit.js');
    console.log('file add');
    await git().commit('new commit');
    console.log('file commit');
    await git().push('origin', 'master');
    console.log('file push');
    inProcess = false;
    console.log(inProcess);
}
//main().catch((err) => console.log(err.message));

fs.watch('./', async (event) => {
    if (event === 'change') {
        await main();
    }
    const [error] = await tryToCatch(main);
    
    if (error)
        console.error(error);
});
