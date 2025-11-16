[Smorgasboard](../wiki/Home) / frontend/src/classes/config/config

# frontend/src/classes/config/config

The file containing the definition of a [Config](../wiki/frontend.src.classes.config.config.TypeAlias.Config) object, as well as a
method for obtaining an instance of the default of a particular Config
Schema, also defined here. The Config change custom event fields are also
defined here.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Interfaces

| Interface                                                                                               | Description                                                                                 |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [ConfigChangeEventDetail](../wiki/frontend.src.classes.config.config.Interface.ConfigChangeEventDetail) | The interface holding the shape of a custom event detail for the ConfigChange custom event. |

## Type Aliases

| Type Alias                                                            | Description                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [Config](../wiki/frontend.src.classes.config.config.TypeAlias.Config) | The inferred type of the Zod Config schema to be used as a type directly. |

## Variables

| Variable                                                                            | Description                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [\_configSchema](../wiki/frontend.src.classes.config.config.Variable._configSchema) | A [Zod](https://zod.dev/) schema holding the general shape of a Config schema. |

## Functions

| Function                                                                                 | Description                                               |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [getDefaultConfig](../wiki/frontend.src.classes.config.config.Function.getDefaultConfig) | Gets a copy of the default config of a particular schema. |
