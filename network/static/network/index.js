

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#all__post').addEventListener('click', () => {
        // call landing page
        load_landingpage('all__post');
      });
    
    document.querySelector('#mainUser').addEventListener('click', () => {
        // call landing page
        load_landingpage('mainUser');
        // console.log("Hello")
    });

    // by default, landing page should be default
    load_landingpage('all__post')

    
    document.getElementById("profile__imagebutton").onclick = () => {
        const inputfileImage = document.getElementById("input__fileImage");
        inputfileImage.addEventListener('change', event => {
            var div = document.getElementById("image__filename");
            var imgUrl = event.target.value.replace(/^.*\\/, "")
            console.log(imgUrl);
            div.innerHTML = imgUrl
        });
    };

    document.getElementById("profile__bimagebutton").onclick = () => {
        const inputfileImage = document.getElementById("input__fileImages");
        inputfileImage.addEventListener('change', event => {
            var div = document.getElementById("backgroundImage_file");
            var imgUrl = event.target.value.replace(/^.*\\/, "")
            console.log(imgUrl);
            div.innerHTML = imgUrl
        });
    };


    document.addEventListener('click', event => {



        const element = event.target;
        
        if (element.id.startsWith('all__post')) {
            //code
        }

        if (element.id.startsWith('following_')) {
            console.log("I'm clicked");
        }


        if (element.id.startsWith('inbox_')) {

            let id = element.dataset.id;

            // edit text box function
            
            // not yet final
            
            // document.querySelector(`#body_${id}`).style.display = 'none';
            // document.querySelector(`#inbox_${id}`).style.display = 'none';
            
            
            // document.querySelector(`#image_${id}`).style.display = 'none';
            // document.querySelector(`#like_${id}`).style.display = 'none';

            // not yet final


            // document.querySelector(`#count_${id}`).style.display = 'none';
            // let div = document.getElementById(`div_${id}`);
            // let input = document.createElement("textarea");
            // let button = document.createElement("input");
            // button.type = "submit"
            // button.value = "Save"
            // div.appendChild(input); //appendChild
            // div.appendChild(button);

            let value = document.getElementById(`body_${id}`).innerHTML;
            
            console.log(value)

            // not yet final
            let textarea = document.getElementById(`edit__textarea_${id}`);
            let button = document.getElementById(`edit__button_${id}`)
            // let textareavalue = textarea.value
            textarea.innerHTML = value;
            // textarea.style.display = "none"
            console.log(textarea)
            console.log(button)
            // console.log(textareavalue)


            button.onclick = () => {
                console.log("I'm clicked");
            }

            // not yet final
            // input.innerHTML = value;



            // fetch to post edited comment

            button.addEventListener('click', () => {
                console.log("I'm clicked")
                let newValue = textarea.value;
                let id = element.dataset.id;
                fetch(`/edit/${id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        body: newValue
                    })
                })
                .then(res => {
                    if (res.ok){
                        return res.json()
                    } else {
                        console.log("error")
                    }
                })
                .then(data => {
                    if (data.success === "successful"){
                        // close data 
                        // not yet final 

                        // close.style.display = "none"
                        // button.style.display = "none"
                        // input.style.display = "none"
                        // document.querySelector(`#body_${id}`).style.display = 'block';
                        // document.querySelector(`#inbox_${id}`).style.display = 'block';
                        // // document.querySelector(`#image_${id}`).style.display = 'none';
                        // document.querySelector(`#like_${id}`).style.display = 'block';
                        // document.querySelector(`#count_${id}`).style.display = 'block';
                        document.getElementById(`body_${id}`).innerHTML = data.inbox

                    }
                })
            });


            // not yet final

            // create close

            // let close = document.createElement("input")
            // close.type = "button"
            // close.value = "Close"
            // div.append(close)

            // close or cancel

            // close.addEventListener('click', () => {
            //     close.style.display = "none"
            //     button.style.display = "none"
            //     input.style.display = "none"
            //     document.querySelector(`#body_${id}`).style.display = 'block';
            //     document.querySelector(`#inbox_${id}`).style.display = 'block';
            //     // document.querySelector(`#image_${id}`).style.display = 'none';
            //     document.querySelector(`#like_${id}`).style.display = 'block';
            //     document.querySelector(`#count_${id}`).style.display = 'block';
            // })

        }

        if (element.id.startsWith('like_')) {

            let id = element.dataset.id


            console.log(`This is ${id}`)

            // console.log(id)

            // Make fetch request to update page without full reload
            fetch(`/likes/${id}`, {
                method: "POST"
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // If response receives an error, rejects the promise and returns an error to the console.
                else {
                    console.log("error")
                }
            })
            .then(data => {
                console.log(data.count)
                count = data.count
                likes = data.islike

                if (likes == true){
                    console.log("I'm True")
                    post = document.querySelector(`#like_${id}`).innerHTML = '<i class="inbox__tag bi bi-hand-thumbs-up-fill"></i>Unlike'
                    document.querySelector(`#like_${id}`).className = 'liked inbox__like';
                    // document.querySelector(`#count_${id}`).innerHTML = `<img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"> ${count}`;
                    document.getElementById(`count_${id}`).innerHTML = `<img class="like__image" src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="like-img" style="width: 20px;"> ${count}`;
                    document.querySelector(`#count_${id}`).style.display = "block";

                    // document.querySelector(`#count_${id}`).style.display = "flex";
                    // document.querySelector(`#count_${id}`).style.display = "block";

                }
                else{
                    console.log("I'm False")
                    post = document.querySelector(`#like_${id}`).innerHTML = '<i class="inbox__tag bi bi-hand-thumbs-up"></i>Like'
                    document.querySelector(`#like_${id}`).className = 'inbox__like';
                    if (count <= 0) {
                        document.querySelector(`#count_${id}`).style.display = "none";
                    }  
                    else {
                        console.log(count - 1)
                        document.getElementById(`count_${id}`).innerHTML = `<img class="like__image" src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="like-img" style="width: 20px;"> ${count}`;
                    }                  

                }

                console.log(data.count)


            })


        }

        if (element.id.startsWith('follow_')) {
            // get id of the follow user
            let id = element.dataset.id

            console.log(`I'm clicked and this is the ${id}`)

            // fetch to follow

            fetch(`/profile/follow/${id}`, {
                method: "POST"
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    console.log("error found")
                }
            })
            .then(data => {
                console.log(data)
                if (data.check === true) {
                    console.log("I'm True");
                    // swap
                    document.querySelector(`#follow_${id}`).innerHTML = 'Follow';
                    document.querySelector(`#follow_${id}`).className = 'inbox__follow'

                }
                else {
                    console.log("I'm False");
                    // swap
                    document.querySelector(`#follow_${id}`).innerHTML = 'Unfollow';
                    document.querySelector(`#follow_${id}`).className = 'inbox__unfollow'
                }
            })
            
        }

        if (element.id.startsWith('comment_')) {
            let id = element.dataset.id
            
            // console.log("I'm clicked")
            let value = document.getElementById(`post__commentform_${id}`).value;
            let div = document.getElementById(`comments_${id}`)
            console.log(div)
            console.log(`this is the value ${value}`)
            fetch(`/comment/${id}`, {
                method: "POST",
                body: JSON.stringify({
                    body: value
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    console.log("Error")
                }
            })
            .then(data => {
                console.log(data)
                let div2  = document.createElement("div")
                div2.innerHTML = `
                    <div class="comment__flex">
                        <div class="comment__image post__images">
                            <img class="main__image rounded__circle" id="Profile_pic" src="${data.image}" alt="image" width=50>
                           
                        </div>
                        <div class="comment__contents">
                            <p class="comment__user" id="comment_user">${data.user}</p>
                            <p class="comment__comment" id="comment_comment">${data.comment}</p>
                        </div>
                    </div>
                    `

                console.log(`this is ${div2}`)
                div.append(div2)

                console.log(document.getElementById(`posts__commentcounts_${id}`))

                
                if (data.count <= 0) {
                    document.getElementById(`post__commentcounts_${id}`).style.display = "none"
                } else if (data.count === 1) {
                    document.getElementById(`post__commentcounts_${id}`).innerHTML = `${data.count} comment`
                } else {
                    document.getElementById(`post__commentcounts_${id}`).innerHTML = `${data.count} comments`
                }
            })
            
            document.getElementById(`post__commentform_${id}`).value = '';
            console.log("done")
        }

        if (element.id.startsWith('staticBackdropImage')) {
            console.log("I'm in the user's page")
            // const inputfileImage = document.getElementById("input__fileImage");
            // inputfileImage.addEventListener('change', event => {
            //     var div = document.getElementById("image__filename");
            //     var imgUrl = event.target.value.replace(/^.*\\/, "")
            //     console.log(imgUrl);
            //     div.innerHTML = imgUrl
        }

        if (element.id.startsWith('post__')) {
            let id = element.dataset.id
            console.log(`I'm clicked ${id}`)
            let maindiv = document.getElementById("main__header")
            let div = document.getElementById(`start-comment_${id}`)
            div.style.display = "block";
            maindiv.style.borderRadius = 0;
            
            
            // disable button
            
            let textarea = document.getElementById(`post__commentform_${id}`)
            textarea.onkeyup = () => {
                console.log("text area working right")
            
            if (document.getElementById(`post__commentform_${id}`).value.length > 0) {
                document.getElementById(`comment_${id}`).style.color = "#707273";
            } else {
                document.getElementById(`comment_${id}`).style.color = "#B4B6B8";
            }
        }

        }

        if (element.id.startsWith('posts__comment')) {
            // console.log("I'm clicked");
            let id = element.dataset.id
            console.log(`This is the id: ${id}`)
            let div = document.getElementById(`start-comment_${id}`)
            div.style.display = "block";
        }


    });
});



function hi() {
    console.log('Hello world');
};

function edit() {
    console.log("edit working")
}



function load_landingpage(type) {
    console.log(`This mailbox is going to be in ${type}`)

    if (type == "all__post") {
        console.log("I'm on the landing page now");
        // api key for news

        const api = "TyOzpDOsiPDswmPSyKBjIMjqlTRsnwVW";
        fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            let results = data.results.slice(0, 5)
            console.log(results)
            results.map(result => {
                    let title = result.title;
                    let url = result.url;
                    let div = document.getElementById("news_body");
                    let h6 = document.createElement("h6");
                    let h62 = document.createElement("h6");
                    h6.className = "news_title"
                    h6.innerHTML = `<a class="news__title" href="${url}">${title}</a>`;
                    h62.className = "news_hour"
                    h62.innerHTML = '2hr'
                    

                    div.appendChild(h6);
                    div.appendChild(h62)
            });
        });

        // onchange for image

        const inputfile = document.getElementById("input__file");
        inputfile.addEventListener('change', event => {
            var div = document.getElementById("image__filename");
            var imgUrl = event.target.value.replace(/^.*\\/, "")
            console.log(imgUrl);
            div.innerHTML = imgUrl
        })

        
    
    

        

        // disable button

        // document.getElementById('post__commentform').onkeyup = (event) => {
        //     let element = event.target
        //     let id = element.dataset.id
        //     let postId = document.getElementById('post__commentforminside').innerHTML;

        //     // document.getElementsByName('post__commentbutton').style.color = "blue";
        //     console.log(`this is the ${postId} and it's working`)
        //     // console.log(document.getElementsByName('post__commentbutton'))
        //     // document.getElementsByName('post__commentbutton').style.color = "blue";
        //     if (document.getElementById('post__commentform').value.length > 0) {
        //         document.getElementById(`comment_${postId}`).style.color = "#707273";
        //     } else {
        //         document.getElementById(`comment_${postId}`).style.color = "#B4B6B8";
        //     }
        // }

    }

    else {
        console.log("This is main user page")

        
    }

}