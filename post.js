mongo.connect(
    //config.db,
    'mongodb://127.0.0.1:27017/localACE',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    function (err, response) {
      if (err) {
        //console.log(err,"ERROR")
        console.log("Retry connection started");
        var refreshId = setInterval(() => {
          //console.log(config.db);
          console.log("Connection retry");
          mongo.connect(
            config.db,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
            },
            function (err, responses) {
              if (mongo.connection.readyState == 1) {
                console.log("Database Connection Re-established server");
                clearInterval(refreshId);
              }
            }
          );
        }, 10000);
      } else {
        console.log("Database Connection established server");
      }
    }
  );


  //service file
  function getuserdetail(user_id) {
    // console.log('asmsecs.getAllSec');
    var deferred = Q.defer();
    var useridlower = user_id.toLowerCase();
    uctlmodel.find({ user: useridlower }, function (err, data) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(data);
    });

    return deferred.promise;
}


//contoller
function getuserdata(req, res) {
    // console.log('getAllprojects');
    userctrlservice.getuserdetail(req.params.user_id)
         .then(function (sects) {
             res.send(sects);
         })
         .catch(function (err) {
             res.status(400).send(err);
         });
 }