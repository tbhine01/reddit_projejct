const express = require("express");
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, '/public')))

let posts = [
    {
        "id": "1",
        "upvotes": "100",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "I Am Groot",
        "author": "tajah",
        "subreddit": "marvel"
    },
    {
        "id": "2",
        "upvotes": "1000",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "Andre300 New Album",
        "author": "zack",
        "subreddit": "music"
    },
    {
        "id": "3",
        "upvotes": "756",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "Funny Cat Video",
        "author": "tiana",
        "subreddit": "cats"
    },
    {   
        "id": "4",
        "upvotes": "5789",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "Building a hoouse under a rock ledge",
        "author": "blackberry819h",
        "subreddit": "oddlysatisfying"  
    },
    {
        "id": "5",
        "upvotes": "682",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "Starry Night Lego Build",
        "author": "teagen",
        "subreddit": "lego"  
    },
    {
        "id": "6",
        "upvotes": "566",
        "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/1/16/Groot_textless.jpg", 
        "title": "AITA for eating the last donut",
        "author": "donuteater485",
        "subreddit": "aita"  
    }
]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'))
})

app.get("/posts", (req, res) => {
    res.send(posts)
})

// Create a router that sends all the posts

// Create a route for upvoting
app.get("/upvotes/:id", (req, res) => {
    const id = req.params.id

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            let upvotes = Number(posts[i].upvotes)
            upvotes = upvotes + 1
            posts[i].upvotes = upvotes.toString()
        }
    }

})
// Create a route for downvoting
app.get("/downvotes/:id", (req, res) => {
    const id = req.params.id
    
    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            let downvotes = Number(posts[i].upvotes)
            downvotes = downvotes - 1
            posts[i].upvotes = downvotes.toString()
        }
    }

})

app.get("/subreddits/:subreddit", (req, res) => {
    const subreddit = req.params.subreddit

    const subredditPosts = []

    for(let i = 0; i < posts.length; i++){
        if(posts[i].subreddit == subreddit){
            subredditPosts.push(posts[i])
        }
    }
    res.send(subredditPosts)
})

app.listen(3000)
console.log("Express App is running") 



/*
To Do List: 
    1. Setup a basic UI ✅
    2. Create posts (seeding) ✅
    3. Display posts on webpage  ✅
        a. create a path to send our data ✅
        b. fetch data from express ✅
        c. create HTML elements ✅
    4. Ability to upvote and downvote posts
        a. Add buttons to out post ✅
        b. When you click the up button - add one; if you click down button - down one
            i. create an onclick function for our buttons ✅
            ii. post to our express app that we need to update the value
                a. Figure out which post is being updated ✅
                b. create routes to handle the request
                c. update values ✅
            iii. create routes for upvoting and downvoting ✅
            iv. convert our string to a number ✅
            v. update upvite value in array ✅
    5. View specific subreddits
        a. add a navbar to our HTML so users can select different subreddits
        b. create a route that returns posts from a specific subreddit
        c. display posts from subreddit on our webpage
    Last Step: CSS
*/
