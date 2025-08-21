class BoolExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.boolvarnames = {};
    }

    getInfo() {
        return {
            id: 'boolext',
            name: 'Bools',
            color1: '#2e577eff',
            color2: '#0d67c2ff',
            color3: '#033f77ff',
            blocks: [
                {
                    opcode: 'trueBlock',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'true',
                },
                {
                    opcode: 'falseBlock',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'false',
                },
                {
                    opcode: 'notBlock',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'not [VALUE]',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.BOOLEAN,
                            defaultValue: true
                        }
                    }
                },
                '---',
                {
                    opcode: 'setBool',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set bool [NAME] to [VALUE]',
                    arguments: {
                        NAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'flag'
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.BOOLEAN,
                            defaultValue: true
                        }
                    }
                },
                {
                    opcode: 'getBool',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'bool [NAME]',
                    arguments: {
                        NAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'flag'
                        }
                    }
                },
                {
                    opcode: "ToggleBoolVar",
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'toggle [BOOL_VAR]',
                    arguments: {
                        "BOOL_VAR": {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'flag'
                        }
                    }
                },
                {
                    opcode: "ListBool",
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'list all'
                },
                {
                    opcode: "ResetBool",
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'reset all'
                }
            ]
        };
    }

    // literal booleans
    trueBlock() { return true; }
    falseBlock() { return false; }

    notBlock(args) {
        return !args.VALUE;
    }

    setBool(args) {
        this.boolvarnames[args.NAME] = Boolean(args.VALUE);
    }

    getBool(args) {
        // Return false if the variable doesn't exist
        if (this.boolvarnames[args.NAME] === undefined) {
            return false;
        }
        return Boolean(this.boolvarnames[args.NAME]);
    }

    ToggleBoolVar(args) {
        this.boolvarnames[args.BOOL_VAR] = !this.boolvarnames[args.BOOL_VAR];
    }

    ListBool() {
        return JSON.stringify(this.boolvarnames);
    }

    ResetBool() {
        this.boolvarnames = {};
    }
}

Scratch.extensions.register(new BoolExtension());
