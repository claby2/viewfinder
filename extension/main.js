function getAnalysis(_text) {
    return fetch('http://localhost:5678/getOpinion', {method : "POST", body : JSON.stringify({"text" : _text}), headers : {'Content-Type': 'application/json'}})
    .then(res => res.json())
}


let sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

setTimeout(function(){
    let text;
    let posts = [...document.querySelectorAll('div.entry')];

    (function recurse(i) {
        let arr = [...posts[i].querySelectorAll('div.usertext-body')]; // Set arr as array of div children with usertext-body class
        if(arr.length === 0) { // Check if post is a title
            posts[i] = [...posts[i].querySelectorAll('.title')][1]; // Set posts element as title of a post
        } else {
            posts[i] = arr[0]; // Set posts element as comment or post content
        }

        if(!(posts[i] === undefined)) {
            getAnalysis(posts[i].innerText).then(elem => {
                console.log(elem);
            });
        }

        if(i + 1 < posts.length) {
            setTimeout(recurse, 100, i + 1); // Untested might change
        }
    })(0);
}, 3000); // Timeout acts as a buffer while page loads  