const twit = require("twit-promise");
const config = require("../../Config/config.json");
const twit_configuration = config["TwitterApiSettings"];
const twitterObj = new twit(twit_configuration);
const baseTwitter= require("../Twitter/BaseTwitterService.js");


module.exports = class TwitterSearchApi extends baseTwitter
{
 
    async searchResults(query_string)
    {
        try
        {
            let result = await this.callTwitterService(query_string);
            return result;
        }
        catch(error)
        {
            return error;
        }
    }

}
