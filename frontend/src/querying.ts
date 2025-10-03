import { setLocalChange, user } from "./app";
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
    target: "theme" | "free_ids,panels" | "username" | "dimensions",
    value:
        | number
        | { free_ids: number[]; panels: PanelInstance[] }
        | string
        | Size,
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
            case "free_ids,panels":
                parsedBody["free_ids"] = (
                    value as { free_ids: number[]; panels: PanelInstance[] }
                ).free_ids as number[];
                parsedBody["panels"] = (
                    value as { free_ids: number[]; panels: PanelInstance[] }
                ).panels as PanelInstance[];
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
    setLocalChange(true);

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
