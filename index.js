// Bearbeitung darf erst starten, wenn der Browser alle Daten geleaden hat 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

  // Formel in Element boo schreiben  
  katex.render("c = \\pm\\sqrt{a^2 + b^2}", boo, {
      throwOnError: false
  });

  // alle Textknoten ab boo2 werden gerendert
  window.renderMathInElement(boo2, {delimiters: [
    					{left: "$$", right: "$$", display: true},
					  {left: "$", right: "$", display: false}
            ]} );

});