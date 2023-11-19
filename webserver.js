let express = require("express");
let cors = require("cors");
let fs = require("fs");


let app = express();
app.use(express.json());
app.use(cors());
app.get("/", function(req, res){
    


    res.sendFile(__dirname + process.argv[2]);
})
app.get("/*", function(req, res){
    

    let isDirExists = fs.existsSync("./" + req.originalUrl.replaceAll("../","")) && fs.lstatSync("./" + req.originalUrl.replaceAll("../","")).isDirectory()
    if (isDirExists) {
        let data = JSON.stringify(fs.readdirSync("./" + req.originalUrl.replaceAll("../","")))
        res.send(data)
    }
    let send=  __dirname + decodeURIComponent(req.originalUrl)
    // console.log(send);
    res.sendFile(send.replaceAll("../",""));
})
app.post("/*", function(req, res){
    


    let write =  __dirname + decodeURIComponent(req.originalUrl)
    // console.log("Writing to:", write);
    // console.log(req.body)
    res.send("");
    res.status(200);
    fs.writeFileSync(write, req.body.data);
})
app.listen(80);