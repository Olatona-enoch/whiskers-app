const cards = document.querySelectorAll(".card");
const formfields = document.querySelectorAll(".inputForm"); // assuming formfields are in same order as cards
const displaySection = document.getElementById("display");
const listModal = document.getElementById("my_modal_2");
const breedModal = document.getElementById("my_modal_3");

cards.forEach((card, i) => {
    let btn = card.querySelector(".btn");
    btn.addEventListener("click", () => {

        // Show the matching form
        const modalBox = formfields[i].parentElement;
        const display = modalBox.querySelector(".display");
        const loading = modalBox.querySelector(".loading");
        display.classList.add("hidden");
        loading.classList.add("hidden");

        formfields[i].classList.remove("hidden");
        formfields[i].classList.add("flex");
    });
});
// formfields.forEach(form => {
//     form.addEventListener("input", (event) =>{
//         const inputs = form.querySelectorAll("input");
//         const errorMessage = form.querySelector(".errorMessage");
//         inputs.forEach( element => {
//             if (element.value == "") {
//                 errorMessage.classList.remove("hidden");
//                 return;
//             }else{
//                 errorMessage.classList.add("hidden");
//             }   
//         });
//     })
// });

const randomFacts_form = document.getElementById("randomFacts");
const list_of_facts_form = document.getElementById("list_of_facts");
const catBreeds_form = document.getElementById("catBreeds");

randomFacts_form.addEventListener("submit", getRandom);
list_of_facts_form.addEventListener("submit", getList);
catBreeds_form.addEventListener("submit", getBreeds);


async function getRandom(event) {
    const display = randomFacts_form.parentElement.querySelector(".display");
    const loading = randomFacts_form.querySelector(".loading");
    let length = randomFacts_form.querySelector("input").value;
    const errorMessage = randomFacts_form.querySelector(".errorMessage");
    // if (length == "") {
    //     display.innerHTML = "error error";
    //     errorMessage.classList.remove("hidden");
    //     return;
    // }else{
    //     errorMessage.classList.add("hidden");
    // }    
    try {

        event.preventDefault();
        loading.classList.remove("hidden");
    
        const response = await fetch(`https://catfact.ninja/fact?max_length=${length}`);
        if (response.status!== 200) {
            throw new Error("Cannot fetch the Results at this time"); 
        }

        const package = await response.json();
        console.log(package);

        randomFacts_form.classList.add("hidden");
        display.classList.remove("hidden");
    
        display.innerHTML = 
            `<h1 class=" text-3xl text-[#586e73] text-center mb-10"> Did You Know ?</h1>
            <p class="text-2xl text-customText"> <span class="text-custom-orange">Random fact</span> : ${package.fact}</p>
            `;
        //to reset form input    
        randomFacts_form.reset();    
        
    } catch (error) {
        randomFacts_form.classList.add("hidden");
        display.classList.remove("hidden");
        display.innerHTML = `
        <p class="failedMessage hidden text-red-500 text-xl text-center mt-6">${error.message}</p>
        `;
    }
}

async function getList(event) {
    displaySection.innerHTML = "";
    const display = list_of_facts_form.parentElement.querySelector(".display");

    try {
        event.preventDefault();
        const loading = list_of_facts_form.querySelector(".loading");
        loading.classList.remove("hidden");
    
        let length = list_of_facts_form.querySelector(".maxlength").value;
        let limit = list_of_facts_form.querySelector(".limit").value;
        console.log(length);
        console.log(limit);
    
    
        const response = await fetch(`https://catfact.ninja/facts?max_length=${length}&limit=${limit}`);
        if (response.status!== 200) {
            throw new Error("Cannot fetch the Results at this time"); 
        }

        const package = await response.json();

        console.log(package);
        list_of_facts_form.classList.add("hidden");
    
        listModal.close();
        displaySection.scrollIntoView({ behavior: 'smooth'});
    
        display.classList.remove("hidden");
    
        // display.innerHTML = `<h1 class=" flex text-3xl text-[#586e73] text-center mb-8">Here's Your List of Cat Facts <img class="w-10 h-10" src="images/cat_calm.png" alt=""></h1>`;
        displaySection.innerHTML = `<h1 class=" flex text-3xl text-[#586e73]  mb-8">Here's Your List of Cat Facts <img class="w-10 h-10" src="images/cat_calm.png" alt=""></h1>`;
        
    
        package.data.forEach((item, i) => {
            const p = document.createElement("p");
            p.classList.add("text-xl", "text-customText", "mb-5");
            p.innerHTML = `<span class="text-custom-orange">${i + 1}.</span> ${item.fact}`;
            // display.appendChild(p);
            displaySection.appendChild(p);
        });
        //to reset form input
        list_of_facts_form.reset();
    
    } catch (error) {
        list_of_facts_form.classList.add("hidden");
        display.classList.remove("hidden");
        display.innerHTML = `
        <p class="failedMessage hidden text-red-500 text-xl text-center mt-6">${error.message}</p>
        `;
    }

}



async function getBreeds(event) {
    const display = catBreeds_form.parentElement.querySelector(".display");
    const loading = catBreeds_form.querySelector(".loading");

    try {
        event.preventDefault();
        loading.classList.remove("hidden");
    
        let limit = catBreeds_form.querySelector(".limit").value;
        console.log(limit);
    
        const response = await fetch(`https://catfact.ninja/breeds?limit=${limit}`);
        if (response.status!== 200) {
            throw new Error("Cannot fetch the Results at this time"); 
        }

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
        
    } catch (error) {
        console.log("errorrrrr");
        loading.classList.add("hidden");
        catBreeds_form.classList.add("hidden");
        display.classList.remove("hidden");
        display.innerHTML = `
        <p class="failedMessage text-red-500 text-xl text-center mt-6">${error.message}</p>
        `;
    }
    // to reset form input
    catBreeds_form.reset(); 
}

