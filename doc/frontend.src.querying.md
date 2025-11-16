[Smorgasboard](../wiki/Home) / frontend/src/querying

# frontend/src/querying

Contains functions to call the backend when storing, updating, saving, and
retrieving data regarding the user or the dashboard.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Interfaces

| Interface                                                                        | Description                                             |
| -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [DashboardDataFetch](../wiki/frontend.src.querying.Interface.DashboardDataFetch) | An interface for the structure of the dashboard data.   |
| [DashboardSaveData](../wiki/frontend.src.querying.Interface.DashboardSaveData)   | An interface for the structure of pushed save payloads. |

## Functions

| Function                                                                            | Description                                                      |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [getFromSmorgasBase](../wiki/frontend.src.querying.Function.getFromSmorgasBase)     | Fetches specific items from the database for the logged in User. |
| [patchIntoSmorgasBase](../wiki/frontend.src.querying.Function.patchIntoSmorgasBase) | Pushes updates to the database.                                  |
