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
        let answersEl = document.querySelectorAll('#answers > button');
        answersEl.forEach(button => {
            button.addEventListener("click", (event) => {
                let success = m.evaluate(event);
                v.displayEvaluation(success);
            })
        })      
    }

    restart() {
        document.getElementById("restart").addEventListener("click", () => {
            console.log("Presenter -> restart");
            m.restart();
            v.displayEvaluation(null);
        });
    }

}