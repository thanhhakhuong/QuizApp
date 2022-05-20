let category = "allgemein";
let right = wrong = total = 0;
let currentIndex = 0;

class Model {

    getCategory() {

        let currentTask = myData[category][currentIndex];
        let questionElement = document.getElementById("question");
        let answersElement = document.querySelectorAll("#answers > button");

        var buttons = document.querySelectorAll('#categories > button');
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                category = button.value;
                console.log("Model -> getTask: " + category);
                currentIndex = 0;
                currentTask = myData[category][currentIndex];
                if (category == "mathe") {
                    console.log("MATHE");
                    katex.render(currentTask["a"], questionElement, {
                        throwOnError: false
                    });
                    for (let i = 0; i < 4; i++) {
                        katex.render(currentTask["l"][i], answersElement[i], {
                        throwOnError: false
                        });
                        answersElement[i].style.visibility = 'visible';
                    }
                } else {
                    questionElement.innerHTML = currentTask["a"];
                    answersElement = document.querySelectorAll("#answers > button");
                    for (let i = 0; i < 4; i++) {
                        answersElement[i].innerHTML = currentTask["l"][i];
                        answersElement[i].style.visibility = 'visible';
                    }
                }
            })
        })  
    }
    
    getTask() {
        console.log("Model -> getTask");

        let currentTask = myData[category][currentIndex];
        let questionElement = document.getElementById("question");
        let answersElement = document.querySelectorAll("#answers > button");

        questionElement.innerHTML = currentTask["a"];

        if (category == "mathe") {
            katex.render(currentTask["a"], questionElement, {
                throwOnError: false
            });
            for (let i = 0; i < 4; i++) {
                katex.render(currentTask["l"][i], answersElement[i], {
                throwOnError: false
                });
                answersElement[i].style.visibility = 'visible';
            }
        } else {
            questionElement.innerHTML = currentTask["a"];
            answersElement = document.querySelectorAll("#answers > button");
            for (let i = 0; i < 4; i++) {
                answersElement[i].innerHTML = currentTask["l"][i];
                answersElement[i].style.visibility = 'visible';
            }
        }

    }

    restart() {
        console.log("Model -> restart");
        let button = document.getElementById("restart");
        button.addEventListener("click", () => {
            right = 0;
            wrong = 0;
            total = 0;
        })
    }

    evaluate(event) {
        let progressBarElem = document.getElementById("progress-bar");
        let rightItem = "<div class=\"item right\"/></div>";
        let wrongItem = "<div class=\"item wrong\"/></div>";
        if (event.target.id == "0") {
            right++;
            progressBarElem.innerHTML += rightItem;
            // load new task - merge this into getTask
            console.log("Category length: " + myData[category].length);
            if (currentIndex + 1 < myData[category].length) {
                currentIndex++;
                console.log("Get new task " + currentIndex);
                this.getTask();
            } else {
                document.getElementById("question").innerHTML = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
                // document.getElementById("answer").style.visibility = 'hidden';
                let buttons = document.querySelectorAll('#answers > button');
                for (let i = 0; i < 4; i++) {
                        buttons[i].style.visibility = 'hidden';
                    }
            }
        }
        else {
            wrong++;
            progressBarElem.innerHTML += wrongItem;
        }
        total = total + 1;
        // console.log("Model -> evaluate " + right + "-" + wrong + "-" + total);
    }

}