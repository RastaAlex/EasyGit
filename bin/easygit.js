'use strict';

const fs = require('fs');
const git = require('simple-git/promise');
const tryToCatch = require('try-to-catch');
const chokidar = require('chokidar');
let isProcess;

async function runGit() {
    if (isProcess === true) {
        return;
    }
    isProcess = true;
    console.log(isProcess);
    await git().add('easygit.js');
    console.log('file add');
    await git().commit('new commit');
    console.log('file commit');
    await git().push('origin', 'master');
    console.log('file push');
    isProcess = false;
    console.log(isProcess);
    
}
//main().catch((err) => console.log(err.message));

chokidar.watch('.').on('change', async (event) => {
    // if (event === 'change') {
    //     await runGit();
    // }
    const [error] = await tryToCatch(runGit);
    
    if (error)
        console.error(error);
});
