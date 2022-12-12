function EditElement(id, element) {

    
    document.querySelector(`#body_${id}`).style.display = 'none';
    // document.querySelector(`#image_${id}`).style.display = 'none';
    document.querySelector(`#like_${id}`).style.display = 'none';
    document.querySelector(`#count_${id}`).style.display = 'none';
    let div = document.getElementById(`div_${id}`);
    let input = document.createElement("textarea");
    let button = document.createElement("button");
    div.appendChild(input); //appendChild
    div.appendChild(button);

    // const edit = getElement(`edit_${id}`)
    // const edit = getElement(`edit_${id}`)

    element.value = "Cancel"
    element.id = `cancel_${id}`

    element.onclick = () => {
        console.log("hello")
        document.querySelector(`#body_${id}`).style.display = 'block';
        document.querySelector(`#like_${id}`).style.display = 'block';
        document.querySelector(`#count_${id}`).style.display = 'block';
        element.value = "Edit"
        element.id = `edit_${id}`
    }

    // element.style.display = "None";

    // const cancel = document.getElementById(`cancel_${id}`)
    // cancel.style.display = "block"
    // element.id = `close_${id}`



    // let cancel = document.getElementById(`inbox_${id}`).value = "Cancel";
    // document.getElementById(`inbox_${id}`).id = `cancel_${id}`;
    // cancel.id = `cancel_${id}`

    // document.getElementById(`#cancel_${id}`).onclick = ChangeElement(id)
}

function CloseElement(id, element) {
    document.querySelector(`#body_${id}`).style.display = 'block';
    // document.querySelector(`#image_${id}`).style.display = 'none';
    document.querySelector(`#like_${id}`).style.display = 'block';
    document.querySelector(`#count_${id}`).style.display = 'block';
    // let div = document.getElementById(`div_${id}`);
    // let input = document.createElement("textarea");
    // let button = document.createElement("button");
    // div.appendChild(input); //appendChild
    // div.appendChild(button);
    element.value = "Edit"
    element.id = `edit_${id}`
}

// function ChangeElement(id) {
//     document.querySelector(`#cancel_${id}`).value = "Edit";
//     document.querySelector(`#cancel_${id}`).id = `inbox_${id}`;


// }

function Click(id, element) {

    // console.log(edit)
    // console.log(cancel)

    // if (edit.style.display === "none") {
    //     console.log("True")
    //     edit.style.display = "block";
    //     cancel.style.display = "none";
    // }
    // else {
    //     console.log("False")
    //     edit.style.display = "none";
    //     cancel.style.display = "block";
    // }
    // const edit = document.getElementById(`inbox_${id}`);
    // const cancel = document.getElementById(`cancel_${id}`);


    // edit.addEventListener('click', () => {
    //     console.log("hi")
    //     // Click(id, edit, cancel)
    //     element.style.display = "none"

    // })
    // cancel.addEventListener('click', () => {
    //     console.log("hello")
    //     // Click(id, edit, cancel)
    //     element.style.display = "block"
    // })

    // const edit = document.querySelector(`#inbox_${id}`)
    // const cancel = document.querySelector(`#cancel_${id}`)

    // if (element.id === `inbox_${id}` && element.style.display === "none"){
    //     element.style.display = "block"
    //     cancel.style.display = "none"
    // } else if (element.id === `cancel_${id}` && element.style.display === "none") {
    //     element.style.display = "block"
    //     edit.style.display = "none"
    // }



}


// function OpenElement(id) {
//     document.querySelector(`#body_${id}`).style.display = 'block';
//     // document.querySelector(`#image_${id}`).style.display = 'none';
//     document.querySelector(`#like_${id}`).style.display = 'block';
//     document.querySelector(`#count_${id}`).style.display = 'block';
//     document.getElementById(`cancel_${id}`).value = "Edit";
//     document.getElementById(`cancel_${id}`).id = `inbox_${id}`;
// }

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => {

        const element = event.target;

        // console.log(id)

        if (element.id.startsWith('inbox_')) {

            const id = element.dataset.id;

            // Click(id)
            // const cancel = document.getElementById(`cancel_${id}`);

            // element.value = "Cancel"

            // console.log(element)
                // Click(id, edit, cancel)

            // cancel.addEventListener('click', () => {
            //     console.log("hello")
            //     // Click(id, edit, cancel)
            // })

            // Click(id, element);


            EditElement(id, element)

            // document.querySelector(`#body_${id}`).style.display = 'none';
            // var textarea = document.createElement('textarea')
            // var element = document.getElementById(`div_${id}`)

            // document.querySelector(`#cancel_${id}`).onclick = OpenElement(id)


            console.log("this is edit")
            console.log(id)

        }


        if (element.id.startsWith('close_')) {
            const id = element.dataset.id

            console.log("this is close")
            // CloseElement(id, element)

            // Click(id, element);


        }

        if (element.id.startsWith('like_')) {

            let id = element.dataset.id

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
                likes = data.islike
                count = data.count

                if (likes == true){
                    post = document.querySelector(`#like_${id}`).innerHTML = '<i class="bi bi-hand-thumbs-up"></i>Unlike'
                }
                else{
                    post = document.querySelector(`#like_${id}`).innerHTML = '<i class="bi bi-hand-thumbs-up"></i>Like'
                }

                document.querySelector(`#count_${id}`).innerHTML = count


                console.log(data.count)


            })


        }

    });
});



function hi() {
    console.log('Hello world');
};

function edit() {
    console.log("edit working")
}