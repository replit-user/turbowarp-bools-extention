class BoolExtension {
  constructor() {
    this.variables = {};
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
            opcode:"ToggleBoolVar",
            blockType:Scratch.BlockType.COMMAND,
            text: 'toggle [BOOL_VAR]',
            arguments:{
                "BOOL_VAR":{
                    type:Scratch.ArgumentType.STRING,
                    defaultValue:'flag'
                }
            }
        },
        {
    opcode: 'listBools',
    blockType: Scratch.BlockType.REPORTER,
    text: 'all bools'
}

      ]
    };
  }

  trueBlock() {
    return true;
  }

  falseBlock() {
    return false;
  }

  notBlock(args) {
    return !args.VALUE;
  }

  setBool(args) {
    this.variables[args.NAME] = args.VALUE;
  }

  getBool(args) {
    return Boolean(this.variables[args.NAME]);
  }
  ToggleBoolVar(args) {
  // Default to false if variable doesn't exist
  const current = Boolean(this.variables[args.BOOL_VAR]);
  this.variables[args.BOOL_VAR] = !current;
}
  listBools() {
    return Object.keys(this.variables).join(', ');
}


}

Scratch.extensions.register(new BoolExtension());

