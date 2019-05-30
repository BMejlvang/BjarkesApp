const http = require('http');
const port=process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
var textString="";

// REMEMBER: escape('Calippo123#') -> "Calippo123%23"
// the URI must be: "mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.mongodb.net/DBNAME"
const uri = "mongodb+srv://BjarkeM:21616Bjarke@bjarkesapp-st1hy.mongodb.net/" + "roomDB";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    if (err) console.log(err);

    const collection = client.db("roomDB").collection("roomCollection");

    /*
        // debug only ...
        console.log( collection );
        console.log( collection.find({}) );
    */

    collection.find({ "roomName": "Kitchen" }).toArray((err, docs) => {
        if (err) console.log(err);
        console.log("Found the following records");
        //console.log(docs);
        client.close(); // last thing done!
        console.log(' ...Done ');

        console.log('---------------------------------------');
        console.log('you entered the ' + docs[0].roomName);
        console.log('and see the following items ');
        for (let i = 0; i < docs[0].Items.length; i++) {
            console.log((i + 1) + ' -> ' + docs[0].Items[i]);
            textString += docs[0].Items[i];
        }
        console.log('---------------------------------------');
    });

});

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>Hello World by Bjarke</h1><p>'+textString+'</p>');
});

server.listen(port,() => {
	console.log(`Server running at port `+port);
});




console.log(' Started... (count to 15 while you wait for the connection to be established!) ');