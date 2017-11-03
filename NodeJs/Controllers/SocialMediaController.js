//This is the Controller which deals with the relevant implementations by calling the Business layer
const BindingsDI = require("../InversifyDI/BindingsDI.js");
const Utils = require("../utils.js")

module.exports = class SocialMediaController
{
    constructor()
    {}

    getDocumentation(request, response)
    {
        response.statusCode = 200;
        response.render('documentation.html');
    }

    getDefaultPage(request, response)
    {
        response.statusCode = 200;
        response.render('index.html');
    }

    async getSocialNetworkSentiment(request, response)
    {
        let query_string = request.params.queryString;

        if(!query_string)
        {
            response.render('errorpage.html')
        }

        let social_obj = BindingsDI.Kernel.get(BindingsDI.IocMapping.SocialNetworkSearchManager);

        /* Interface Segregation principle.*/
        let result = await social_obj.searchResults(query_string, async (tweet_result)=>{
            console.log(tweet_result);
            let sentiment_obj=BindingsDI.Kernel.get(BindingsDI.IocMapping.SentimentAnalysisManager);
            let overall_score = 0;
            let sentiment_result=":-|";
            let textArray=[];
            tweet_result.data.statuses.forEach(function(element) {
                textArray.push(element.text);
            }, this);

            overall_score = await sentiment_obj.getSentimentScore(textArray);

            if(overall_score > 0)
            {
                sentiment_result= ":-D"
            }
            else if(overall_score < 0)
            {
                sentiment_result = ":-("
            }
            
            return sentiment_result;
        });
        
        if(!Utils.isError(result))
        {
            response.send(result);
            return;
        }
        response.statusCode = 500;
        response.render('errorpage.html')
    }

    async searchSocialNetwork(request, response)
    {
        let query_string = request.params.queryString;

        if(!query_string)
        {
            response.render('errorpage.html')
        }

        let social_obj = BindingsDI.Kernel.get(BindingsDI.IocMapping.SocialNetworkSearchManager);
        let result = await social_obj.searchResults(query_string);
        
        if(!Utils.isError(result))
        {
            response.send(result);
            return;
        }
        response.statusCode = 500;
        response.render('errorpage.html')
    }

    async getTrends(request, response)
    {
        let social_obj = BindingsDI.Kernel.get(BindingsDI.IocMapping.SocialNetworkTrendsManager);
        let result = await social_obj.getTrends();
        if(!Utils.isError(result))
        {
            response.send(result);
            return;
        }
        response.statusCode = 500;
        response.render('errorpage.html')
    }

    async getCompanyDetails(request, response)
    {
        let query_string = request.params.company;
        if(!query_string)
        {
            response.render('errorpage.html')
        }
        let social_obj = BindingsDI.Kernel.get(BindingsDI.IocMapping.Glassdoor);
        let result = await social_obj.searchResults(query_string);
        if(!Utils.isError(result))
        {
            response.send(result);
            return;
        }
        response.statusCode = 500;
        response.render('errorpage.html')
    }

}