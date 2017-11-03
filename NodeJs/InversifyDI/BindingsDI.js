const inversify = require("inversify");
require("reflect-metadata");
const BaseTwitterService = require('../Business Layer/Twitter/BaseTwitterService.js')
const TwitterSearchService = require("../Business Layer/Twitter/TwitterSearchService.js");
const TwitterTrendsService = require("../Business Layer/Twitter/TwitterTrendsService.js");
const GlassDoor = require("../Business Layer/Glassdoor/GlassdoorSearchService.js");
const SocialNetworkSearchManager = require("../Business Layer/SocialNetworkSearchManager.js");
const SocialNetworkTrendsManager = require("../Business Layer/SocialNetworkTrendsManager.js")
const SentimentAnalysisManager = require("../Business Layer/SentimentAnalysisManager.js");

var TYPES = {
    SocialNetworkSearchManager: "SocialNetworkSearchManager",
    TwitterSearchService: "TwitterSearchService",
    Glassdoor:"GlassDoor",
    SocialNetworkTrendsManager:"SocialNetworkTrendsManager",
    TwitterTrendsService:"TwitterTrendsService",
    SentimentAnalysisManager:"SentimentAnalysisManager"
};

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), SocialNetworkTrendsManager);
inversify.decorate(inversify.injectable(), SocialNetworkSearchManager);
inversify.decorate(inversify.injectable(), BaseTwitterService);
inversify.decorate(inversify.injectable(), TwitterSearchService);
inversify.decorate(inversify.injectable(), TwitterTrendsService);
inversify.decorate(inversify.injectable(), GlassDoor);
inversify.decorate(inversify.injectable(), SentimentAnalysisManager);


// Injecting the Dependencies as mentioned below:
inversify.decorate(inversify.inject(TYPES.TwitterSearchService), SocialNetworkSearchManager, 0);

/*
The Searching from Twitter can be switched to Glassdoor as easily as by replacing the above line with the line with, the code block as below:
inversify.decorate(inversify.inject(TYPES.Glassdoor), SocialNetworkSearchManager, 0);
*/

inversify.decorate(inversify.inject(TYPES.TwitterTrendsService), SocialNetworkTrendsManager, 0);
// Declare bindings
var kernel = new inversify.Kernel();
kernel.bind(TYPES.TwitterSearchService).to(TwitterSearchService);
kernel.bind(TYPES.TwitterTrendsService).to(TwitterTrendsService);
kernel.bind(TYPES.Glassdoor).to(GlassDoor);
kernel.bind(TYPES.SocialNetworkSearchManager).to(SocialNetworkSearchManager);
kernel.bind(TYPES.SocialNetworkTrendsManager).to(SocialNetworkTrendsManager);
kernel.bind(TYPES.SentimentAnalysisManager).to(SentimentAnalysisManager);

module.exports={
    Kernel : kernel,
    IocMapping : TYPES
};

