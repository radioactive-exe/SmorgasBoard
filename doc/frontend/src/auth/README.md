[**Smorgasboard**](../../../README.md)

---

[Smorgasboard](../../../README.md) / frontend/src/auth

# frontend/src/auth

This file contains all the logic and functions for the authentication system.

## Remarks

The file includes the functions to login and register, the authentication
elements in the webpage, as well as all the handling for errors and
exceptions.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Variables

| Variable                                    | Description                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| [statusMessage](variables/statusMessage.md) | This variable will hold the status message as either an error or a success message. |

## Functions

| Function                          | Description                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| [login](functions/login.md)       | Attempts to log the user in using Supabase Auth API with the inputted credentials. |
| [logout](functions/logout.md)     | Signs the user out.                                                                |
| [register](functions/register.md) | This method signs up the user with the inputted fields.                            |
