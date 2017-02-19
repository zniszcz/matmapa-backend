var express = require('express')
var app = express()

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://matmapa.pl http://mapamatematyki.pl");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
} else {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.get('/', function (req, res) {
      res.send('Hello World!')
})

app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
})
