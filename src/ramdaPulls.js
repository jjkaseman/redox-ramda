
import fetch from "node-fetch";

export async function getAllPRs() {        
        let pat = '**ENTER YOUR PERSONAL ACCESS TOKEN**';   // Don't store this on GitHub...
        let maxPRs = 100;   // per_page max = 100, default = 30
        let pageCount = 1;
        let morePRs = true;
        let prList = [];
        
        while (morePRs){
            // 'state = aLL' pulls open & closed
            await fetch('https://api.github.com/repos/ramda/ramda/pulls?state=all&per_page=' + maxPRs + '&page=' + pageCount + '&direction=asc', { 
                method: 'GET',
                headers: {
                    'Authorization': 'token ' + pat,    // This allows 5000 API calls per hour vs. 60 per hour
                }})
                .then(response => response.json())
                .then(data => { 
                    if (data.length > 0){
                        prList = prList.concat(data);
                    }
                    // console.log("Page " + pageCount);
                    
                    if (data.length < maxPRs){
                        morePRs = false;
                    }
                    else{
                        pageCount++;
                    }
                })
                .catch(error => console.error(error));
        }
        return prList;
    }