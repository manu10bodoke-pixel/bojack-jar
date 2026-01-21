// Lista de frases inspiradas en BoJack Horseman: tonos existencial, melancólico, irónico, reflexivo
// Almacenadas en array para fácil mantenimiento; sin repeticiones hasta agotar
const quotes = [
    "A veces, la vida es como un frasco lleno de papeles arrugados: abres uno y esperas que diga algo profundo, pero solo es otro recordatorio de lo vacío que estás.",
    "El éxito es genial, hasta que te das cuenta de que no llena el vacío dentro de ti. ¿O era eso el arrepentimiento?",
    "Todos fingimos ser felices, pero en el fondo, somos solo caballos antropomórficos lidiando con traumas pasados.",
    "La ironía de la vida: pasas años persiguiendo sueños, solo para despertar en una realidad que ni siquiera querías.",
    "Reflexiona: ¿Cuántas veces has dicho 'estoy bien' cuando en realidad solo querías que alguien te escuchara?",
    "En un mundo de hollywoodenses falsos, ser auténtico es el verdadero acto de rebeldía... o solo una excusa para fallar.",
    "El tiempo pasa, los amigos se van, y al final, quedas tú solo con tus demonios internos. Saluda al club.",
    "Ser adulto significa saber que las segundas oportunidades son raras, y las terceras, un mito."
];

// Estado: Índice para selección sin repeticiones (reinicia al agotar)
let currentIndex = -1;
const totalQuotes = quotes.length;

// Elementos DOM
const jar = document.getElementById('jar');
const paperOverlay = document.getElementById('paper-overlay');
const quoteElement = document.getElementById('quote');
const lid = document.querySelector('.lid');

// Manejo de errores: Logging simple para debugging (proactivo para mantenibilidad)
console.log('Aplicación inicializada. Frases cargadas:', totalQuotes);

// Función para seleccionar y mostrar frase aleatoria sin repetición
function showRandomQuote() {
    try {
        if (quotes.length === 0) {
            throw new Error('Lista de frases agotada');
        }
        // Selección aleatoria del índice restante
        const availableIndices = [];
        for (let i = 0; i < totalQuotes; i++) {
            if (!quotes[i].used) availableIndices.push(i); // Marcar como used temporalmente? Mejor shuffle simple
        }
        if (availableIndices.length === 0) {
            // Reiniciar lista si se agotó (edge case)
            quotes.forEach(q => q.used = false);
            currentIndex = -1;
            console.log('Lista de frases reiniciada');
        }
        // Simple pop aleatorio: shuffle y tomar primero (eficiente para listas pequeñas)
        const shuffled = [...availableIndices].sort(() => Math.random() - 0.5);
        const selectedIndex = shuffled[0];
        currentIndex = selectedIndex;
        quotes[selectedIndex].used = true; // Marcar (agregar prop used si no existe)
        if (!quotes[selectedIndex].hasOwnProperty('used')) quotes[selectedIndex].used = true;

        // Actualizar DOM
        quoteElement.textContent = quotes[selectedIndex].text || quotes[selectedIndex]; // Soporte para objetos o strings
        paperOverlay.classList.remove('hidden');
        
        // Animar tapa: Rotación de apertura
        lid.style.transform = 'translateX(-50%) rotate(180deg)';
        
        console.log('Frase mostrada:', quotes[selectedIndex]);
    } catch (error) {
        console.error('Error al mostrar frase:', error);
        quoteElement.textContent = 'Algo salió mal... Intenta de nuevo.'; // Fallback graceful
        paperOverlay.classList.remove('hidden');
    }
}

// Función para cerrar overlay y resetear animaciones (clic fuera o en papel)
function closeOverlay() {
    paperOverlay.classList.add('hidden');
    lid.style.transform = 'translateX(-50%) rotate(0deg)'; // Cerrar tapa
    // Reset used? No, mantener hasta agotar
}

// Event listeners: Soporte para click, touch y keyboard (accesibilidad)
jar.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamientos default
    showRandomQuote();
});

jar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showRandomQuote();
    }
});

// Cerrar al clic en overlay (fuera del papel)
paperOverlay.addEventListener('click', closeOverlay);

// Debounce proactivo para clics rápidos (evita spam en móviles, rendimiento)
let debounceTimer;
jar.addEventListener('touchstart', (e) => { // Soporte touch para móviles
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        showRandomQuote();
    }, 300); // 300ms debounce
});

// Inicialización: Marcar frases como no usadas si es array plano
if (quotes[0] && typeof quotes[0] === 'string') {
    quotes.forEach((q, i) => {
        quotes[i] = { text: q, used: false };
    });
}

console.log('Listeners configurados. Listo para interacción.');