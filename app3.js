var readlineSync = require('readline-sync');
var exit = false;
var parent_id = 0;
var currentFolder = 0;
var lastId = 0;
var printed = 0;
var folder_stack = [];
folder_stack[0] = 0;


var menu = [
    'Print current folder',
    'Change current folder',
    'Create file or folder',
    'Delete file or folder',
    'Search in file or folder',
    'Quit Program'
];

/* this will be the storage for our file system */
//var files={id,parent,name,content};
//var folders={id,parent,name};
var depth = 0;

var fsStorage = [


    {
        id: 0,
        name: 'root',
        children: [{
                id: 1,
                name: 'sub1',
                children: [
                    { id: 4, name: 'file1.txt', content: 'text text' },
                    { id: 12, name: 'sub3', children: [] }
                ]
            },
            { id: 2, name: 'sub2', children: [] },
            { id: 3, name: 'file2.txt', content: 'text' },
        ]
    }
];

var begin = fsStorage[0].children;

main();

function main() {
    printCurrentFolder();
    while (!exit) {
        printMenu();
    }
    process.exit(0);
}

function printMenu() {
    var answer = readlineSync.keyInSelect(menu, 'Please make your choice:');
    switch (answer) {
        case 0:
            printCurrentFolder();
            break;
        case 1:
            {
                printed = 0;
                changeCurrentFolder();
                printCurrentFolder();
            }
            break;
        case 2:
            createFileOrFolder();
            break;
        case 3:
            deleteFileOrFolder();
            break;
        case 4:
            searchInFileOrFolder();
            break;
        case 5:
            quitProgram();
            break;
    }
}

function printCurrentFolder() {

    //console.log("showing : id: " + currentFolder);
    printed = 0;
    printChildrenOfFolderWithIdOf(currentFolder, fsStorage);



}

function printChildrenOfFolderWithIdOf(myId, myArray) {

    if (printed)
        return;
    if (!myArray) {
        return;
    }
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id == myId) {
            console.log("showing content of:");
            console.log("<" + myArray[i].name + ">");
            //console.log("--" + myArray[i].children);
            for (var x = 0; x < myArray[i].children.length; x++) {
                if (myArray[i].children[x].children)
                    console.log("------" + myArray[i].children[x].name + " <fold>");
                else
                    console.log("------" + myArray[i].children[x].name + " <file>");
            }
            printed = 1;
            return;
        } else printChildrenOfFolderWithIdOf(myId, myArray[i].children);
    }


}



function changeCurrentFolder() {
    /* todo: implement cli to move in all directions  */
    var folderName = readlineSync.question('type the name of the folder to change to:(or .. to move up) ');
    if (folderName == '..') {
        if (currentFolder == 0) {
            console.log("already in root , can not move above that");
            return;
        }
        currentFolder = folder_stack.pop();
        console.log("moved one folder up:" + currentFolder);
        return;
    }
    found = 0;
    findChildId(currentFolder, folderName, fsStorage);
    if (!found)
        console.log("no such folder name:" + folderName);
}

function findChildId(location, myNameis, myArray) {
    // console.log(myArray);
    if (!myArray)
        return;
    for (var i = 0; i < myArray.length; i++) {
        if (location == myArray[i].id)
            if (myArray[i].children)
                for (var x = 0; x < myArray[i].children.length; x++) {

                    if (myArray[i].children[x].name == myNameis) {
                        if (!myArray[i].children[x].children)
                            return;
                        folder_stack.push(currentFolder);
                        console.log("pushed: " + currentFolder);
                        currentFolder = myArray[i].children[x].id;

                        found = 1;
                        return currentFolder;
                    }
                }
        findChildId(location, myNameis, myArray[i].children);
    }




}





function createFileOrFolder() {

    /* todo: implement additon of file/folder to file system array   */
    /*   var folderName = readlineSync.question('creating a file or a folder? (type file or folder)');
       if (folderName === "folder") {
           myType = 1;
           var folderName = readlineSync.question('type the name of the folder to create:');


       }
       if (folderName === "file") {
           myType = 2;
           var folderName = readlineSync.question('type the name of the file to create:');
           var content = readlineSync.question('type the content of the file:');



       } else { console.log("wrong option"); return; }

       console.log(folderName + " created!");

       createIteminCurrentFolder(mytype, currentFolder, fsStorage, folderName, content);*/
}

function createIteminCurrentFolder(kind, location, myArr, myName, content) {
    /*
        for (var i = 0; i < myArr.length; i++) {
            if (myArr[i].id = location) {
                for (var x = 0; x < myArr[i].children.length; x++) {
                    if (myArr[i].children[x].name == myName) {
                        console.log(myName + " already exists");
                        
                    }
                }
            }
        }
    */
}


function deleteFileOrFolder() {
    console.log('delete file folder');
    var folderName = readlineSync.question('type the name of the file or folder to delete:');
    console.log(folderName);

}

function searchInFileOrFolder() {
    console.log('searching current files folder');
    /* todo: implement search across all folders by name and content  */
}

function quitProgram() {
    var answer = readlineSync.keyInYNStrict('Are you sure?');
    exit = answer ? true : false;
}


function printChildren(myArr) {
    if (!myArr) {
        return;
    }
    for (var i = 0; i < myArr.length; i++) {
        console.log(myArr[i].name);
        depth++;
        if (depth < 1)
            printChildren(myArr[i].children);

    }
}


function show_parent(myArr) {



}

function move_one_dir_up(current) {

    current = traverse(begin);
    return current;
}