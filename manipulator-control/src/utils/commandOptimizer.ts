export function optimizeCommand(command: string): string {
  let optimized = command;

  optimized = optimized.replace(/([ЛПВНОБ])\1+/g, (match, char) => {
    return `${match.length}${char}`;
  });

  let prevOptimized;
  do {
    prevOptimized = optimized;
    const pattern = /(\w+)(?:\1)+/g;
    optimized = optimized.replace(pattern, (match, group) => {
      const count = match.length / group.length;
      return `${count}(${group})`;
    });
  } while (prevOptimized !== optimized);

  return optimized;
}

export function executeCommand(command: string): string[] {
  const actions: string[] = [];
  let i = 0;

  while (i < command.length) {
    let char = command[i];

    if (/\d/.test(char)) {
      let num = "";
      while (/\d/.test(command[i])) {
        num += command[i];
        i++;
      }
      const count = parseInt(num);
      const action = command[i];

      for (let j = 0; j < count; j++) {
        actions.push(action);
      }
    } else if (char === "(") {
      i++;
      let group = "";
      let depth = 1;

      while (depth > 0 && i < command.length) {
        if (command[i] === "(") depth++;
        if (command[i] === ")") depth--;
        if (depth > 0) group += command[i];
        i++;
      }

      let count = 1;
      if (i < command.length && /\d/.test(command[i + 1])) {
        let num = "";
        i++;
        while (i < command.length && /\d/.test(command[i])) {
          num += command[i];
          i++;
        }
        count = parseInt(num);
      }

      for (let j = 0; j < count; j++) {
        actions.push(...executeCommand(group));
      }
    } else {
      actions.push(char);
    }

    i++;
  }

  return actions;
}
