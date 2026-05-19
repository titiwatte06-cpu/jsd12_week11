import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../../modules/users/user.model";



const isMatch = await bcrypt.compare(password,user.password);
if (!isMatch) {

}

const token = jwt.sign({userId:users._id},process.env.JWT_SECRET, {
    expiresIn: "1h",
});

const isProd = process.env.NODE_ENV === "production";

res.cookie("accessToken",token , {
    httpOny:true,
    secure:isProd,
});

res.status(200).json({

});