[**Smorgasboard**](../../../README.md)

---

[Smorgasboard](../../../README.md) / frontend/src/app

# frontend/src/app

This is the main module for the Smorgasboard app.

## Remarks

All miscellaneous and uncategorised handlers, event listeners, and
connections between different classes are housed here.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Variables

| Variable                                                                | Description                                                                                                                                                                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [\_smorgasbaseChangesListener](variables/smorgasbaseChangesListener.md) | The realtime channel listener for changes on the Dashboard Table in the Supabase database.                                                                                                                              |
| [\_supabaseAuthChangeHandler](variables/supabaseAuthChangeHandler.md)   | Handles Supabase Auth state changes, including logins, logouts, session starts, and even token refreshes, using the native `SupabaseAuthClient.onAuthStateChange` method.                                               |
| [commonHandler](variables/commonHandler.md)                             | Common handlers to be used by panels when being manipulated, common between both resizing and dragging around.                                                                                                          |
| [contextNavButton](variables/contextNavButton.md)                       | The button that spawns the context menu on touchscreen/pointer devices.                                                                                                                                                 |
| [current](variables/current.md)                                         | Different properties relating to the current element being focused on/manipulated in the Dashboard.                                                                                                                     |
| [dashboard](variables/dashboard.md)                                     | La pièce de Résistance! The dashboard element itself!                                                                                                                                                                   |
| [documentPointerHandlers](variables/documentPointerHandlers.md)         | The handlers that are reassigned and utilised when manipulating Panels, either through resizing or dragging around.                                                                                                     |
| [firstTime](variables/firstTime.md)                                     | Whether or not the login was the first register or a returning user. This is utilised in the `auth` file when registering and logging in.                                                                               |
| [loader](variables/loader.md)                                           | The animated loader for the application.                                                                                                                                                                                |
| [modalLayer](variables/modalLayer.md)                                   | The layer containing all popups, modals, overlays, (non-context) menus, and other overlaying forms or alerts.                                                                                                           |
| [overlayDismissButtons](variables/overlayDismissButtons.md)             | A node list of all the dismiss buttons on all overlays.                                                                                                                                                                 |
| [preview](variables/preview.md)                                         | The Preview panel, used whenever a panel is being moved around or resized, previewing where it could possibly snap to the grid to.                                                                                      |
| [saveIcon](variables/saveIcon.md)                                       | The save icon that pops up indicating the dashboard was saved.                                                                                                                                                          |
| [shrinkButton](variables/shrinkButton.md)                               | The "Shrink and Truncate" button on the [sizeWarningOverlay](variables/sizeWarningOverlay.md), which forces the dashboard dimensions down to the maximum possible size and trims off all the panels that would not fit. |
| [sizeWarningOverlay](variables/sizeWarningOverlay.md)                   | The Warning Overlay for when the width/height of cells on the dashboard is less than 100 pixels because of the screen size.                                                                                             |
| [spawnablePanelTypes](variables/spawnablePanelTypes.md)                 | An array of all possible PanelTypes that are spawnable by the general user.                                                                                                                                             |
| [supabase](variables/supabase.md)                                       | The Supabase client, defined here for use throughout the entirety of Smorgasboard.                                                                                                                                      |
| [user](variables/user.md)                                               | The current logged in user. This holds all relevant fields if a user is logged in, or is null if the dashboard is being used anonymously.                                                                               |
| [wasLocalChange](variables/wasLocalChange.md)                           | Whether or not the change whose update was received from the Supabase realtime listener was one triggered by an action on this client instance.                                                                         |

## Functions

| Function                                                      | Description                                                                                                                                                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [finishLoading](functions/finishLoading.md)                   | Close/hide the loader as loading the dashboard has finished, and fire off the finished loading event.                                                                                                                                                   |
| [refreshDimensions](functions/refreshDimensions.md)           | This function is called every time the window is resized, showing or hiding the size warning overlay as needed, and updating the dimensions matrix.                                                                                                     |
| [setDocumentHandlers](functions/setDocumentHandlers.md)       | Add the document pointermove and pointerup handlers needed when manipulating panels.                                                                                                                                                                    |
| [setFirstTime](functions/setFirstTime.md)                     | Updates the value of `firstTime`. This is called during login and/or registration.                                                                                                                                                                      |
| [setLocalChange](functions/setLocalChange.md)                 | Updates the value of `localChange`. This is utilised by both the Supabase realtime dashboard update listener and the patching functions in the `querying` module to indicate/check if a change that triggered the update was one caused by this client. |
| [updateDimensionsMatrix](functions/updateDimensionsMatrix.md) | Called when the screen/window is resized in order to, if needed, regenerate the dimensions matrix with the new maximum width and height.                                                                                                                |
