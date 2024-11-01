import type { Request, Response } from "express";

import {
    checkPassword,
    createUserData,
    generateAccessToken,
} from "#helpers/auth.helper";
import type { User } from "#models/user.model";
import { create } from "#utils/database/user.database.util";
import { queryOne } from "#utils/db.util";

export async function signup(req: Request, res: Response) {
    // TODO: Verify email

    const { email, password, username } = req.body;

    const foundUser = await queryOne<User>(
        "SELECT * FROM user WHERE email = $email OR username = $username",
        {
            email,
            username,
        },
    );
    if (foundUser.length > 0) {
        return res.status(400).json({
            message: "User with that email or username already exists",
        });
    }

    const userData = await createUserData(email, password, username);

    const result = await create(userData);
    if (!result) {
        return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully" });
}

export async function login(req: Request, res: Response) {
    const { user, password } = req.body;

    const foundUser = await queryOne<User>(
        "SELECT * FROM user WHERE email = $email OR username = $username",
        {
            email: user,
            username: user,
        },
    );
    if (foundUser.length === 0) {
        return res
            .status(400)
            .json({ message: "Invalid username, email, or password" });
    }

    const dbUser = foundUser[0];
    const passwordMatch = await checkPassword(password, dbUser.password);
    if (!passwordMatch) {
        return res
            .status(400)
            .json({ message: "Invalid username, email, or password" });
    }

    if (!dbUser.verified) {
        return res.status(400).json({ message: "User is not verified" });
    }

    const accessToken = generateAccessToken(dbUser, "1d");

    return res
        .status(200)
        .json({ message: "Logged in successfully", accessToken });
}
