const config = require("../../Config/config.json");
const Glassdoor = require('node-glassdoor').initGlassdoor(config["GlassDoorApiSettings"]);
const fileName = "GlassdoorSearcService.js"

module.exports=class GlassdoorApi 
{
    
    async searchResults(company_name)
    {
        try
        {
            let response = await Glassdoor.findAllCompanies(company_name, 
            {
                country:"Germany"
            });

            console.log(response);
            return response;
        }
        catch(error)
        {
            return error;
        }

    }
}

