const beanUrl = "https://localhost:5001/api/beanvariety/";
const coffeeUrl = "https://localhost:5001/api/coffee/";

const beanButton = document.querySelector("#bean-run-button");
beanButton.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            beanVarieties.forEach(bean => {
                document.querySelector("#bean-result").innerHTML += `
                <strong>${bean.name}</strong><br>
                <em>Region:</em> ${bean.region}<br>
                ${bean.notes ? "<em>Notes:</em> " + bean.notes + "<br>" : ""}
                <br>
                `
            })
        })
});

document.querySelector(".bean-record-button").addEventListener("click", event => {
    event.preventDefault()
    if (event.target.id === "bean-record-button") {
        const beanName = document.querySelector("textarea[name='beanName']").value
        const region = document.querySelector("textarea[name='region']").value
        const notes = document.querySelector("textarea[name='beanNotes']").value

        const variety = {
            Name: beanName,
            Region: region,
            Notes: notes,
        }
        console.log(variety);
        createBean(variety)

        document.querySelector("textarea[name='beanName']").value = ""
        document.querySelector("textarea[name='region']").value = ""
        document.querySelector("textarea[name='beanNotes']").value = ""
    }
})

const coffeeButton = document.querySelector("#coffee-run-button");
coffeeButton.addEventListener("click", () => {
    getAllCoffee()
        .then(coffee => {
            coffee.forEach(coffee => {
                document.querySelector("#coffee-result").innerHTML += `
                <strong>${coffee.title}</strong><br>
                <em>Bean Used:</em> ${coffee.beanVariety.name}
                <br>
                <br>
                `
            })
        })
});

function getAllBeanVarieties() {
    return fetch(beanUrl).then(resp => resp.json());
}

function createBean(bean)
{
    return fetch(beanUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bean)
    }).then(res => res.json())
}

function getAllCoffee() {
    return fetch(coffeeUrl).then(resp => resp.json());
}

