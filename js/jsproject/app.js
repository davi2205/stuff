// Main application entry point

let clickCount = 0;

const button = document.getElementById('btn');
const output = document.getElementById('output');

button.addEventListener('click', () => {
    clickCount++;
    output.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
    console.log('Button clicked:', clickCount);
});

console.log('App initialized!');
