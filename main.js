// Daten aus data.js hierher importieren
import { quizQuestions } from './data.js';

// Confetti-Modul importieren
import JSConfetti from 'js-confetti';
const jsConfetti = new JSConfetti();
jsConfetti.addConfetti();

console.log("hello from main");

//DevKar:
//npm installiert
//ich habe Vite, um module zu bündeln
//npm i js-confetti wirft "up to date" aus