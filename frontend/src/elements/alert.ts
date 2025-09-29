let alertDismissTimeout: NodeJS.Timeout;

import { modalLayer } from "../app.js";
import { deleteAfterTransition } from "../functions/util.js";

enum AlertLevel {
    INFO = 0,
    WARNING = 1,
    ERROR = 2,
}

function dismissAlert(alert: HTMLElement): void {
    alert.classList.remove("visible");
    deleteAfterTransition(alert, modalLayer);
}

function spawnAlert(
    alertMessage: string,
    alertLevel: AlertLevel = AlertLevel.WARNING,
): void {
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

    document.body.appendChild(alert);

    const dismissButton = alert.querySelector(".close-alert-button");

    setTimeout(() => {
        alert.classList.add("visible");
    }, 100);

    alertDismissTimeout = setTimeout(() => {
        dismissAlert(alert);
    }, 5000);

    dismissButton?.addEventListener("click", () => {
        clearTimeout(alertDismissTimeout);
        dismissAlert(alert);
    });
}

export { AlertLevel, spawnAlert };
