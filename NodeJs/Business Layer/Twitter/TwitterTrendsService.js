const twit = require("twit-promise");
const config = require("../../Config/config.json");
const twitConfiguration = config["TwitterApiSettings"];
const twitterObj = new twit(twitConfiguration);
const baseTwitter= require("../Twitter/BaseTwitterService.js");

/*
Implementation of Open Closed principle and Liskov's Substitution principle.
Open-Closed principle: We made a seperate class implementation so as to Extend the functionality of BaseSearchService to getting Trends also. 
We extended the Base class and added the functionality rather than Changing the base class's functionality so as to support calling Trends 
related service.
Liskov's Substitution principle: The Parent class is completely replaceable by the Child class in terms of there are no breaking changes, 
though the functionality is different,
but the implementation won't be breaking the Concern.
*/

module.exports = class TwitterTrendsApi extends baseTwitter
{
    getInput(search_query)
    {
       let params= {
            id :search_query
       };

       return params;
    }

    getUrl()
    {
        return config["TwitterTrendsUrl"];
    }

    /*
    If this had been the case then it might be a outright Violation of the Liskov's
    Substitution principle.
    async CallTwitterService(queryString)
    {
        throw "Not Implemented";
    }
    */

    async callTwitterService(query_string)
    {
        let params=this.getInput(query_string);
        let url = this.getUrl();
        let result = await twitterObj.get(url,params);
        return result;
    }

    async getTrends()
    {
        try
        {
            let woeid = 1;
            let result = await this.callTwitterService(woeid);
            
            console.log(result);
            return result;
        }
        catch(error)
        {
            return error
        }
        
    }
}