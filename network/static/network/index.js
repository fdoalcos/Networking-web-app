document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#all__post').addEventListener('click', () => {
        // call landing page
        load_landingpage('all__post');
      });

    // by default, landing page should be default
    load_landingpage('all__post')
    

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

        if (element.id.startsWith('comment_')) {
            let id = element.dataset.id

            // console.log("I'm clicked")
            let value = document.getElementById("post__commentform").value;
            let div = document.getElementById(`comments_${id}`)
            // let user = document.getElementById('comment_user')
            // let userComment = document.getElementById('comment_comment')
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
                // console.log(data)
                div.append(data.user + "\n")
                div.appendChild(document.createElement("BR"));
                div.append(data.comment + "\n")
                div.appendChild(document.createElement("BR"));
            })
            
            document.getElementById("id_comment").value = '';
            console.log("done")
        }

        if (element.id.startsWith('post__')) {
            let id = element.dataset.id
            console.log(`I'm clicked ${id}`)
            let maindiv = document.getElementById("main__header")
            let div = document.getElementById(`start-comment_${id}`)
            div.style.display = "block";
            maindiv.style.borderRadius = 0;
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
    if (type === "all__post") {
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

        document.getElementById('post__commentform').onkeyup = (event) => {
            let element = event.target
            let id = element.dataset.id
            let postId = document.getElementById('post__commentforminside').innerHTML;

            // document.getElementsByName('post__commentbutton').style.color = "blue";
            console.log(`this is the ${postId} and it's working`)
            // console.log(document.getElementsByName('post__commentbutton'))
            // document.getElementsByName('post__commentbutton').style.color = "blue";
            if (document.getElementById('post__commentform').value.length > 0) {
                document.getElementById(`comment_${postId}`).style.color = "#707273";
            } else {
                document.getElementById(`comment_${postId}`).style.color = "#B4B6B8";
            }
        }

    }

}