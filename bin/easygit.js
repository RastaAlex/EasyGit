'use strict';

const fs = require('fs');
const git = require('simple-git/promise');
const tryToCatch = require('try-to-catch');

async function main() {
    await git().add('easygit.js');
    await git().commit('new commit');
    await git().push('origin', 'master');
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
