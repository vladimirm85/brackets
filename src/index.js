module.exports = function check(str, bracketsConfig) {
    const instructions = bracketsConfig.map((config) => {
        const obj = {
            isOpen: true,
            isEqual: config[0] === config[1],
        };
        obj[config[1]] = -1;
        obj[config[0]] = 1;

        return obj;
    });

    const arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
        const instruction = instructions.find((instruction) =>
            Object.keys(instruction).includes(arr[i])
        );
        if (instruction.isEqual) instruction.isOpen = !instruction.isOpen;
        if (instruction[arr[i]] < 0 || (instruction.isEqual && instruction.isOpen)) {
            for (let j = i - 1; j >= 0; j--) {
                if (arr[j] && !Object.keys(instruction).includes(arr[j])) {
                    return false;
                }
                if (instruction[arr[j]] > 0 || arr[j] === arr[i]) {
                    arr[j] = 0;
                    arr[i] = 0;
                    break;
                }
            }
        }
    }
    return !arr.filter((el) => el).length;
}
