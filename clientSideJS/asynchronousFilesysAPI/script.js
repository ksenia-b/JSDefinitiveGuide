function logerr(e){
    console.log(e);
}
let filesystem;
requestFileSystem(PERSISTENT, 10*1024*1024,
    function(fs){
        filesystem = fs;
    }, logger
);

function readTextFile(path, callback){
    filesystem.root.getFile(path, {}, function(entry){
        entry.file(function(file){
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(){
                callback(reader.result);
            }
            reader.onerror = logerr;
        }, logger);
    }, logger);
}

function appendToFile(path, contents, callback){
    filesystem.root.getFile(path, {create:true},
        function(entry){
            entry.createWriter(function(writer){
                writer.seek(writer.length);
                let bb = new BlobBuilder();
                bb.append(contents);
                let blob = bb.getBlob();
                writer.write(blob);
                writer.onerror = logger;
                if(callback)
                writer.onwrite = callback;
            }, logger)
        }, logger)
}

function deleteFile(name, callback){
    filesystem.root.getFile(name, {}, function(entry){
        entry.remove(callback, logger)
    }, logger);
}

function makeDirectory(name, callback){
    filesystem.root.getDirectory(name, {
        create: true,
        exclusive: true
    }, callback, logger);
}

function listFiles(path, callback){
    if(!path) getFiles(filesystem.root);
    else filesystem.root.getDirectory(path, {}, getFiles, logger);

    function getFiles(dir){
        let reader = dir.createReader();
        let list = [];
        reader.readEntries(handleEntries, logger);

        function handleEntries(entries){
            if(entries.length == 0) callback(list);
            else{
                for(let i = 0; i < entries.length; i++){
                    let name = entries[i].name;
                    if(entries[i].isDirectory) name += "/";
                    list.push(name);
                }
                reader.readEntries(handleEntries, logger);
            }
        }
    }
}