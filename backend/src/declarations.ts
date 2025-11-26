/**
 * This file contains the declarations used throughout the backend of
 * Smorgasboard.
 *
 * @remarks
 * They are all declared and exported here to avoid re-declaring or re-importing
 * variables.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import fs from "fs";
import path from "path";
import url from "url";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

/** Ensures CORS only allows requests from these origins. */
const allowedOrigins: string[] = [
    "https://smorgasboard.irradiated.app/",
    "https://smorgasboard.irradiated.app",
    "https://smorgasboard.vercel.app/",
    "https://smorgasboard.vercel.app",
    "http://127.0.0.1:3000/",
    "http://127.0.0.1:3000",
    process.env.ORIGIN_URL ?? "",
];
export {
    SupabaseClient,
    allowedOrigins,
    cors,
    createClient,
    dotenv,
    express,
    fs,
    path,
    url,
};
