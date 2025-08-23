// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */

// // import { PanelTypeConfig } from "./public/dist/classes/panel_type.js";

// import * as zod from "zod";
// import { BooleanConfigEntry, ListSelectionConfigEntry } from "./public/dist/classes/config.js";

// const sampleConfig = zod.strictObject({
//     use24HrTime: zod.custom<BooleanConfigEntry>().default({
//         label: "Use 24-hour Time",
//         value: true,
//     }),
//     showSeconds: zod.custom <BooleanConfigEntry>().default({
//         label: "Show Seconds",
//         value: false,
//     }),
//     showDate: zod.custom <BooleanConfigEntry>().default({
//         label: "Show Date above Time",
//         value: true,
//     }),
//     dateFormat: zod
//         .custom <ListSelectionConfigEntry>((entry) => {
//             const options: ListSelectionOption[] = [
//                 {
//                     optionLabel: "Full, including weekday",
//                     optionValue: "full",
//                 },
//                 {
//                     optionLabel: "Long - Month is spelled out",
//                     optionValue: "long",
//                 },
//                 {
//                     optionLabel: "Short - DD/MM/YYYY",
//                     optionValue: "short",
//                 },
//             ];
//             return isValidOption(
//                 options,
//                 (entry as ListSelectionConfigEntry).value
//             );
//         })
//             .default({
//                 label: "Date Format (if shown)",
//                 value: "full",
//                 possibleOptions: [
//                     {
//                         optionLabel: "Full, including weekday",
//                         optionValue: "full",
//                     },
//                     {
//                         optionLabel: "Long - Month is spelled out",
//                         optionValue: "long",
//                     },
//                     {
//                         optionLabel: "Short - DD/MM/YYYY",
//                         optionValue: "short",
//                     },
//                 ],
//             }),
// });

// const dropdownSelectorTemplate = `
//         <div class="dropdown-selector selector" data-config-property="Wee">
//             <div class="selection glassy">
//                 <span class="selection-text">Fo</span>
//                 <div
//                     class="menu-caret icon"
//                     style="
//                         --icon-svg: url(../assets/graphics/angle-small-right.svg);
//                     "
//                 ></div>
//             </div>
//             <ul class="dropdown-list glassy">
//                 <li data-config-value="fee1" class="dropdown-item">
//                     <div class="item-content">
//                         <span class="item-text">Fee</span>
//                         <div
//                             class="icon selected-icon visible"
//                             style="
//                                 --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
//                             "
//                         ></div>
//                     </div>
//                 </li>
//                 <li data-config-value="fee2" class="dropdown-item">
//                     <div class="item-content">
//                         <span class="item-text">Fi</span>
//                         <div
//                             class="icon selected-icon visible"
//                             style="
//                                 --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
//                             "
//                         ></div>
//                     </div>
//                 </li>
//                 <li data-config-value="fee3" class="dropdown-item selected">
//                     <div class="item-content">
//                         <span class="item-text">Fo</span>
//                         <div
//                             class="icon selected-icon visible"
//                             style="
//                                 --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
//                             "
//                         ></div>
//                     </div>
//                 </li>
//                 <li data-config-value="fee4" class="dropdown-item">
//                     <div class="item-content">
//                         <span class="item-text">Fum</span>
//                         <div
//                             class="icon selected-icon visible"
//                             style="
//                                 --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
//                             "
//                         ></div>
//                     </div>
//                 </li>
//             </ul>
//         </div>`;

// const toggleSelectorTemplate = `
//         <div class="toggle-selector selector" data-config-property="Mama">
//             <input type="checkbox" id="toggle" class="toggle-checkbox" />
//             <label for="toggle" class="toggle-checkbox-background">
//                 <div class="toggle-checkbox-button"></div>
//             </label>
//         </div>
// `;

// const rangeSelectorTemplate = `
//         <div class="range-selector selector">
//             <label class="range-selector-label" for=""
//                 ><span class="range-selector-text">1500</span></label
//             >
//             <input
//                 class="range-slider"
//                 type="range"
//                 name=""
//                 id="range"
//                 min="10"
//                 max="30"
//                 value="15"
//                 step="0.05"
//             />
//         </div>
// `;

// const textSelectorTemplate = `

//         <div class="text-selector selector">
//             <input
//                 class="text-selector-input"
//                 type="text"
//                 name="text-input"
//                 id="text"
//                 required
//             />
//             <label class="text-selector-label" for="text">
//                 <span class="text-selector-label-text">Name</span>
//             </label>
//         </div>`;

// const dropdownSelectors = document.querySelectorAll(".dropdown-selector");

// let optionEventListener,
//     previouslyFocusedSelector,
//     selectionText,
//     dropdownOptions,
//     lastActive;

// dropdownSelectors.forEach((selector) => {
//     selector.addEventListener("mousedown", (e) => {
//         selectionText = selector.querySelector(".selection-text");
//         dropdownOptions = [...selector.querySelectorAll(".dropdown-item")];
//         lastActive = selector.querySelector(".selected");

//         selector.classList.toggle("open");

//         if (e.currentTarget.classList.contains("open")) {
//             selector.classList.add("focused");
//             if (
//                 previouslyFocusedSelector
//                 && previouslyFocusedSelector != selector
//             ) {
//                 previouslyFocusedSelector.classList.remove("open");
//                 previouslyFocusedSelector.classList.remove("focused");
//             }
//             previouslyFocusedSelector = selector;

//             dropdownOptions.forEach((option) => {
//                 optionEventListener = (e) => {
//                     e.stopPropagation();
//                     selectionText.textContent = option.textContent;
//                     if (lastActive && lastActive != option) {
//                         lastActive.classList.remove("selected");
//                     }
//                     option.classList.add("selected");
//                     lastActive = option;
//                 };
//                 option.addEventListener("mousedown", optionEventListener);
//             });
//         } else {
//             dropdownOptions.forEach((option) => {
//                 option.removeEventListener("mousedown", optionEventListener);
//             });
//         }
//     });
// });

// const toggleSelectors = document.querySelectorAll(".toggle-selector");

// toggleSelectors.forEach((selector) => {
//     selector.addEventListener("mouseup", () => {
//     });
// });

// const rangeSelectors = document.querySelectorAll(".range-selector");

// rangeSelectors.forEach((selector) => {
//     const slider = selector.querySelector(".range-slider");

//     const label = selector.querySelector(".range-selector-text");

//     updateSliderStyle(slider);
//     label.textContent = Math.round(slider.value);

//     slider.addEventListener("input", () => {
//         label.textContent = Math.round(slider.value);
//         updateSliderStyle(slider);
//     });

//     // slider.addEventListener("mouseup", () => {
//     //     slider.value = Math.round(slider.value);
//     //     updateSliderStyle(slider);
//     // });
// });

// function updateSliderStyle(slider) {
//     slider.parentElement.style.setProperty(
//         "--fill-amount",
//         (slider.value - slider.min) / (slider.max - slider.min),
//     );
// }

// // Object.entries(PanelTypeConfig).forEach((entry) => {
// // });
