
import fetch from "node-fetch";

export async function getAllRepos() {        
        let pat = '**ENTER YOUR PERSONAL ACCESS TOKEN**';   // Don't store this on GitHub...
        let maxRepos = 100;   // per_page max = 100, default = 30
        let pageCount = 1;
        let moreRepos = true;
        let repoList = [];

        if (pat.startsWith('**')){
            console.error('**Set your personal access token above.**');
            return [];
        }
        
        try {
            while (moreRepos){
                // 'state = aLL' pulls open & closed
                let response = await fetch('https://api.github.com/orgs/ramda/repos?type=all&per_page=' + maxRepos + '&page=' + pageCount + '&direction=asc', { 
                    method: 'GET',
                    headers: {
                        'Authorization': 'token ' + pat,    // This allows 5000 API calls per hour vs. 60 per hour
                    }});
                let data = await response.json();
                
                if (data.length > 0){
                    repoList = repoList.concat(data);
                }
                // console.log("Page " + pageCount);
                        
                if (data.length < maxRepos){
                    moreRepos = false;
                }
                else{
                    pageCount++;
                }
            }
        }
        catch (error){
            console.log('Error thrown while retrieving page #' + pageCount);
            console.error(error);
        }
        return repoList;
    }