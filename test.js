class BoolExtension {
    constructor() {
        this.boolNames = new Set(); // track all boolean variable names
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
                        NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'flag' },
                        VALUE: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true }
                    }
                },
                {
                    opcode: 'getBool',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'bool [NAME]',
                    arguments: {
                        NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'flag' }
                    }
                },
                {
                    opcode: "ToggleBoolVar",
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'toggle [BOOL_VAR]',
                    arguments: {
                        "BOOL_VAR": { type: Scratch.ArgumentType.STRING, defaultValue: 'flag' }
                    }
                },
                '---',
                {
                    opcode: 'listAllBools',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'all bools'
                },
                {
                    opcode: 'resetAllBools',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'reset all bools'
                }
            ]
        };
    }

    // helper: get or create a Scratch variable by name
    getProjectVariable(name) {
        // get the current target (sprite or stage)
        const target = Scratch.vm.runtime.getTargetForStage(); 
        let variable = target.lookupVariableByNameAndType(name, '');
        if (!variable) {
            variable = target.createVariable(name, '', false);
        }
        this.boolNames.add(name);
        return variable;
    }

    // boolean literal blocks
    trueBlock() { return true; }
    falseBlock() { return false; }

    notBlock(args) { return !args.VALUE; }

    setBool(args) {
        const variable = this.getProjectVariable(args.NAME);
        variable.value = Boolean(args.VALUE);
    }

    getBool(args) {
        const variable = this.getProjectVariable(args.NAME);
        return Boolean(variable.value);
    }

    ToggleBoolVar(args) {
        const variable = this.getProjectVariable(args.BOOL_VAR);
        variable.value = !Boolean(variable.value);
    }

    listAllBools() {
        return Array.from(this.boolNames).join(', ');
    }

    resetAllBools() {
        const target = Scratch.vm.runtime.getTargetForStage();
        this.boolNames.forEach(name => {
            const variable = target.lookupVariableByNameAndType(name, '');
            if (variable) variable.value = false;
        });
    }
}

Scratch.extensions.register(new BoolExtension());
