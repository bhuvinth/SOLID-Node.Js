//#region Init
const port = process.ListenPort || 8088; 
const express = require('express');
const app = express();
const views = app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
require("./routeHandlers.js")(app);
//#endregion

app.listen(port);

process.on('unhandledRejection', error => {
    // Won't execute
    console.log('unhandledRejection');
    console.error(error);
});

process.on('unhandledError', error => {
    // Won't execute
    console.log('unhandledRejection');
    console.error(error);
});