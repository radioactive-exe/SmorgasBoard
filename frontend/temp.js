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

const personalNavButton = document.querySelector(".personal-nav .button");

personalNavButton.addEventListener("click", () => {
    personalNavButton.classList.toggle("active");
});
