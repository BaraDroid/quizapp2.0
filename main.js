// Daten aus data.js hierher importieren
import { quizQuestions } from './data.js';

// Confetti-Modul importieren
import JSConfetti from 'js-confetti';
const jsConfetti = new JSConfetti();
jsConfetti.addConfetti();

//DAS WIRD NICHT AUSGEFÜHRT, ALSO ES FUNKTIONIERT GAR NICHT, auch wenn ich mein code aus script.js zufüge
console.log("hello from main");

//DevKar:
//npm installiert
//ich habe Vite, um module zu bündeln
//npm i js-confetti wirft "up to date" aus
//falls ich nur das main.js lasse, wirft das :
//Uncaught TypeError: Failed to resolve module specifier "js-confetti". 
// Relative references must start with either "/", "./", or "../".
//ich will das ohne canvas benutzen