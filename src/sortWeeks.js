export function getWeeklyPRs(prList){
    let weeklyPRs = [];

    for (let i = 0; i < prList.length; i++){
        let pr = prList[i];

        // Not merged, no point in tracking it
        if (!pr.merged_at || pr.merged_at === null){
            continue;
        }

        let prMergeTime = new Date(Date.parse(pr.merged_at));
        // Find the Sunday before the PR    // 86400000 = 1 day in milliseconds
        let prMergeWeekDate = new Date((Math.floor(prMergeTime/86400000) - prMergeTime.getUTCDay()) * 86400000);
        // get[UTC]Month starts at 0... 
        let prMergeWeek = prMergeWeekDate.getUTCFullYear() + '-' + (prMergeWeekDate.getUTCMonth() + 1) + '-' + prMergeWeekDate.getUTCDate();

        // Add PRs for each week, or create a new entry for the week
        if (weeklyPRs[prMergeWeek]){
            weeklyPRs[prMergeWeek].push(pr);
        }
        else{
            weeklyPRs[prMergeWeek] = [pr];
        }
    }

    return weeklyPRs;
}