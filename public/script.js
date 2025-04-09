const cards = document.querySelectorAll(".card");
const forms = document.querySelectorAll("form"); // assuming forms are in same order as cards
const displaySection = document.getElementById("display");
cards.forEach((card, i) => {
    let btn = card.querySelector(".btn");
    btn.addEventListener("click", () => {
        // Hide all forms first 
        forms.forEach(form => {
            form.classList.add("hidden");
            form.classList.remove("flex");
        });

        // Show the matching form
        forms[i].classList.remove("hidden");
        forms[i].classList.add("flex");
    });
});

const randomFacts_form = document.getElementById("randomFacts");
const list_of_facts_form = document.getElementById("list_of_facts");
const catBreeds_form = document.getElementById("catBreeds");

randomFacts_form.addEventListener("submit", getRandom);

async function getRandom(event) {
    event.preventDefault();
    let length = randomFacts_form.querySelector("input").value;
    const response = await fetch(`https://catfact.ninja/fact?max_length=${length}`);
    const data = await response.json();

    console.log(data);
    displaySection.innerHTML = 
       `<h1 class=" text-3xl text-[#586e73] text-center mb-10"> Did You Know ?</h1>
        <p class="text-2xl text-customText"> <span class="text-custom-orange">Random fact</span> :${data.fact}</p>
        `;
    // const paragraph = document.createElement("p");
    // paragraph.innerHTML = ` `

}


