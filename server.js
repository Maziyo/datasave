const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = "5000";
const DATA_FILE = "./db.json";

app.use(express.json());
app.use(cors());

let cacheData = {texts : []};

//초기 데이터 로드


const readData = () => {
    try{
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);

    } catch(err){
        console.log("Error reading data: " , err);
        return {text : []};
    }
};

readData(); //서버 시작 시 데이터 로드

//JSON 파일 변경 감지(자동 업데이트)
fs.watchFile(DATA_FILE, (curr, prev) =>{
    if(curr.mtime !== prev.mtime){
        console.log("데이터 파일이 변경됨. 다시 로드 중. . .");
        readData();
    }
});


const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

app.get("/tests", (req, res) => {
    console.log("Received Get request on /tests");
    const data = readData();
    res.json(data);
});

app.post("/tests", (req,res) => {
    const data = readData();
    const newText = {id : Date.now(), text : req.body.text} //test인지 확인

    data.tests.push(newText);
    writeData(data);

    res.json(newText);
});

app.listen(PORT, console.log(`서버 실행 중 : http://localhost:${PORT}`));