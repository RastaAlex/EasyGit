'use strict';

const fs = require('fs');
const git = require('simple-git/promise');
const tryToCatch = require('try-to-catch');
const chokidar = require('chokidar');
let isProcess;

async function runGit() {
    await git().add('easygit.js');
    console.log('file add');
    await git().commit('new commit');
    console.log('file commit');
    await git().push('origin', 'master');
    console.log('file push');
    
}




chokidar.watch('.').on('change', async (event) => {
    const [error] = await tryToCatch(runGit);
    
    if (error)
        console.error(error);
});

// $ node easygit.js
// true
// file add
// file commit
// file push
// false
