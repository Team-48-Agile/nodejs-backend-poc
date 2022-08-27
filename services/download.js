const fs = require('fs');

fs.open('textfile.txt', 'w', function(err, file){
    if(err){
        console.error(err);
        return;
    }
    console.log("File created");
})