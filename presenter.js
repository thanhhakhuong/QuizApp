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
                success = m.evaluate(event);
                if(success != undefined) v.displayEvaluation(success);
            })
        })      
    }

    restart() {
        document.getElementById("restart").addEventListener("click", () => {
            m.restart();
            v.displayEvaluation(null);
        });
    }

}