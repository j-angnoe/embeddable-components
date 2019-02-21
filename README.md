# Embeddable componenten

# Theorie

Een component is `bruikbaar` als:
- Het op iedere willekeurige html pagina ge-embed kan worden.
- De HTML pagina bepaalt hoevaak een component op de pagina voor gaat komen
  (Bewijs dat een component meer dan 1 keer op de pagina voor kan komen)
- De HTML pagina heeft de mogelijkheid parameters aan te leveren aan het component.
- Het embedded component heeft geen kennis / geen afspraken met de Host HTML pagina anders dan dat er een embedding conventie is. Een voorbeeld van 
mogelijke embedding conventies:
- Het component mag ervanuit dat hij volledige beschikking heeft tot z'n
toegewezen DOM node. De Host applicatie op zo'n manier ingericht te worden
dat embedded componenten niet ingebed worden binnen andere frameworks (tenzij
 de frameworks compatible zijn, maar om de conventie in stand te houden: liever niet). De consequentie hiervan is dat als bv. Vue op een Host pagina wordt gebruikt dat Vue niet gemount wordt op bijvoorbeeld het body element, maar dat vue componenten gericht worden ingezet, zodat embedded componenten erbuiten kunnen leven. 
 Mocht het echt niet mogelijk zijn om dit te fixen is er nog wel een fallback methodiek. Later meer.


Embedding conventie via `html element`: 
```html
<html>
    <head>...
    <body>
        ...
        ...
        <het-component parameter1="waarde1" parameter2="waarde2"></het-component>
        ...
        ...
    </body>
</html>
```

Embedding conventie via `html attributes`:
```html
<html>
    <head>...
    <body>
        ...
        ...
        <div data-component="het-component" 
            data-parameter1="waarde1"
            data-parameter2="waarde2" 
        ></div>
        ...
        ...
    </body>
</html>
```

Embedding conventie via `script tag`:
```html
<html>
    <head>...
    <body>
        ...
        ...
        <script src="http://vfz.io/pad/naar/embedded-component/bundle.js">
        </script>
        ...
        ...
    </body>
</html>
```
** Nadeel: Doorgegeven van parameters wordt lastig. Ook de vraag of je het component meer dan 1 keer op de pagina kunt krijgen op deze manier? **

Beide conventies zijn worden even breed ondersteund, mits de een gepaste implementatie gekozen wordt. Voor de html attributes conventie dient met 
gebruik te makan MutationObserver [1] (die observeert dat dergelijke elementen met attributen aangemaakt/verwijderd worden). Voor de HTML element conventie kan gekozen worden tussen dezelfde MutationObserver implementatie of voor HTML CustomElements. De HTML CustomElement [2] wordt minder breed gedragen.

[1] https://caniuse.com/#search=mutation
[2] https://caniuse.com/#search=custom


## Implementatie van embeddable componenten:
Bij de implementatie van embeddable componenten dienen de volgende overwegingen in acht genomen te worden:
`Just the right size`: Embeddable componenten zijn handig, maar niet als je de componenten zo klein zijn dat je er 1000 van nodig hebt. Met embeddable componenten vul je in een keer een deel van de pagina met een werkende (mini) applicatie. Je gaat niet je hele GUI implementeren en programmeren met behulp van embeddable componenten:

Minder geschikt voor embeddable componenten:
- Button
- Text
- Link
- Paragraph

Meer geschikt voor embeddable componenten:
- Shopping cart overview
- Checkout 
- Banner
- Product Overview
- Product Detail

## De embeddable library

Dit is een verzameling embeddable componenten die waarschijnlijk
door 1 team, voor 1 doel/functie of 1 framework gebruiken. Welk framework/technogolie/strategie
gebruikt moet worden/wordt staat vrij; de conventies in dit document zorgen ervoor dat consumers/afnemers conflictvrij gebruik kunnen maken van hetgeen
de auteurs hebben gebouwd.

Binnen een library worden een x aantal embeddable componenten/mini applicaties beschikbaar gemaakt / gepubliseerd. Men maakt per component 1 html document waar het embedded component ingeladen wordt. Dit dient als demonstratie en bewijs van functioneren. De auteurs van een embedded
library mogen geen aannames doen over wat er mogelijk in de host applicatie beschikbaar is. De auteur dient ervanuit te gaan dat de host applicatie een leeg html document is met mogelijk andere geisoleerde embedded componenten. 

## Gebruik van componenten uit de library

De auteurs van de library dienen in de volgende zaken te voorzien:
- Use case: Standalone gebruik: Ieder embedded component moet standalone (met 1 `<script src`> tag) ingeladen kunnen worden. (een script, evt een stylesheet). Deze standalone bundel bevat alles wat het component nodig heeft om te draaien. De afnemer 
verwacht dat het een kwestie is van copy-paste-and-go.

-> library/component_name/dist/standalone.js

- Use case: Meerdere componenten uit de library gebruiken: Ieder embedded component mag naast de standalone versie ook component-only versie leveren. Als je meerdere componenten op 1 pagina in laad kan op deze manier voorkomen worden dat dezelfde toebehoren telkens weer opnieuw ingeladen worden. 

-> library/component_name/dist/include.js


## Embed-conventie implementatie

We hebben nu een library en wat componenten die we willen embedden. De volgende stap nadat we de sources ingeladen hebben is dat op de Host pagina het element daadwerkelijk opgestart, uitgevoerd en weergegeven wordt op de pagina. Hiervoor is een implementatie nodig.

Volgens de `html element` conventie:
- Als er op de Host pagina speciale tags aanwezig zijn dan dienen
  op deze tags framework specifieke componenten gemount te kunnen worden. Tags kunnen reeds aanwezig zijn of in de toekomst dynamisch aan de DOM toegevoegd kunnen worden.
- Als de gemounte componenten in de toekmost uit de DOM verwijderd worden dan moet de framwork specifieke `tearDown` ook uitgevoerd 
te worden.

Een voorbeeld implementatie

De basis: een mechanisme om de creatie van dom elementen te anticiperen:

```js
window.embeddedComponents = window.embeddedComponents || {};
window.embeddedComponents.anticipatedSelectors = {};

domAnticipateCreation(document);

function domAnticipateCreation(target) {
    var promises = [];
    var {anticipatedSelectors} = window.embeddedComponents;

    var mo = new MutationObserver((records) => {
        for (let rec of records) {
            for (let node of rec.addedNodes) {
                for (let selector in anticipatedSelectors) {
                    var sel = [];
                    if (node && node.querySelectorAll) {
                        sel = sel.concat(...node.querySelectorAll(selector));
                    }

                    if (node && node.matches && node.matches(selector)) {
                        sel = sel.concat(node);
                    }      
                    
                    [].forEach.call(sel, sub => {
                        promises.push(anticipatedSelectors[selector].call(null, sub));
                    })
                }
            }
        }
    });
    mo.observe(target, {attributes: false, childList: true, subtree: true});
}
```

Framework-specifieke implementatie; React:

```js
window.registerReactComponent = function registerReactComponent (tagName, ReactComponent) {
    var reactCreator = function (domElement) {        
        var reactDomTree = React.createElement(ReactComponent, null, domElement.innerHTML);

        ReactDOM.render(reactDomTree, domElement);
    };

    // Anticipate for future node creation:
    window.embeddedComponents.anticipatedSelectors[tagName] = reactCreator;

    // Act upon current elements: 
    [].map.call(document.querySelectorAll(tagName), reactCreator);
}
```

Framework-specifieke implementatie; Vue:

```js
window.registerVueComponent = function registerVueComponent(tagName, VueComponent) {
    var vueCreator = function (domElement) {
        var vueInstance = new Vue({
            el: domElement, 
            render(vueNode) {
                return vueNode(VueComponent, null, domElement.innerHTML);
            }
        })
    };

    // Anticipate for future node creation:
    window.embeddedComponents.anticipatedSelectors[tagName] = vueCreator;

    // Act upon current elements: 
    [].map.call(document.querySelectorAll(tagName), vueCreator);
};

```












