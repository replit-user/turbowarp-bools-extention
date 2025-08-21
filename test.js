class BoolExtension {
    constructor(runtime) {
        this.runtime = runtime; // store runtime for variable access
        this.boolvarnames = {}
    }

    getInfo() {
        return {
            id: 'boolext',
            name: 'Bools',
            color1: '#2e577eff', // lighter blue
            color2: '#0d67c2ff', // slightly darker border
            color3: '#033f77ff', // highlight
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
                    blockType: Scratch.BlockType.COMMAND,
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

    // helper: get or create a Scratch variable by name
    getProjectVariable(name) {
        const target = this.runtime.getTargetForStage();
        let variable = target.lookupVariableByNameAndType(name, '');
        if (!variable) {
            variable = target.createVariable(name, '', false); // false = not cloud
        }
        return variable;
    }

    // boolean literal blocks
    trueBlock() {
        return true;
    }

    falseBlock() {
        return false;
    }

    // logical NOT
    notBlock(args) {
        return !args.VALUE;
    }

    // set a Scratch project variable to a boolean value
    setBool(args) {
        const variable = this.getProjectVariable(args.NAME);
        variable.value = Boolean(args.VALUE);
        this.boolvarnames[args.NAME] = variable.value;
    }

    // read a Scratch project variable as boolean
    getBool(args) {
        const variable = this.getProjectVariable(args.NAME);
        return Boolean(variable.value);
    }

    // toggle a Scratch project variable
    ToggleBoolVar(args) {
        const variable = this.getProjectVariable(args.BOOL_VAR);
        variable.value = !Boolean(variable.value);
    }
    ListBool(args){
        bools = [];
        for(let name of this.boolvarnames){
            bools[name] = this.boolvarnames[name];
        }
        return bools;
    }
    ResetBool(args){
        for(let flag of this.boolvarnames){
            this.boolvarnames[flag] = undefined;
        }
    }
}

Scratch.extensions.register(new BoolExtension());
