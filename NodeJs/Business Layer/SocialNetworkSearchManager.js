const Utils = require("../utils.js")
module.exports = class SocialNetworkSearchManager
{
    constructor(twitter)
    {
        this.social_network_obj = twitter;
    }

    async searchResults(query_string,dataFormattingOptionalCallback)
    {
        let result = await this.social_network_obj.searchResults(query_string);
        if(!Utils.isError(result) && dataFormattingOptionalCallback)
        {
            result = await dataFormattingOptionalCallback(result)
        }
         return result;
    }

    
}

