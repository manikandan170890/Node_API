const dbFile = require("../util/jsonDatabase");
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];
    // console.log(baseUrl)
    if(req.url === "/api/deleteuser") {
        res.statusCode= 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.userDetails.length > 0 ? req.userDetails : {title:200, message:'No Data Found'} ));
        res.end();  
    }else if(baseUrl === "/api/deleteuser/" && id !== '') {
       
        res.setHeader("Content-Type", "application/json");
        
        /*let getUser = req.userDetails.filter((user) => {
            return user.id !== id;


        });*/

        const index = req.userDetails.findIndex((user) => {
            return user.id === id;
        })
       // console.log('getUser',getUser)
       if(index === -1) {        
        res.statusCode= 404;
        res.write(JSON.stringify({
            title: 'Not Found',
            message:'Invalid UserID'}));
        res.end(); 
       }else{
        req.userDetails.splice(index,1);
        dbFile(req.userDetails);
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(req.userDetails))
       }
       
          
    }else{
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({
            title: 'Not FOund',
            message:'Route Not Found'}))
    }
};