const requestBodyparser = require("../util/body-parser");
const dbFile = require("../util/jsonDatabase");
module.exports = async (req, res) => {
    console.log('reqpost',req)
    if(req.url === "/api/adduser"){
        try{
            let body = await requestBodyparser(req);
            req.userDetails.push(body)
            dbFile(req.userDetails)
            // res.writeHead(201, {"Content-Type": "application/json"});
            // res.end(JSON.stringify({
            //    // title: 'validation failed',
            //     message:'Added Successfully'}))
            res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(req.userDetails));
        }catch(err){
            console.log('err from post request', err);
           
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({
                title: 'validation failed',
                message:'request body is not valid'}))
        }
    }
};