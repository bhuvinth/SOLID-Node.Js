const socialMediaController = require("./Controllers/SocialMediaController.js")
module.exports = function(app)
{

app.get('/documentation', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.getDocumentation(request, response);
    });
app.get('/', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.getDefaultPage(request, response);
    
    });

app.get('/SocialSentiment/:queryString', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.getSocialNetworkSentiment(request, response);
});

app.get('/SearchSocialNetwork/:queryString', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.searchSocialNetwork(request, response);
});

app.get('/Trends', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.getTrends(request,response);
});

app.get('/SearchCompany/:company', async function(request, response){
    let social_controller_obj = new socialMediaController();
    social_controller_obj.getCompanyDetails(request,response);
});
}