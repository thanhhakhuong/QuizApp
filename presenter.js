
const GREEN = "#C3EDBF";
const RED = "#FF6961";

class Presenter {
    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    start() {
        console.log("Presenter -> start");
        v.setHandler();
        m.getCategory();
        m.getTask();
    }

    evaluate() {
        var buttons = document.querySelectorAll('#answers > button');
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                m.evaluate(event);
                v.evaluate(event);
            })
        })      
    }

    restart() {
        document.getElementById("restart").addEventListener("click", () => {
            console.log("Presenter -> restart");
            m.restart();
            v.restart();
        });
    }

}