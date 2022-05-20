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
                stat = m.evaluate(event);
                v.evaluate(stat);
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