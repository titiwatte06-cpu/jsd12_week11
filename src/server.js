import express from "express";
import cors from "cors"

import { users } from "./fakeData/fakeUsers.js";


const app = express();

app.use(cors());    //middleware 1

app.use(express.json());   //middleware2

app.get("/",(req,res) => {
    res.send(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Express + Tailwind</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="min-h-screen bg-gray-50 text-gray-800">
      <main class="max-w-2xl mx-auto p-8">
        <div class="rounded-xl bg-white shadow-sm ring-1 ring-gray-100 p-8">
          <h1 class="text-3xl font-bold tracking-tight text-blue-600">
            Hello Client, I am your Server!
          </h1>
          <p class="mt-3 text-gray-600">
            This page is styled with <span class="font-semibold">Tailwind CSS</span> via CDN.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a href="/api/v2/users" class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              GET /users
            </a>
            <span class="text-xs text-gray-500">Try POST/PUT/DELETE with your API client.</span>
          </div>
        </div>
        <footer class="mt-10 text-center text-xs text-gray-400">
          Express server running with Tailwind via CDN
        </footer>
      </main>
    </body>
  </html>`)
})

app.get("/users",(req,res) => {
    res.json(users);

});

app.post("/users",(req,res) => {
  const { username, email , password} = req.body || {}
// || {} ป้องกัน crash ถ้า body เป็น undefined

// บรรทัด 52-54 — validate ก่อน ถ้าไม่มีค่าส่ง error กลับ
if (!username || !email) {
  return res.status(400).json({ error: "username and email are required" })
}

// บรรทัด 57-59 — หา id ใหม่ด้วย reduce
const nextId = String(
  (users.reduce((max, u) => Math.max(max, Number(u.id)), 0) || 0) + 1
)
// วนหา id สูงสุดใน array แล้ว +1
// เช่น users มี id 1,2,3 → nextId = "4"

// บรรทัด 61 — สร้าง object user ใหม่
const newUser = { id: nextId, username, email , password }

// บรรทัด 63 — เพิ่มเข้า array (mock database)
users.push(newUser)

// บรรทัด 65 — ส่ง user ที่สร้างกลับไป + status 201
return res.status(201).json(users)

});

app.put('/users/:id', (req, res) => {

  const user = users.find(u => u.id === req.params.id)
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const {username ,email,password} = req.body;

  if(!username || !email || !password){
    return res
    .status(400)
    .json({error:"username, email and password are required!"});
  }

  user.username = username;
  user.email = email;
  user.password = password;

  res.status(200).json(users);
})

app.post("/add", (req, res) => {
    const newUser = req.body  
    users.push(newUser)       
    res.json({ message: "done", user: newUser })
})




const PORT = 3002;

app.listen(PORT,() => {
    console.log(`Server running on PORT:${PORT}`);
});