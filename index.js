let express = require("express");
let app = express();
app.use(express.json());
let port = process.env.PORT || 3000;

let housePos = new Array(20);

for (let i = 0; i<housePos.length; i++){
    housePos[i] = new Array(20);
}

for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        housePos[i][j] = 0;
    }
}


//connecting to quickmongo
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://project3:project3@project3.uxb6pkg.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

app.use("/", express.static("intro"));

app.post("/houses", (req,res) => {
    let randW = Math.floor(Math.random() * 7);
    let randH = Math.floor(Math.random() * 7);
    do{
        randW = Math.floor(Math.random() * 7);
        randH = Math.floor(Math.random() * 7);
        if (housePos[randW][randH] == 0) break;
        console.log(randW,randH);
    }
    while(housePos[randW][randH] != 0);
    housePos[randW][randH] = 1;
    let obj = {
        house: req.body,
        posX: randW,
        posY: randH
    }
    db.push("userHouses", obj);
    db.get("userHouses").then(houseData =>{
        console.log(houseData);
    })
})

app.get("/houses", (req,res) => {
    let obj;
    db.get("userHouses").then(houseData =>{
        console.log(houseData);
        obj = {data: houseData};
        res.json(obj);
        // housePos[houseData.posX][houseData.posY] = 1;
        houseData.forEach(element => {
            console.log(element.posX);
            console.log(element.posY);
            housePos[element.posX][element.posY] = 1;
        });
    })

  })

app.listen(port, ()=>{
    console.log("server is runing on port " + port)
})