const sentiment = require("sentiment");
module.exports= class SentimentAnalysis{

    async getSentimentScore(textArray)
    {
        let overall_score = 0;
        textArray.forEach(function(text) {
            overall_score =overall_score+ sentiment(text).score
        }, this);
        return overall_score;
    }

}