import type { Request, Response } from "express";

import { queryOne } from "#utils/db.utils";
import type { User } from "#models/user.model";
import { create } from "#utils/database/user.database.utils";
import { createUserData } from "#helpers/signup.helper";

export async function signup(req: Request, res: Response) {
    const { email, password, username } = req.body;

    const foundUser = await queryOne<User>("SELECT * FROM user WHERE email = $email OR username = $username", { email, username });
    if (foundUser.length > 0) {
        return res.status(400).json({ message: "User with that email or username already exists" });
    }

    const userData = await createUserData(email, password, username);

    const result = await create(userData);
    if (!result) {
        return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully" });
}