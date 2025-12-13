[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/theme](../README.md) / Theme

# Class: Theme

Defined in: [frontend/src/classes/theme.ts:19](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L19)

A class defining Themes to be used in SmorgasBoard.

## Remarks

This class contains useful methods and fields for defining, storing, and
setting different themes.

## Constructors

### Constructor

```ts
private new Theme(
   id,
   name,
   url): Theme;
```

Defined in: [frontend/src/classes/theme.ts:69](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L69)

Creates an instance of a Theme.

#### Parameters

| Parameter | Type     | Description                                                                      |
| --------- | -------- | -------------------------------------------------------------------------------- |
| `id`      | `number` | The internal ID number for the Theme.                                            |
| `name`    | `string` | The user-friendly client-facing name to be used for the Theme in menus, UI, etc. |
| `url`     | `string` | The relative URL of the Theme's CSS File.                                        |

#### Returns

`Theme`

#### Remarks

This constructor is private so we cannot create any other themes during
runtime.

#### Example

```ts
static readonly MIDNIGHT = new Theme(
  5,
  "Midnight Calm",
  "themes/midnight.css",
);
```

Here, a new Theme is defined for the application, with an ID of `5`, a
UI-friendly name "Midnight Calm", and an example relative URL for the CSS
file of `./themes/midnight.css`.

## Properties

| Property                           | Modifier   | Type     | Description                                                                      | Defined in                                                                                                                                                          |
| ---------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="id"></a> `id`               | `private`  | `number` | The internal ID number for the Theme.                                            | [frontend/src/classes/theme.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L70) |
| <a id="name"></a> `name`           | `private`  | `string` | The user-friendly client-facing name to be used for the Theme in menus, UI, etc. | [frontend/src/classes/theme.ts:71](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L71) |
| <a id="url"></a> `url`             | `private`  | `string` | The relative URL of the Theme's CSS File.                                        | [frontend/src/classes/theme.ts:72](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L72) |
| <a id="console"></a> `CONSOLE`     | `readonly` | `Theme`  | -                                                                                | [frontend/src/classes/theme.ts:30](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L30) |
| <a id="default"></a> `DEFAULT`     | `readonly` | `Theme`  | -                                                                                | [frontend/src/classes/theme.ts:25](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L25) |
| <a id="palenight"></a> `PALENIGHT` | `readonly` | `Theme`  | -                                                                                | [frontend/src/classes/theme.ts:35](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L35) |

## Methods

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/theme.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L84)

Returns the Theme ID.

#### Returns

`number`

The Theme's internal ID.

#### Remarks

The ID is used when storing the current Theme, as well as setting the
Theme from a stored ID

---

### getUrl()

```ts
getUrl(): string;
```

Defined in: [frontend/src/classes/theme.ts:110](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L110)

Returns ths URL of the Theme.

#### Returns

`string`

The URL relative to the main `index.html` running the
application.

#### Remarks

This method is called when setting themes, in order to change the theme
link's `src` attribute.

---

### toString()

```ts
toString(): string;
```

Defined in: [frontend/src/classes/theme.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/theme.ts#L96)

Returns the name of the Theme.

#### Returns

`string`

The name.

#### Remarks

The name returned is the user-friendly UI-facing name.
