import fs from "fs/promises";
const DATA_FILE = "./db.json"

//데이터 읽기 함수
const readData = async () => {
    try{
        const data = await fs.readFile(DATA_FILE);
        return JSON.parse(data);
    }  catch (err) {
        console.error("Error reading data: ", err);
        return { tests : []};
    }
};

//데이터 쓰기 함수
const writeData = async (data) =>{
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

//API 요청 처리
export default async function handler (req, res) {
    if (req.method === "GET") {
        const data = await readData();
        res.status(200).json(data);
    } else if (req.method === "POST") {
        const data = await readData();
        const newText = { id: Date.now(), text: req.body.text };

        data.tests.push(newText);
        await writeData(data);

        res.status(201).json(newText);
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}