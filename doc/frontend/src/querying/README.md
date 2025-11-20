[**Smorgasboard**](../../../README.md)

---

[Smorgasboard](../../../README.md) / frontend/src/querying

# frontend/src/querying

Contains functions to call the backend when storing, updating, saving, and
retrieving data regarding the user or the dashboard.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Interfaces

| Interface                                              | Description                                             |
| ------------------------------------------------------ | ------------------------------------------------------- |
| [DashboardDataFetch](interfaces/DashboardDataFetch.md) | An interface for the structure of the dashboard data.   |
| [DashboardSaveData](interfaces/DashboardSaveData.md)   | An interface for the structure of pushed save payloads. |

## Functions

| Function                                                  | Description                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------------- |
| [getFromSmorgasBase](functions/getFromSmorgasBase.md)     | Fetches specific items from the database for the logged in User. |
| [patchIntoSmorgasBase](functions/patchIntoSmorgasBase.md) | Pushes updates to the database.                                  |
