[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_entry](../README.md) / Number

# Type Alias: Number

```ts
type Number = object;
```

Defined in: [frontend/src/classes/config/config_entry.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/config/config_entry.ts#L131)

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

- [The Base Entry type](Entry.md)
- [Zod type inferring](https://zod.dev/basics#inferring-types)
- [The Number Entry schema](../variables/NumberObject.md)
