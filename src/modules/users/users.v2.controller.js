import User from './user.model.js'


export const updateUsers = async (req,res) => {
    const {username , email , password , role} = req.body || {};
    const updates = {};

    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) updates.password = password;
    if (role !== undefined) updates.role = role;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            success:false,
            error:"At least one field is required to update",
        });
    }

    try {
        const doc = await User.findByIdAndUpdate(req.params.id,updates, {
            new:true,
            runValidators:true,
        });

        throw new Error("error by Users")
        // if(!doc) {
        //     return res.status(404).json({success:false,error:"User not found"});
        // }

        return res.status(200).json({ success:true,data:doc});
    } catch (err) {
        return res.status(400).json({success:false,error:err});
    } 
}