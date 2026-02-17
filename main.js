let content = null

fetch("static/text/content.json")
    .then(response => response.json())
    .then(data => {
        content = data

        document.getElementById("hide-button").addEventListener("click", hideDialog)
        document.getElementById("blue").addEventListener("click", () => updateDialog("blue"))
        document.getElementById("pink").addEventListener("click", () => updateDialog("pink"))
        document.getElementById("orange").addEventListener("click", () => updateDialog("orange"))
        document.getElementById("white").addEventListener("click", () => updateDialog("white"))
        document.getElementById("red").addEventListener("click", () => updateDialog("red"))
    })
    .catch(err => console.error("Failed to load JSON:", err));

""
function updateDialog(color) {
    const relevant = content[color]
    document.getElementById("title").textContent = relevant.title

    const contentList = document.getElementById("content")
    contentList.innerHTML = ""
    relevant.items.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        contentList.appendChild(li);
    });

    swapImage(relevant.image)

    showDialog()
}

async function swapImage(src) {
    const imgElement = document.getElementById("polaroid")
    imgElement.src = "static/images/loading.jpg";

    const preloader = new Image();
    preloader.src = src;

    await new Promise((resolve, reject) => {
        preloader.onload = resolve;
        preloader.onerror = reject;
    });

    imgElement.src = src;
}


function showDialog() {
    document.querySelectorAll(".hideable").forEach(el => {
        el.classList.remove("hidden");
    });
}

function hideDialog() {
    document.querySelectorAll(".hideable").forEach(el => {
        el.classList.add("hidden");
    });
}
