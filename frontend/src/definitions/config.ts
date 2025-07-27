interface ConfigOption {
    option: string,
    value: string
}

class Config {
    public constructor(
        private options : Set<ConfigOption>
    ) {
    }
}

export {
    Config
}