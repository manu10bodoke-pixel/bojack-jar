const quotes = [
    { text: "Yo no me conozco. Y me da miedo que, si alguna vez lo hago, no haya nada dentro.", author: "BoJack Horseman", used: false },
    { text: "¿Sabes cuál es el problema con los finales felices? Que o no son finales, o no son felices.", author: "BoJack Horseman", used: false },
    { text: "No puedo decirte que todo va a mejorar, porque no lo sé. Pero sí sé que no estás solo.", author: "BoJack Horseman", used: false },
    { text: "Necesito que me digas que soy una buena persona.", author: "BoJack Horseman", used: false },
    { text: "A veces siento que nací con una fuga, y cualquier bondad que empiezo a sentir simplemente se escapa.", author: "BoJack Horseman", used: false },
    { text: "A veces la vida es una mierda y luego sigues viviendo.", author: "BoJack Horseman", used: false },
    { text: "No hay un final feliz. Solo hay la vida, y luego ya no la hay.", author: "BoJack Horseman", used: false },
    { text: "Eres todas las cosas que están mal contigo.", author: "BoJack Horseman", used: false },
    { text: "Siento que mi vida es solo una serie de eventos aleatorios que no significan nada.", author: "BoJack Horseman", used: false },
    { text: "La vida es una serie de puertas que se cierran, ¿no crees?", author: "Diane Nguyen", used: false },
    { text: "No existe el buen fondo. Solo existen las cosas que haces.", author: "Diane Nguyen", used: false },
    { text: "Creo que hay personas que te ayudan a convertirte en quien eres y puedes estar agradecida por ello, aunque no estuvieran destinadas a estar en tu vida para siempre.", author: "Diane Nguyen", used: false },
    { text: "Quería que mi daño fuera ‘daño bueno’. Que tuviera un propósito.", author: "Diane Nguyen", used: false },
    { text: "Tienes que ser tú misma. Bueno, no tú misma, sino la versión de ti misma que el mundo quiere que seas.", author: "Princess Carolyn", used: false },
    { text: "¿Sabes qué hago cuando tengo un día realmente malo? Me imagino a mi tataranieta hablando de mí en clase.", author: "Princess Carolyn", used: false },
    { text: "No puedes seguir haciendo cosas malas y luego sentirte mal por ello como si eso ayudara. ¡Tienes que ser mejor!", author: "Todd Chavez", used: false }
];

const jar = document.getElementById('jar');
const paperOverlay = document.getElementById('paper-overlay');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const lid = document.querySelector('.lid');
const welcomeAudio = document.getElementById('welcome-audio');
const initialMessage = document.getElementById('initial-message');
let audioPlayed = false;

function playWelcomeAudio() {
    if (!audioPlayed) {
        welcomeAudio.play().then(() => {
            audioPlayed = true;
        }).catch(error => {
            console.error('Error al reproducir audio:', error);
        });
    }
}

window.addEventListener('load', () => {
    playWelcomeAudio();
    setTimeout(() => {
        initialMessage.style.display = 'none';
    }, 5000);
});

function getRandomQuote() {
    const availableQuotes = quotes.filter(q => !q.used);
    if (availableQuotes.length === 0) {
        quotes.forEach(q => q.used = false);
        return getRandomQuote();
    }
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selected = availableQuotes[randomIndex];
    quotes.find(q => q.text === selected.text).used = true;
    return selected;
}

function showQuote() {
    if (!audioPlayed) {
        playWelcomeAudio();
    }
    try {
        const { text, author } = getRandomQuote();
        quoteElement.textContent = text;
        authorElement.textContent = `— ${author}`;
        paperOverlay.classList.remove('hidden');
        lid.style.transform = 'translateX(-50%) rotate(180deg)';
    } catch (error) {
        console.error('Error al mostrar frase:', error);
        quoteElement.textContent = 'Algo salió mal...';
        authorElement.textContent = '';
        paperOverlay.classList.remove('hidden');
    }
}

function closeOverlay() {
    paperOverlay.classList.add('hidden');
    lid.style.transform = 'translateX(-50%) rotate(0deg)';
}

jar.addEventListener('click', showQuote);
jar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showQuote();
    }
});
paperOverlay.addEventListener('click', closeOverlay);

let debounceTimer;
jar.addEventListener('touchstart', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        showQuote();
    }, 300);
});
