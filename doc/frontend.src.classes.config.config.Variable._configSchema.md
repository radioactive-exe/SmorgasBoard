[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config](../wiki/frontend.src.classes.config.config) / \_configSchema

# Variable: \_configSchema

```ts
const _configSchema: zod.ZodObject<Config>;
```

Defined in: [frontend/src/classes/config/config.ts:51](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config.ts#L51)

A [Zod](https://zod.dev/) schema holding the general shape of a Config schema.

## Remarks

This uses a catchall as the Config object can have any number of config
entries.

## See

- [Zod](https://zod.dev/)
- [The Config Entry](../wiki/frontend.src.classes.config.config_entry.TypeAlias.Entry)
