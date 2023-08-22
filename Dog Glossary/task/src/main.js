const button = document.querySelector("#button-random-dog");
const content = document.querySelector("#content");
const breed = document.querySelector("#input-breed");
const showBreedButton = document.querySelector("#button-show-breed");
const subBreed = document.querySelector("#button-show-sub-breed");
const allBreeds = document.querySelector("#button-show-all");



const img = document.createElement("img");
const p = document.createElement("p");

button.addEventListener('click', async function() {
    removeChildren();
    img.src = await randomDog();
    img.alt = "some dog";
    content.appendChild(img);
})
p.textContent = "Breed not found!";

allBreeds.addEventListener("click", async function() {
    removeChildren();
    const data = await listAllBreeds();
    console.log(data);
    const ol = document.createElement("ol");
    for (let key in data) {
        const li = document.createElement("li");
        li.textContent = `${key}`;
        ol.appendChild(li);
        const ul = document.createElement("ul");
        for (let i = 0; i < data[key].length; i++) {
           const li2 = document.createElement("li");
           ul.appendChild(li2);
           li2.textContent = `${data[key][i]}`;
           li.appendChild(ul);
        }
    }
    content.appendChild(ol);

})

showBreedButton.addEventListener("click", async function() {
    const data = await dogByBreed(breed);
    if (data) {
        removeChildren();
       img.src = data;
       img.alt = "dasdsad";
        content.appendChild(img);
    } else {
        removeChildren();
        img.remove();
        content.appendChild(p) ;
    }

})



subBreed.addEventListener("click", async function () {
    const data = await showSubBreeds(breed);

    if (data && data.length > 0) {
        removeChildren()
        const ul = document.createElement("ol");
        content.appendChild(ul);
       for(let i = 0; i < data.length; i++) {
           const li = document.createElement("li");
           ul.appendChild(li);
           const pList = document.createElement("p");
           pList.textContent = data[i];
           li.appendChild(pList)
       }
    } else {
        removeChildren()
        const pList = document.createElement("p");
        console.log(data);
        if (data) {
            pList.textContent = "No sub-breeds found!";
        } else {
            pList.textContent = "Breed not found!";
        }
        content.appendChild(pList);
    }
})

async function randomDog() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
}

async function dogByBreed(breed) {
    const res = await fetch(`https://dog.ceo/api/breed/${breed.value.toLowerCase()}/images`)
    if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        return data.message[Math.floor(Math.random() * data.message.length - 1)];
    } else {
        return false;
    }
}

async function showSubBreeds(breed) {
    const res = await fetch(`https://dog.ceo/api/breed/${breed.value.toLowerCase()}/list`)

    console.log(res.status);
    if (res.status == 200) {
        const data = await res.json();
        return data.message;
    } else {
        return false;
    }
}

async function listAllBreeds() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    return   data.message;
}

function removeChildren() {
    let arr = content.children;
    for (let i = 0; i < arr.length; i++) {
        arr[i].remove();
    }
}


