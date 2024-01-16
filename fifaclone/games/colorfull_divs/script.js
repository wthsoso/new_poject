var button = document.getElementById("button");
button.addEventListener("click", myfunction);

var button2 = document.getElementById("button2");
button2.addEventListener("click", refresh);

var inputHeight = document.getElementById("height");
inputHeight.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        myfunction();
    }
});

var inputWidth = document.getElementById("width");
inputWidth.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        myfunction();
    }
});

function myfunction() {
    var parentDiv = document.createElement("div");
    var parentWidth = parseInt(document.getElementById("width").value);
    var parentHeight = parseInt(document.getElementById("height").value);
    var colors = ["red", "green", "black", "brown", "orange"];

    parentDiv.style.width = parentWidth + "px";
    parentDiv.style.height = parentHeight + "px";
    parentDiv.style.border = "1px solid black";
    parentDiv.style.display = "flex";
    parentDiv.style.flexWrap = "wrap";

    var childSize = 100;
    var numChildDivs = Math.floor(parentWidth / childSize) * Math.floor(parentHeight / childSize);
    var delay = 2000;

    if (parentHeight < 100 || parentWidth < 100) {
        var errorDiv = document.createElement("div");
        errorDiv.textContent = "Invalid input";
        document.body.appendChild(errorDiv);
        return;
    }

    for (var i = 0; i < numChildDivs; i++) {
        (function (index) {
            setTimeout(function () {
                var childDiv = document.createElement("div");
                childDiv.style.width = childSize + "px";
                childDiv.style.height = childSize + "px";
                childDiv.style.background = colors[Math.floor(Math.random() * colors.length)];
                childDiv.style.transition = "transform 0.5s ease-in-out " + (index * 0.1) + "s";
                childDiv.style.transform = "translateY(-100%)";
                parentDiv.appendChild(childDiv);

                setTimeout(function () {
                    childDiv.style.transform = "translateY(0)";
                }, 10);
            }, index * delay);
        })(i);
    }

    document.body.appendChild(parentDiv);
}

function refresh(event) {
    window.location.reload(true);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "r") {
        window.location.reload(true);
    }
});











