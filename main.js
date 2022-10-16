let cardsContainer = document.querySelector(".cards-container");
let all_data_url = "http://localhost:3000";

async function getData(url) {
    let response = await fetch(url);

    if (response.ok) {
        return (data = await response.json());
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");

        let name = document.createElement("div");
        name.textContent = data[i].name;
        name.classList.add("card__name");
        card.append(name);

        let phone = document.createElement("div");
        phone.textContent = data[i].phone;
        phone.classList.add("card__phone");
        card.append(phone);

        let email = document.createElement("div");
        email.textContent = data[i].email;
        email.classList.add("card__email", "underline");
        card.append(email);

        card.addEventListener("click", dysplayCardPopUp);
        cardsContainer.append(card);
    }
}

async function getAndDysplayData(url) {
    getData(url).then(displayData);
}

let searchInput = document.querySelector(".search__input");
searchInput.addEventListener("keyup", () => {
    let names = document.querySelectorAll(".card__name");
    for (let i = 0; i < names.length; i++) {
        regexp = new RegExp(searchInput.value, "i");
        if (regexp.test(names[i].textContent)) {
            names[i].parentNode.classList.remove("hidden");
        } else {
            names[i].parentNode.classList.add("hidden");
        }
    }
});

let card = document.querySelector(".popup-card");
async function dysplayCardPopUp(event) {
    let cardName = event.currentTarget.firstChild.textContent;
    await getData(`${all_data_url}?term=${cardName}`).then((user_datas) => {
        user_data = user_datas[0];

        let name = document.querySelector(".popup-card__name");
        name.textContent = user_data.name;

        let phone = document.querySelector(".popup-card__phone");
        phone.textContent = user_data.phone;

        let email = document.querySelector(".popup-card__email");
        email.textContent = user_data.email;

        let hireDate = document.querySelector(".popup-card__hire-date");
        hireDate.textContent = user_data.hire_date;

        let positionName = document.querySelector(".popup-card__position-name");
        positionName.textContent = user_data.position_name;

        let department = document.querySelector(".popup-card__departament");
        department.textContent = user_data.department;

        let info = document.querySelector(".popup-card__info");
        let count = Math.floor(Math.random() * 40);
        info.textContent = user_data.address + " " + "about ".repeat(count);

        popupBackground.classList.remove("hidden");
    });
}

let popupBackground = document.querySelector(".popup-background");
popupBackground.addEventListener("click", (event) => {
    if (popupBackground == event.target) {
        popupBackground.classList.add("hidden");
    }
});

let img = document.querySelector(".popup-card__close-img");
img.addEventListener("click", () => {
    popupBackground.classList.add("hidden");
});

getAndDysplayData(all_data_url);
