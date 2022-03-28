import { getAllRepos } from './ramdaRepos.js';
import { getAllPRs } from './ramdaPulls.js';
import { getWeeklyPRs } from './sortWeeks.js';

console.clear();
console.log('This may take a minute.  Please wait...');     // ~45 seconds for all repos

let prList = await gatherAllPRs();
if (!prList)
{
    console.error('**No PRs found.**');
    process.exit();
}

let totalPRs = countPRs(prList);
if (!totalPRs || totalPRs === 0){
    console.error('**Zero PRs found.**');
    process.exit();
}

let totalMerges = displayPRs(prList);
console.log('\nTotal PRs found: ' + totalPRs);
console.log('Total PRs merged: ' + totalMerges);

// Not needed, but it's a good visual separation from the main program
process.exit();

async function gatherAllPRs(){    
    let repoList = await getAllRepos();
    let prList = [];

    for (let i = 0; i < repoList.length; i++){
        let repoName = repoList[i].name;
        prList[repoName] = await getAllPRs(repoName);
    }
    return prList;
}

function countPRs(prList){
    let totalPRs = 0;

    for (let repo in prList){
        totalPRs += Object.keys(prList[repo]).length;
    }

    return totalPRs;
}

function displayPRs(prList){
    let prWeeks = getWeeklyPRs(prList);
    let totalMerges = 0;
    for (var prWeek in prWeeks){
        totalMerges += prWeeks[prWeek].length;
        console.log(prWeek + " - PRs this week: " + prWeeks[prWeek].length);
        for (let i = 0; i < prWeeks[prWeek].length; i++){
            console.log('\t' + prWeeks[prWeek][i].base.repo.name + ' - PR#' + prWeeks[prWeek][i].number);
        }
    }

    return totalMerges;
}