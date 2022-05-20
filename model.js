let category = "allgemein";
let index = 0;
let stat = {
    "right": 0,
    "wrong": 0,
    "total": 0
}


class Model {

    getCategory() {
        let categoriesEl = document.querySelectorAll('#categories > button');
        let answersEl = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 3; i++) {
            categoriesEl[i].addEventListener("click", (event) => {
                category = event.target.value;
                index = 0;
                this.getTask();
                answersEl.forEach(button => button.style.visibility = 'visible');
            })
        };
    }
    
    getTask() {
        let task = myData[category][index];
        let questionEl = document.getElementById("question");
        let answersEl = document.querySelectorAll("#answers > button");

        if (category == "mathe") {
            katex.render(task["a"], questionEl, {
                throwOnError: false
            });
            for (let i = 0; i < 4; i++) {
                katex.render(task["l"][i], answersEl[i], {
                throwOnError: false
                });
            }
        } else {
            questionEl.innerHTML = task["a"];
            answersEl = document.querySelectorAll("#answers > button");
            for (let i = 0; i < 4; i++) {
                answersEl[i].innerHTML = task["l"][i];
            }
        }

    }

    restart() {
        stat = {
            "right": 0,
            "wrong": 0,
            "total": 0
        }
    }

    evaluate(event) {
        let progressBarEl = document.getElementById("progress-bar");
        let rightItem = "<div class=\"item right\"/></div>";
        let wrongItem = "<div class=\"item wrong\"/></div>";

        if (event.target.id == "0") {
            stat['right']++;
            progressBarEl.innerHTML += rightItem;
        
            if (index + 1 < myData[category].length) {
                index++;
                this.getTask();
            } else
            {
                document.getElementById("question").innerHTML = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
                let buttons = document.querySelectorAll('#answers > button');
                for (let i = 0; i < 4; i++) {
                        buttons[i].style.visibility = 'hidden';
                    }
            }
        }
        else {
            stat['wrong']++;
            progressBarEl.innerHTML += wrongItem;
        }
        stat['total']++;
        return stat;
    }

}