const twit = require("twit-promise");
const config = require("../../Config/config.json");
const twitConfiguration = config["TwitterApiSettings"];
const twitterObj = new twit(twitConfiguration);

module.exports= class BaseTwitterService
{
    constructor()
    {
        this.getInput = this.getInput.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.callTwitterSearchResult = this.callTwitterService.bind(this);
    }
    getInput(search_query)
    {
       let params= {
           q :search_query
       }
       return params;
    }

    getUrl()
    {
        return config['TwitterSearchUrl'];
    }

    async callTwitterService(query_string)
    {
        let params=this.getInput(query_string);
        let url = this.getUrl();
        let result = await twitterObj.get(url,params);
        return result;
    }


    
}