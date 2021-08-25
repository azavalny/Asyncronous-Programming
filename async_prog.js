//AJAX = Asynchronous Javascript and XML. Allows you to make requests from servers that run in the background that dosen't affect the main application

//Synchronous <--runs in order on the Stack

function myFunc(){
    console.log("myFunc is running");
}
console.log("Starting!");
myFunc();
console.log("Finished");


console.log("Starting!");
//Async function which delays the code by 2 secs, using a callback function
setTimeout(() => {
    console.log("In the Timeout");
}, 2000);
console.log("Finished");



//Example of where synchronous programming would hurt us in an app

console.log('Start');

function loginUser(email, password){
    //time out to simulate the length of time 
    setTimeout(()=>{
        return {userEmail: email}
    }, 5000);
}

const user = loginUser('whoosegonnacarrytheboats@gmail.com', 12345);
console.log(user); // <-- gives us undefined because it took too much time to run before the finish print

console.log('Finish');


//Callback function = function passed in as a parameter to be run later

console.log('Start');

function loginUser(email, password, callback){
    //callback is used instead of return
    setTimeout(()=>{
        callback( {userEmail: email});
    }, 2000);
}

function getUserVideos(email, callback){
    setTimeout( ()=>{
        callback(['video1','video2','video3']);
    }, 5000);
}

function videoDetails(video, callback){
    setTimeout( ()=>{
        callback('Video Title');
    }, 1400);
}

const user = loginUser('whoosegonnacarrytheboats@gmail.com', 12345, (user)=>{
    console.log(user);
    getUserVideos(user.userEmail, (videos) =>{
        console.log(videos);
        videoDetails(videos[0], (title) =>{
            console.log(title); //<-- we are approaching callback hell as we keep nesting callbacks within each other
        });
    });
});

console.log('Finish');


//promise = object that returns the result or failure of an async operation

const promise = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        //returns resolve instead of callback
        resolve({user: "joe"});
        reject(new Error('User not logged in'));
    }, 2000);
});


promise.then(user =>{
    console.log(user);
}).catch(err => console.log(err.message));


//Refactoring the loginUser with promises and async await to make it much nicer
console.log('Start');

function loginUser(email, password){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve( {userEmail: email});
        }, 2000);
    });
}

function getUserVideos(email){
    return new Promise((resolve, reject) =>{
        setTimeout( ()=>{
            resolve(['video1','video2','video3']);
        }, 5000);
    });
}

function videoDetails(video){
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            resolve('Video Title');
        }, 1400);
    });
}

/*
loginUser('user1','1234')
.then(user => getUserVideos(user.email))
.then(videos => videoDetails(videos[0]))
.then(detail => console.log(detail));
*/

async function displayUser() { //<-- this is a simplier way of writing the nested .thens
    try{
        const loggedUser = await loginUser('user2','pass2');
        const videos = await getUserVideos(loggedUser.userEmail);
        const detail = await videoDetails(videos[0]);
    } catch (err) {
        console.log("We couldn't get the videos");
    }
}
displayUser();

console.log('Finish');


/***********************************************
 *Real World Example using fetch() with an image 
 **********************************************/
 
 async function catchImage(){
    const response = await fetch('http://localhost:3000/image.jpg');
    const image = await response.preprocess(); //preprocess is some helper function somewhere else in the program
    document.getElementById("my-image").src = URL.createObjectURL(image);
 }

 catchImage().then(response =>{
     console.log("Successful")
 }).catch(error => {
     console.error(error);
 });
 