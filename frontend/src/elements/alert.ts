/**
 * This file contains all the logic and functionality for spawning and
 * populating popup alerts.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * The automatic alert dismissal timeout, used when clearing the timeout or
 * spawning a new alert.
 */
let alertDismissTimeout: NodeJS.Timeout;

import { modalLayer } from "../app.js";
import { deleteAfterTransition } from "../functions/util.js";

/** Different alert levels for use when spawning alerts. */
enum AlertLevel {
    /**
     * A Base/Info status level.
     *
     * @remarks
     * This alert level is used simply for the purpose of informing/greeting the
     * user, such as upon login, or upon loading an empty dashboard.
     */
    INFO = 0,
    /**
     * A warning status level.
     *
     * @remarks
     * This is when there are mild warnings or alerts that need to inform the
     * user of an invalid/problematic action, most often those directly
     * involving the dashboard, such as insufficient space and invalid
     * dimensions.
     */
    WARNING = 1,
    /**
     * An error status level.
     *
     * @remarks
     * This is used for critical, immediate, or unexpected issues. This includes
     * authentication issues, loading issues, and other equally-outstanding
     * scenarios.
     */
    ERROR = 2,
}

/**
 * Dismisses the alert from the application.
 *
 * @param alert - The alert to be dismissed.
 *
 * @example
 *
 * ```ts
 * const alert = spawnAlert("Here is a test!", AlertLevel.INFO);
 * button.addEventListener("click", () => dismissAlert(alert));
 * ```
 *
 * The above dismisses the spawned alert on the click of the button called
 * `button`.
 *
 * @see {@link spawnAlert | spawnAlert()} , the function that spawns the alert
 */
function dismissAlert(alert: HTMLElement): void {
    alert.classList.remove("visible");
    deleteAfterTransition(alert, modalLayer);
}

/**
 * Summons/spawns an alert with a certain message and alert level.
 *
 * @param   alertMessage - The text content of the Alert.
 * @param   alertLevel   - The alert level to spawn the alert with. This affects
 *   things such as the colour scheme used (and will affect more in the future).
 *   Defaults to a Warning level - `AlertLevel.WARNING`.
 *
 * @returns              The spawned alert as an HTMLElement.
 *
 * @example
 *
 * ```ts
 * spawnAlert("Invalid Login Credentials!", AlertLevel.ERROR);
 * ```
 *
 * The above spawns an error alert informing the user of invalid login
 * credentials.
 *
 * @see {@link AlertLevel | The Interface for different Alert Levels}
 * @see {@link dismissAlert | dismissAlert()} , the alert dismissal function
 */
function spawnAlert(
    alertMessage: string,
    alertLevel: AlertLevel = AlertLevel.WARNING,
): HTMLElement {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.style.setProperty(
        "--alert-bg",
        `var(--alert-${AlertLevel[alertLevel].toString().toLowerCase()}-bg)`,
    );

    alert.innerHTML = `
            <div class="alert-info">
                <div class="alert-icon icon" style="--icon-svg: url(../assets/graphics/exclamation.svg);"></div>
                <span class="alert-message">${alertMessage}</span>
            </div>
            <div class="alert-buttons">
                <div class="close-alert-button button">
                    <div class="close-alert-icon icon" style="--icon-svg: url(../assets/graphics/cross-circle.svg)"></div>
                </div>
            </div>`;

    modalLayer.appendChild(alert);

    const dismissButton = alert.querySelector(".close-alert-button");

    /**
     * ? Delays the animation of the alert into the screen so that the contents
     * ? And position are updated in the DOM.
     */
    setTimeout(() => {
        alert.classList.add("visible");
    }, 100);

    // ? Automatic dismissal of the alert after a number of seconds determined
    // ? by the AlertLevel.
    alertDismissTimeout = setTimeout(
        () => {
            dismissAlert(alert);
        },
        // ? Error alerts stay for 20 seconds
        alertLevel == AlertLevel.ERROR
            ? 20000
            : // ? Warning alerts stay for 10 seconds
              alertLevel == AlertLevel.WARNING
              ? 10000
              : // ? Info alerts stay for 5 seconds
                5000,
    );

    /**
     * ? A manual way to dismiss the alert before the 5 seconds if needed/wanted
     * ? By clicking the dismiss button.
     */
    dismissButton?.addEventListener("click", () => {
        clearTimeout(alertDismissTimeout);
        dismissAlert(alert);
    });

    return alert;
}

export { AlertLevel, spawnAlert };
