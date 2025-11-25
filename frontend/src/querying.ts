/**
 * Contains functions to call the backend when storing, updating, saving, and
 * retrieving data regarding the user or the dashboard.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { setLocalChange, user } from "./app";
import type { Size } from "./classes/area";
import type { PanelInstance } from "./classes/panel/panel";

/**
 * An interface for the structure of the dashboard data.
 *
 * @remarks
 * This interface holds the structure and types for columns in the
 * `dashboard_data` table in the Supabase Database, and is used for safely
 * typing fetched data.
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 */
interface DashboardDataFetch {
    panels?: PanelInstance[];
    theme?: number;
    username?: string;
    free_ids?: number[];
    dimensions?: Size;
}

/**
 * An interface for the structure of pushed save payloads.
 *
 * @remarks
 * This interface holds the structure of all pushes to the Supabase database,
 * describing the types in the POST request payloads.
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 */
interface DashboardSaveData {
    panels: PanelInstance[];
    free_ids: number[];
    dimensions: Size;
    theme: number;
}

/**
 * Fetches specific items from the database for the logged in User.
 *
 * @remarks
 * This function sends the parameters and call to the backend, where a call to
 * Supabase is carried out on the database table to fetch the relevant columns
 * for a particular row. RLS is enabled, so users can only fetch records for
 * their particular UUID.
 *
 * @param   targets - The target(s) as column names that we want to fetch from
 *   the database.
 *
 * @returns         The fetched columns/data from the dashboard database.
 *
 * @example
 *
 * ```ts
 * const data = await getFromSmorgasBase("theme", "dimensions");
 * ```
 *
 * `data`, for example, would have the following form:
 *
 * ```ts
 * {
 *      theme: 0,
 *      dimensions: {
 *          width: 2,
 *          height: 3
 *      }
 * }
 * ```
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 */
async function getFromSmorgasBase(
    ...targets: ("theme" | "free_ids" | "panels" | "username" | "dimensions")[]
): Promise<DashboardDataFetch[]> {
    // ? Sends the GET request to the backend
    // * For example: `https://smorgas-board-backend.vercel.app/smorgasbase/get?target=theme,panels`
    const fetched = await fetch(
        import.meta.env.VITE_BACKEND_URL
            + "smorgasbase/get?target="
            + targets.join(","),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer "
                    + (user?.access_token ?? import.meta.env.VITE_SUPABASE_KEY),
            },
        },
    ).then((res) => res.json());
    return fetched;
}

/**
 * Pushes updates to the database.
 *
 * @remarks
 * This method sends a POST request to the backend with the desired payload to
 * update in the dashboard data row for the current user. In other words, this
 * method handles saving any changes that the user makes. The "dashboard" target
 * sends an update for the dashboard layout and theme as a whole - this includes
 * the theme, the free IDs, the panels and their data/areas, and the dimensions
 * of the dashboard.
 *
 * @param   target - The item(s) we are updating.
 * @param   value  - The updated value(s) we want to assign to the target(s).
 *
 * @returns        The new updated record from the database.
 *
 * @example
 *
 * ```ts
 *     dashboard.setCurrentTheme(Theme.DEFAULT);
 *     dashboard.spawnPanelOfType(PanelType.WEATHER);
 *     dashboard.spawnPanelOfType(PanelType.TODO);
 * ```
 *
 * After a configured delay, the dashboard instance then calls this method to
 * patch the new theme and panels:
 *
 * ```ts
 *     const updatedRecord = await patchIntoSmorgasBase("dashboard");
 * ```
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 */
async function patchIntoSmorgasBase(
    target: "username" | "dashboard",
    value: DashboardSaveData | string,
): Promise<DashboardDataFetch[]> {
    const parsedBody: DashboardDataFetch = {};

    try {
        const parsedValue = value as DashboardSaveData;
        // ? Depending on the targets we are updating, the method appends different values to the payload.
        switch (target) {
            case "dashboard":
                parsedBody["theme"] = parsedValue.theme;
                parsedBody["free_ids"] = parsedValue.free_ids;
                parsedBody["panels"] = parsedValue.panels;
                parsedBody["dimensions"] = parsedValue.dimensions;
                break;
            case "username":
                parsedBody["username"] = value as string;
                break;
        }
    } catch (error) {
        console.error(error, "Passed value does not match target field.");
    }

    /**
     * Sets the variable in the main App module to store that this was a local
     * change for handling in the realtime channel listener.
     */
    setLocalChange(true);

    // ? Sends the data to the backend through a POST request.
    const fetched = await fetch(
        import.meta.env.VITE_BACKEND_URL + "smorgasbase/patch?target=" + target,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer "
                    + (user?.access_token ?? import.meta.env.VITE_SUPABASE_KEY),
            },
            body: JSON.stringify(parsedBody),
        },
    ).then((res) => res.json());

    // ? Returns the updated record.
    return fetched;
}

export { DashboardDataFetch, getFromSmorgasBase, patchIntoSmorgasBase };
