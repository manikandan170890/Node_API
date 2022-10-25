const requestBodyparser = require("../util/body-parser");
const dbFile = require("../util/jsonDatabase");
module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3]; 
    if(baseUrl === "/api/updateuser/" && id !== ''){
        try{
            let body = await requestBodyparser(req);
            const index = req.userDetails.findIndex((user) => {
                return user.id === id;
            })
            if(index === -1) {        
                res.statusCode= 404;
                res.write(JSON.stringify({
                    title: 'Not Found',
                    message:'Invalid UserID'}));
                res.end(); 
               }else{
                req.userDetails[index] = { id, ...body };
                dbFile(req.userDetails);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(req.userDetails));
               }
        }catch(err){
            console.log('err from post request', err);
           
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({
                title: 'validation failed',
                message:'request body is not valid'}))
        }
    }else{
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({
            title: 'Not FOund',
            message:'Route Not Found'}))
    }
};