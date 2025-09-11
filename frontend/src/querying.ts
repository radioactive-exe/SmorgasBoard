import { user } from "./app";
import type { PanelInstance } from "./classes/panel/panel";

interface DashboardDataFetch {
    panels?: PanelInstance[];
    theme?: number;
    username?: string;
}

/**
 * @param targets
 * @example
 */
async function getFromSmorgasBase(
    ...targets: ("theme" | "free_ids" | "panels" | "username")[]
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
    target: "theme" | "free_ids" | "panels" | "username",
    value: number | number[] | PanelInstance[] | string,
): Promise<DashboardDataFetch[]> {
    const parsedBody: {
        theme?: number;
        free_ids?: number[];
        panels?: PanelInstance[];
        username?: string;
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

        }
    } catch (error) {
        console.error(error, "Passed value does not match target field.")
    }

    console.log(parsedBody);

    const fetched = await fetch(
        import.meta.env.VITE_BACKEND_URL
            + "smorgasbase/patch?target="
            + target,
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
