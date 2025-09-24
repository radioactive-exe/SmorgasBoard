/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
// const dropArea = document.querySelector(".drop-area");

// // let photos = [];

// const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];

// dragEvents.forEach((dragEvent) => {
//     dropArea?.addEventListener(dragEvent, (e) => e.preventDefault());
// });

// ["dragenter", "dragover"].forEach((dragEvent) => {
//     dropArea?.addEventListener(dragEvent, () => {
//         dropArea.classList.add("active");
//     });
// });

// ["dragleave", "drop"].forEach((dragEvent) => {
//     dropArea?.addEventListener(dragEvent, () => {
//         dropArea.classList.remove("active");
//     });
// });

// dropArea?.addEventListener("drop", (e) => {
//     const im = document.createElement("img");
//     const url = URL.createObjectURL([...e.dataTransfer.files][0]);
//     im.src = url;
//     document.body.appendChild(im);
// });

// const form = document.querySelector("form");

// const usernameInput = form.querySelector("#username");
// const passwordInput = form.querySelector("#password");
// const loginClickable = form.querySelector("#login-subtitle-clickable");
// const registerClickable = form.querySelector("#register-subtitle-clickable");

// const passwordVisibilityButton = form.querySelector("#password-visibility-button");

// function goToRegisterScreen() {
//     form.classList.add("new-user");
//     usernameInput.setAttribute("required", true);
// }

// function goToLoginScreen() {
//     form.classList.remove("new-user");
//     usernameInput.removeAttribute("required");
// }

// loginClickable.addEventListener("click", goToLoginScreen);
// registerClickable.addEventListener("click", goToRegisterScreen);

// function hidePassword() {
//     passwordVisibilityButton.style.setProperty("background", "var(--input-secondary)");
//         passwordInput.setAttribute("type", "password");
//         document.removeEventListener("mouseup", hidePassword);
// }

// passwordVisibilityButton.addEventListener("mousedown", () => {
//     passwordVisibilityButton.style.setProperty("background", "var(--input-accent)");
//     passwordInput.setAttribute("type", "text");
//     document.addEventListener("mouseup", hidePassword);
// });

//const personalNavButton = document.querySelector(".personal-nav .button");

personalNavButton.addEventListener("click", () => {
    personalNavButton.classList.toggle("active");
});

const matrix = document.querySelector(".matrix");

let lastMax;

function updateDimensionsMatrix() {
    matrix.addEventListener("mouseleave", () => {
        [...matrix.children].forEach((cell) => {
            cell.classList.remove("active");
        });
    });

    const max = {
        width: Math.floor(window.innerWidth / 50),
        height: Math.floor(window.innerHeight / 50),
    };

    if (lastMax && lastMax.width == max.width && lastMax.height == max.height)
        return;
    else {
        matrix.style.setProperty("--matrix-width", max.width.toString());
        matrix.style.setProperty("--matrix-height", max.height.toString());
        lastMax = max;
        matrix.replaceChildren();
    }

    for (let i = 0; i < max.height; i++) {
        for (let j = 0; j < max.width; j++) {
            const matrixCell = document.createElement("div");
            matrixCell.classList.add("matrix-cell");
            matrixCell.dataset.row = i;
            matrixCell.dataset.column = j;

            function cellMouseEnterHandler() {
                [...matrix.children].forEach((cell) => {
                    if (
                        parseInt(cell.dataset.row)
                            <= parseInt(matrixCell.dataset.row)
                        && parseInt(cell.dataset.column)
                            <= parseInt(matrixCell.dataset.column)
                    )
                        cell.classList.add("active");
                    else cell.classList.remove("active");
                });
            }

            matrixCell.addEventListener("mouseenter", cellMouseEnterHandler);
            matrixCell.addEventListener("click", () => {
                console.log(
                    "Dashboard is now "
                        + (j + 1).toString()
                        + "x"
                        + (i + 1).toString(),
                );
            });
            matrix.appendChild(matrixCell);
        }
    }
}

updateDimensionsMatrix();

window.addEventListener("resize", updateDimensionsMatrix);
