/**
 * This file contains the declarations used throughout the backend of
 * Smorgasboard.
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
export { SupabaseClient, cors, createClient, dotenv, express, fs, path, url };
