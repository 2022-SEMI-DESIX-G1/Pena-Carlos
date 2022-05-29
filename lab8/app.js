const express = require('express')
const app = express()

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/fibonacci/:num', function (req, res) {
    const {num} = req.params
    res.json({sequence : fibonacci(num).join(",")})
  })

const fibonacci =  (size) => {
    const array = [0,1];
    for(let s = 0; s <size-2;s++){
    array.push(array[s]+array[s+1]);
    }
    return array;
}

app.listen(3000)