const math = require('./math');

app.get("/add", function(req, res){
    var something = math.add(2, 2);
    res.send({something: something});
})
app.use("/", function(req, res, next){
    res.send( "hello world");
});