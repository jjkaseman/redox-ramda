export function getWeeklyPRs(prList){
    let weeklyPRs = [];

    // Combine all repos into the same list
    for (let repo in prList){

        for (let i = 0; i < prList[repo].length; i++){
            let pr = prList[repo][i];

            // Not merged, no point in tracking it
            if (!pr.merged_at || pr.merged_at === null){
                continue;
            }

            let prMergeTime = new Date(Date.parse(pr.merged_at));
            // Find the Sunday before the PR    // 86400000 = 1 day in milliseconds
            let prMergeWeekDate = new Date((Math.floor(prMergeTime/86400000) - prMergeTime.getUTCDay()) * 86400000);
            // format as YYYY-MM-DD     // get[UTC]Month starts at 0... 
            let prMergeWeek = prMergeWeekDate.getUTCFullYear() + '-' + ('00' + (prMergeWeekDate.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + prMergeWeekDate.getUTCDate()).slice(-2);

            // Add PRs for each week, or create a new entry for the week
            if (weeklyPRs[prMergeWeek]){
                weeklyPRs[prMergeWeek].push(pr);
            }
            else{
                weeklyPRs[prMergeWeek] = [pr];
            }
        }
    }
    
    // Return PRs based on merge date, not create date
    return Object.keys(weeklyPRs).sort().reduce(
        (obj, key) => {
            obj[key] = weeklyPRs[key];
            return obj;
        },
        {}
    );
}