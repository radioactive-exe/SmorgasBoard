[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/theme](../README.md) / Theme

# Class: Theme

Defined in: [frontend/src/classes/theme.ts:20](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L20)

A class defining Themes to be used in SmorgasBoard.

## Remarks

This class contains useful methods and fields for defining, storing, and
setting different themes.

## Properties

### CONSOLE

> `readonly` `static` **CONSOLE**: `Theme`

Defined in: [frontend/src/classes/theme.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L31)

***

### DEFAULT

> `readonly` `static` **DEFAULT**: `Theme`

Defined in: [frontend/src/classes/theme.ts:26](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L26)

These are all the Defined Themes in the project/application. They can be
accessed during runtime to switch themes and have any necessary info.

***

### PALENIGHT

> `readonly` `static` **PALENIGHT**: `Theme`

Defined in: [frontend/src/classes/theme.ts:36](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L36)

## Methods

### getId()

> **getId**(): `number`

Defined in: [frontend/src/classes/theme.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L84)

Returns the Theme ID.

#### Returns

`number`

The Theme's internal ID.

#### Remarks

The ID will be used to later set the Theme from a stored ID

***

### getUrl()

> **getUrl**(): `string`

Defined in: [frontend/src/classes/theme.ts:110](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L110)

Returns ths URL of the Theme.

#### Returns

`string`

The URL relative to the main `index.html` running the
  application.

#### Remarks

This method is called when setting themes, in order to change the theme
link's `src` attribute.

***

### toString()

> **toString**(): `string`

Defined in: [frontend/src/classes/theme.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/theme.ts#L96)

Returns the name of the Theme.

#### Returns

`string`

The name.

#### Remarks

The name returned is the user-friendly UI-facing name.
