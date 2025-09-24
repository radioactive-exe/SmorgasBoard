import { user } from "./app";
import type { Size } from "./classes/area";
import type { PanelInstance } from "./classes/panel/panel";

interface DashboardDataFetch {
    panels?: PanelInstance[];
    theme?: number;
    username?: string;
    free_ids?: number[];
    dimensions?: Size;
}

/**
 * @param targets
 * @example
 */
async function getFromSmorgasBase(
    ...targets: ("theme" | "free_ids" | "panels" | "username" | "dimensions")[]
): Promise<DashboardDataFetch[]> {
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
 * @param target
 * @example
 */
async function patchIntoSmorgasBase(
    target: "theme" | "free_ids" | "panels" | "username" | "dimensions",
    value: number | number[] | PanelInstance[] | string | Size,
): Promise<DashboardDataFetch[]> {
    const parsedBody: {
        theme?: number;
        free_ids?: number[];
        panels?: PanelInstance[];
        username?: string;
        dimensions?: Size;
    } = {};

    try {
        switch (target) {
            case "theme":
                parsedBody["theme"] = value as number;
                break;
            case "free_ids":
                parsedBody["free_ids"] = value as number[];
                break;
            case "panels":
                parsedBody["panels"] = value as PanelInstance[];
                break;
            case "username":
                parsedBody["username"] = value as string;
                break;
            case "dimensions":
                parsedBody["dimensions"] = value as Size;
        }
    } catch (error) {
        console.error(error, "Passed value does not match target field.");
    }

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
    return fetched;
}

export { getFromSmorgasBase, patchIntoSmorgasBase };
