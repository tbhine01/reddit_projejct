fetch("/posts")
.then((response) => {
    return response.json()
})

.then((data) => {
    displayPosts(data)
})

.catch((error) => {
    console.log(error)
})



function displayPosts(data) {

    const postContainer = document.getElementById("post_container")
    postContainer.innerHTML = ""

    data.forEach((reddit) => {
        console.log(reddit)

        // Get post info
        const postTitle = reddit.title 
        const postImage = reddit.image 
        const postUpvotes = reddit.upvotes 
        const postAuthor = reddit.author 
        const postSubreddit = reddit.subreddit
        const postId = reddit.id 
        console.log(postId)


        // Create HTML elements
        let postDiv = document.createElement("div")
        let postUpvoteTag = document.createElement("p")
        let postImg = document.createElement("img")
        let postInfoDiv = document.createElement("div")
        let postTitleTag = document.createElement("h5")
        let postDetailsDiv = document.createElement("div")
        let postAuthorTag = document.createElement("a")
        let postSubredditTag = document.createElement("a")
        let voteContainer = document.createElement("div")
        let upvoteButton = document.createElement("button")
        let downvoteButton = document.createElement("button")
        
        
        postDiv.appendChild(voteContainer)
        postDiv.appendChild(postUpvoteTag)
        postDiv.appendChild(postImg)
        postDiv.appendChild(postInfoDiv)

        voteContainer.appendChild(upvoteButton)
        voteContainer.appendChild(postUpvoteTag)
        voteContainer.appendChild(downvoteButton)

        postInfoDiv.appendChild(postTitleTag)
        postInfoDiv.appendChild(postDetailsDiv)

        postDetailsDiv.appendChild(postAuthorTag)
        postDetailsDiv.appendChild(postSubredditTag)

        postUpvoteTag.id = postId

        postDiv.classList.add("post")
        postUpvoteTag.classList.add("upvotes")
        postImg.classList.add("post_image")
        postInfoDiv.classList.add("post_info")
        postTitleTag.classList.add("post_title")
        postDetailsDiv.classList.add("post_details")
        postAuthorTag.classList.add("post_author")
        postSubredditTag.classList.add("post_subreddit")
        voteContainer.classList.add("vote_container")
        upvoteButton.classList.add("upvote_button")
        downvoteButton.classList.add("downvote_button")

        // Put info on pages
        postUpvoteTag.innerText = postUpvotes
        postImg.src = postImage
        postTitleTag.innerText = postTitle
        postAuthorTag.innerText = postAuthor
        postSubredditTag.innerText = `r/${postSubreddit}`
        upvoteButton.innerText = "⬆"
        downvoteButton.innerText = "⬇"

        // Add functionality to buttons
        upvoteButton.setAttribute("onclick", `upvote(${postId})`)
        downvoteButton.setAttribute("onclick", `downvote(${postId})`)

        // Put our posts on the page
        const postContainer = document.getElementById("post_container")
        postContainer.appendChild(postDiv)
    }) 
}


// Making voting buttons functional 
function upvote(id){
    fetch(`/upvotes/${id}`)
    .then((response) => {
        return response.json()
    })

    .then((data) => {
    })

    const upvoteTag = document.getElementById(id)
    upvoteTag.innerText = Number(upvoteTag.innerText) + 1

}

function downvote(id) {
    fetch(`/downvotes/${id}`)
    .then((response) => {
        return response.json()
    })

    .then((data) => {

    })
    
    const downvoteTag = document.getElementById(id)
    downvoteTag.innerText = Number(downvoteTag.innerText) - 1
}


// make subreddits appear
function getPostsBySubreddit(subreddit){
    fetch(`/subreddits/${subreddit}`)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)
        displayPosts(json)
    })

    .catch((error) => {
        console.log(error)
    })
}

function goToMainPage(){
    fetch("/posts")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        displayPosts(json)
    })
}