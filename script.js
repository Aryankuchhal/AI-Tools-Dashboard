let selectedTool = "";

/* selected  tool */

function selectedTool(toolname){
    selectedTool = toolname;
    document.getElementById("selectedTool").innerText = "selected Tool:" + toolname;
    document.getElementById("generator").scrollIntoView({behavior:"smmoth"});

}

/* Generator  response */

/* Generate Response */

function generateResponse() {

    const prompt =
        document.getElementById("promptInput").value;

    const response =
        document.getElementById("response");

    if (prompt.trim() === "") {

        response.innerText =
            "Please enter a prompt first.";

        return;
    }

    if (selectedTool === "") {

        response.innerText =
            "Please select an AI tool first.";

        return;
    }


    response.innerText =
        "Generating response...";


    setTimeout(() => {

        const result =
            `AI response for ${selectedTool}:

Prompt: ${prompt}

This is a demo AI response. 
You can connect this dashboard with a real AI API to generate real responses.`;

        response.innerText = result;

        saveHistory(prompt, result);

    }, 1000);
}


/* Save History */

function saveHistory(prompt, result) {

    let history =
        JSON.parse(
            localStorage.getItem("aiHistory")
        ) || [];

    history.push({

        tool: selectedTool,

        prompt: prompt,

        response: result

    });

    localStorage.setItem(
        "aiHistory",
        JSON.stringify(history)
    );

    displayHistory();
}


/* Display History */

function displayHistory() {

    const container =
        document.getElementById("historyContainer");

    const history =
        JSON.parse(
            localStorage.getItem("aiHistory")
        ) || [];


    container.innerHTML = "";


    history.forEach((item) => {

        const div =
            document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `

            <strong>${item.tool}</strong>

            <p>
                <b>Prompt:</b>
                ${item.prompt}
            </p>

            <p>
                ${item.response}
            </p>

        `;

        container.appendChild(div);

    });
}


/* Clear History */

function clearHistory() {

    localStorage.removeItem("aiHistory");

    displayHistory();
}


/* Copy Response */

function copyResponse() {

    const response =
        document.getElementById("response")
            .innerText;

    navigator.clipboard.writeText(response);

    alert("Response copied!");
}


/* Search + Filter */

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");


function filterTools() {

    const search =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;


    const cards =
        document.querySelectorAll(".tool-card");


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const cardCategory =
            card.dataset.category;


        const searchMatch =
            name.includes(search);

        const categoryMatch =
            category === "all" ||
            cardCategory === category;


        if (searchMatch && categoryMatch) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


searchInput.addEventListener(
    "input",
    filterTools
);

categoryFilter.addEventListener(
    "change",
    filterTools
);


/* Dark Mode */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        if (
            document.body.classList.contains("dark")
        ) {

            themeBtn.innerText = "☀️";

        } else {

            themeBtn.innerText = "🌙";

        }

    }
);


/* Load History */

displayHistory();

