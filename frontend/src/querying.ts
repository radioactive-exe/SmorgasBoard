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

interface DashboardSaveData {
    panels: PanelInstance[];
    free_ids: number[];
    dimensions: Size;
    theme: number;
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
    target: "username" | "dashboard",
    value: DashboardSaveData | string,
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
            case "dashboard":
                parsedBody["theme"] = (value as DashboardSaveData)
                    .theme as number;
                parsedBody["free_ids"] = (value as DashboardSaveData)
                    .free_ids as number[];
                parsedBody["panels"] = (value as DashboardSaveData)
                    .panels as PanelInstance[];
                parsedBody["dimensions"] = (value as DashboardSaveData)
                    .dimensions as Size;
                break;
            case "username":
                parsedBody["username"] = value as string;
                break;
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
