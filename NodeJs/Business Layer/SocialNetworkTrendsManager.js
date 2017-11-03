module.exports= class SocialNetworkTrendsService
{
    constructor(twitter)
    {
        this.social_network_obj = twitter;
    }

    async getTrends()
    {
         let result = await this.social_network_obj.getTrends();
         return result;
    }
}