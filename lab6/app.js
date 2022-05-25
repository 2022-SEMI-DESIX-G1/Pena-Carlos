const number = 5;

const fibonacci =  (size) => {
    const array = [0,1];
    for(let s = 0; s <size-2;s++){
    array.push(array[s]+array[s+1]);
    }
    return array;
}

console.log(fibonacci(number).join(" "))