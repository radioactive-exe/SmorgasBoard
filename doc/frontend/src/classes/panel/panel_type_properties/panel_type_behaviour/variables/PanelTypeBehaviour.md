[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../README.md) / PanelTypeBehaviour

# Variable: PanelTypeBehaviour

```ts
const PanelTypeBehaviour: object;
```

Defined in: [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type_properties/panel_type_behaviour.ts#L29)

The Property object for PanelType Behaviour. Each PanelType is given its
executing function from the `panel_behaviour` sibling folder to the current
`panel_type_properties` folder.

## Type Declaration

### CLOCK()

```ts
readonly CLOCK: (panel) => void = ClockPanel.execute;
```

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Clock PanelType.

#### Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

#### Returns

`void`

#### Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we update
the time and date text upon first loading, after which we update the clock
and date every 100ms. This is simpler and cheaper than using RAF
(RequestAnimationFrame), and provides enough accuracy to be passable, with a
maximum of 100ms of delay.

#### See

[updateTimeAndDate()](../functions/updateTimeAndDate.md)

### NONE

```ts
readonly NONE: null = null;
```

### NOTEPAD()

```ts
readonly NOTEPAD: (panel) => void = NotepadPanel.execute;
```

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Notepad PanelType.

#### Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

#### Returns

`void`

#### Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we wait for
5 seconds after the last user input, and then trigger a save. That's about it
for the Notepad panel. Not much to discuss here.

### PHOTO()

```ts
readonly PHOTO: (panel) => void = PhotoPanel.execute;
```

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Photo PanelType.

#### Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

#### Returns

`void`

#### Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we handle
drag and drop events, as well as a file input, and then upload and save the
file to be used later/in any session before being removed.

#### See

- The function that [processes all inputted files](../functions/processFile.md) to be uploaded
- [Supabase](https://supabase.com/docs)
- [Supabase#Storage](https://supabase.com/docs/guides/storage)

### TODO()

```ts
readonly TODO: (panel) => void = TodoPanel.execute;
```

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Todo List PanelType.

#### Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

#### Returns

`void`

#### Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we add
inputted text as a task in the stored list, which if successfully added as a
task, will also have the ability to be checked or deleted. After a delay from
checking/unchecking or adding/removing a task, a save is triggered.

#### See

- [tryToAddEntry()](../functions/validateThenAddEntry.md)
- [addEntry()](../../../panel_behaviour/todo_panel/functions/addEntry.md) , set as its own method to allow adding entries from saved content upon loading

### WEATHER()

```ts
readonly WEATHER: (panel) => void = WeatherPanel.execute;
```

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Weather PanelType.

#### Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

#### Returns

`void`

#### Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we establish
the main elements to be reused throughout the panel, handle config changes
regarding temperature and time format settings, and take care of the location
search functionality (and its relevant inputs), routing into other functions
that handle different aspects of focusing and saving locations and weather
information.

## Remarks

[PanelTypeBehaviour.NONE](#none) is an entry for all PanelTypes that do not
have executing behaviour. This is unlikely but still included for any panel
types that simply might not have behaviour.
