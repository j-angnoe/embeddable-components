import EmbeddableComponents from 'embeddable-components';

EmbeddableComponents.registerTagName('super-clock', (domElement) => {
    const prefix = domElement.getAttribute('prefix') || '';

    function pad0(number) {
        return number < 0 ? numer : (number < 10 ? `0${number}` : `${number}`);
    }

    domElement.innerHTML = ``;

    function updateTime() {
        const dt = new Date;

        const hours = dt.getHours();
        const mins = dt.getMinutes();
        const secs = dt.getSeconds();

        domElement.innerHTML = `${pad0(hours)}:${pad0(mins)}:${pad0(secs)}`
    }

    updateTime();

    var interval = setInterval(updateTime, 500);

    domElement.onRemove = () => {
        clearInterval(interval);
    };
});
