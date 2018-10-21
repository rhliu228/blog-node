const fs=require('fs');
function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path=url.substring(4);
            router.get(path,mapping[url]);
        }else if(url.startsWith('POST ')){
            var path=url.substring(5);
            router.post(path,mapping[url]);
        }else if(url.startsWith('DELETE ')){
             var path=url.substring(7);
            router.delete(path,mapping[url]);
        }
    }
}
function addControllers(router,dir){
    var files=fs.readdirSync(__dirname+dir);
    var js_files=files.filter((f)=>{
        return f.endsWith('.js');
    });
    for(var f of js_files){
        console.log(`process controllers:${f}`);
        let mapping=require(__dirname+dir+'/'+f);
        addMapping(router,mapping);
    }
}
module.exports=function(dir){
    let 
    controllers_dir=dir||'/controllers',   
    router=require('koa-router')(),
    child_dirs=['/admin','/user'];
    for(let dir of child_dirs){
        addControllers(router,controllers_dir+dir);
    }
    return router.routes();
}