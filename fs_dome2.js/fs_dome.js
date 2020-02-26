var fs=require('fs')
var path=require('path')
var readDir=function(dir){
   fs.readdir(dir,function(err,files){
     if(err &&err.code=='ENOTDIR'){
         console.log(dir)
         return
     }
     files.forEach(function(e){
         readDir(path.join(dir,e))
     })
   })

}