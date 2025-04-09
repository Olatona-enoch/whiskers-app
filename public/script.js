const cards = document.querySelectorAll(".card");
const inputForm = document.querySelectorAll(".inputForm"); // assuming inputForm are in same order as cards
const displaySection = document.getElementById("display");
const listModal = document.getElementById("my_modal_2");
const breedModal = document.getElementById("my_modal_3");

// cards.forEach((card, i) => {
//     let btn = card.querySelector(".btn");
//     btn.addEventListener("click", () => {
//         // Hide all inputForm first 
//         inputForm.forEach(form => {
//             form.classList.add("hidden");
//             form.classList.remove("flex");
//         });

//         // Show the matching form
//         inputForm[i].classList.remove("hidden");
//         inputForm[i].classList.add("flex");
//     });
// });
cards.forEach((card, i) => {
    let btn = card.querySelector(".btn");
    btn.addEventListener("click", () => {

        // Show the matching form
        const modalBox = inputForm[i].parentElement;
        const display = modalBox.querySelector(".display");
        const loading = modalBox.querySelector(".loading");
        display.classList.add("hidden");
        loading.classList.add("hidden");

        inputForm[i].classList.remove("hidden");
        inputForm[i].classList.add("flex");
    });
});

// function reset(id) {
//     const form = id.querySelector(".inputForm");
//     const display = id.querySelector(".display");
//     const loading = id.querySelector(".loading");
 
// }

const randomFacts_form = document.getElementById("randomFacts");
const list_of_facts_form = document.getElementById("list_of_facts");
const catBreeds_form = document.getElementById("catBreeds");

randomFacts_form.addEventListener("submit", getRandom);
list_of_facts_form.addEventListener("submit", getList);
catBreeds_form.addEventListener("submit", getBreeds);


async function getRandom(event) {
    const display = randomFacts_form.parentElement.querySelector(".display");
    event.preventDefault();
    const loading = randomFacts_form.querySelector(".loading");
    loading.classList.remove("hidden");

    let length = randomFacts_form.querySelector("input").value;
    const response = await fetch(`https://catfact.ninja/fact?max_length=${length}`);
    const package = await response.json();

    console.log(package);
    randomFacts_form.classList.add("hidden");

    display.classList.remove("hidden");

    display.innerHTML = 
       `<h1 class=" text-3xl text-[#586e73] text-center mb-10"> Did You Know ?</h1>
        <p class="text-2xl text-customText"> <span class="text-custom-orange">Random fact</span> : ${package.fact}</p>
        `;

}

async function getList(event) {
    const display = list_of_facts_form.parentElement.querySelector(".display");
    event.preventDefault();
    const loading = list_of_facts_form.querySelector(".loading");
    loading.classList.remove("hidden");

    let length = list_of_facts_form.querySelector(".maxlength").value;
    let limit = list_of_facts_form.querySelector(".limit").value;
    console.log(length);
    console.log(limit);


    const response = await fetch(`https://catfact.ninja/facts?max_length=${length}&limit=${limit}`);
    const package = await response.json();

    console.log(package);
    list_of_facts_form.classList.add("hidden");

    listModal.close();
    displaySection.scrollIntoView({ behavior: 'smooth'});

    display.classList.remove("hidden");

    // display.innerHTML = `<h1 class=" flex text-3xl text-[#586e73] text-center mb-8">Here's Your List of Cat Facts <img class="w-10 h-10" src="images/cat_calm.png" alt=""></h1>`;
    displaySection.innerHTML = `<h1 class=" flex text-3xl text-[#586e73] text-center mb-8">Here's Your List of Cat Facts <img class="w-10 h-10" src="images/cat_calm.png" alt=""></h1>`;
    

    package.data.forEach((item, i) => {
        const p = document.createElement("p");
        p.classList.add("text-xl", "text-customText", "mb-5");
        p.innerHTML = `<span class="text-custom-orange">${i + 1}.</span> ${item.fact}`;
        // display.appendChild(p);
        displaySection.appendChild(p);
    });
}



async function getBreeds(event) {
    const display = catBreeds_form.parentElement.querySelector(".display");
    event.preventDefault();
    const loading = catBreeds_form.querySelector(".loading");
    loading.classList.remove("hidden");

    let limit = catBreeds_form.querySelector(".limit").value;
    console.log(limit);

    const response = await fetch(`https://catfact.ninja/breeds?limit=${limit}`);
    const package = await response.json();

    console.log(package);
    catBreeds_form.classList.add("hidden");

    breedModal.close();
    displaySection.scrollIntoView({ behavior: 'smooth'});

    displaySection.innerHTML = `<h1 class=" flex text-3xl text-[#586e73] text-center mb-8">Here's Your List of Cat Breeds <img class="w-10 h-10" src="images/cat_calm.png" alt=""></h1>`;
    

    package.data.forEach((item, i) => {
        const div = document.createElement("div");
        div.classList.add("mb-8","flex", "flex-col", "justify-center", "items-center",);
        div.innerHTML = `
            <h1 class="text-3xl text-custom-orange mb-5 text-center  "><span class="text-rose-500">${i + 1}.</span> ${item.breed}</h1>
            <p class="text-2xl text-customText  max-w-[450px] text-center "> <span class="text-[#586e73]"> Country:</span>  "${item.country}",</p>
            <p class="text-2xl text-customText text-center"> <span class="text-[#586e73]"> Origin:</span> "${item.origin}",</p>
            <p class="text-2xl text-customText text-center"> <span class="text-[#586e73]"> Coat:</span> "${item.coat}",</p>
            <p class="text-2xl text-customText text-center"> <span class="text-[#586e73]">Pattern:</span> "${item.pattern}"</p>
        `;
        displaySection.appendChild(div);
    });
}