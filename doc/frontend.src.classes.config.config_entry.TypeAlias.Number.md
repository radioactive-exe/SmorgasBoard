[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_entry](../wiki/frontend.src.classes.config.config_entry) / Number

# Type Alias: Number

```ts
type Number = object;
```

Defined in: [frontend/src/classes/config/config_entry.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_entry.ts#L131)

The inferred type of the Number Config Entry schema for use as a type
directly.

## Type Declaration

### label

```ts
label: string;
```

### range

```ts
range: object;
```

#### range.max

```ts
max: number;
```

#### range.min

```ts
min: number;
```

#### range.step?

```ts
optional step: number;
```

### value

```ts
value: number;
```

## See

- [The Base Entry type](../wiki/frontend.src.classes.config.config_entry.TypeAlias.Entry)
- [Zod type inferring](https://zod.dev/basics#inferring-types)
- [The Number Entry schema](../wiki/frontend.src.classes.config.config_entry.Variable.NumberObject)
