[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config](../README.md) / getDefaultConfig

# Function: getDefaultConfig()

```ts
function getDefaultConfig(configSchema): Record<string, unknown> | undefined;
```

Defined in: [frontend/src/classes/config/config.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/config/config.ts#L83)

Gets a copy of the default config of a particular schema.

## Parameters

| Parameter      | Type                                                                                       | Description                                   |
| -------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `configSchema` | \| [`ZodObject`](https://zod.dev/api#objects)\<`$ZodLooseShape`, `$strip`\> \| `undefined` | The schema to get a default copy/instance of. |

## Returns

`Record`\<`string`, `unknown`\> \| `undefined`

The default Config object for the schema, or undefined
if the schema is undefined.

## Remarks

If the config schema passed is undefined, then the function returns an
undefined response as well. It will return an object populated by the default
values of the schema.

## Example

```ts
this.config = getDefaultConfig(clockConfigSchema);
```

The above obtains an object with the default values and options set in the
`clockConfigSchema` Zod schema.

## See

- [Zod](https://zod.dev/)
- [The Config Schema](../variables/configSchema.md)
