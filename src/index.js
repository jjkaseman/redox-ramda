import { getAllPRs } from './ramdaPulls.js';
import {getWeeklyPRs} from './sortWeeks.js';

console.clear();
console.log('This may take a minute.  Please wait...');     // ~40 seconds

let prList = await getAllPRs();

if (!prList || prList.length === 0)
{
    console.error('**No PRs found.**');
    process.exit();
}

let prWeeks = getWeeklyPRs(prList);
let totalMerges = 0;
for (var prWeek in prWeeks){
    totalMerges += prWeeks[prWeek].length;
    console.log(prWeek + " - PRs this week: " + prWeeks[prWeek].length);
    for (let i = 0; i < prWeeks[prWeek].length; i++){
        console.log('\tPR#' + prWeeks[prWeek][i].number);
    }
}

console.log('\nTotal PRs found: ' + prList.length);
console.log('Total merges: ' + totalMerges);