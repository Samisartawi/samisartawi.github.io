function displayCatFacts() {
    const data = {
        facts: [
            { text: "Owning a cat can reduce the risk of stroke and heart attack by a third.", factId: 1 },
            { text: "Domestic cats spend about 70 percent of the day sleeping and 15 percent of the day grooming.", factId: 2 },
            { text: "Cats are the most popular pet in the United States: There are 88 million pet cats and 74 million dogs.", factId: 3 },
            { text: "Most cats are lactose intolerant, and milk can cause painful stomach cramps and diarrhea. It's best to forego the milk and just give your cat the standard: clean, cool drinking water.", factId: 4 },
            { text: "The frequency of a domestic cat's purr is the same at which muscles and bones repair themselves.", factId: 5 }
        ],
        catPhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
    };

    data.facts.sort((a, b) => a.factId - b.factId);
    
    const tableBody = document.getElementById("fact-table-body");
    tableBody.innerHTML = ""; 
    data.facts.forEach(fact => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = fact.factId;
        row.appendChild(idCell);

        const factCell = document.createElement("td");
        factCell.textContent = fact.text;
        row.appendChild(factCell);

        tableBody.appendChild(row);
    });

    document.getElementById("cat.png").src = data.catPhoto;
}

displayCatFacts();
