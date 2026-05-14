import {Router} from "express";
import {users} from "../../fakeData/fakeUsers.js";

export const router = Router();



router.get("/",(req,res) => {
    res.json(users);

});

router.post("/", (req, res) => {
    const newUser = req.body  
    users.push(newUser)       
    res.json({ message: "done", user: newUser })
});

router.put('/:id', (req, res) => {

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
});

