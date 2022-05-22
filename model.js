let category = "allgemein";
let index = 0;
let stat = {
    "right": 0,
    "wrong": 0,
    "total": 0,
    "result": null
}
let message = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";

class Model {

    getCategory() {
        let categoriesEl = document.querySelectorAll('#categories > button');
        let answersEl = document.querySelectorAll("#answers > button");
        
        for (let i = 0; i < 3; i++) {
            categoriesEl[i].addEventListener("click", (event) => {
                category = event.target.value;
                index = 0;
                answersEl.forEach(button => button.style.visibility = 'visible');
                this.getTask();
            })
        };
    }
    
    getTask() {
        let task = myData[category][index];
        v.displayTask(task);
    }

    restart() {
        stat = {
            "right": 0,
            "wrong": 0,
            "total": 0,
            "result": null
        }
    }

    evaluate(event) {
        if (event.target.id == "0") {
            stat['right']++;
            stat['result'] = true;
            if (index + 1 < myData[category].length) {
                index++;
                this.getTask();
            } else
            {
                document.getElementById("question").innerHTML = message;
                let answersEl = document.querySelectorAll('#answers > button');
                for (let i = 0; i < 4; i++) {
                    answersEl[i].style.visibility = 'hidden';
                }
            }
        }
        else {
            stat['wrong']++;
            stat['result'] = false;
        }
        stat['total']++;
        return stat;
    }

}