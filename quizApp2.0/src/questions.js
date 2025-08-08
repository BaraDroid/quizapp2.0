import { getAverageTime } from "./main";
import { goodAnswerCounter } from "./main";
import { badAnswerCounter } from "./main";

export const quizQuestions = [
  {
    questionId: 1,
    questionName: "Was ist das Besondere an typeof null in JavaScript?",
    answers: [
      {
        answerContent: 'Es ergibt "object".',
        correct: true,
        answerId: "a",
      },
      {
        answerContent: 'Es ergibt "null".',
        correct: false,
        answerId: "b",
      },
      {
        answerContent: "Es gibt einen SyntaxError.",
        correct: false,
        answerId: "c",
      },
      {
        answerContent: 'Es ergibt "undefined".',
        correct: false,
        answerId: "d",
      },
    ],
  },
  {
    questionId: 2,
    questionName: "Wann wurde die Programmiersprache JavaScript eingeführt?",
    answers: [
      {
        answerContent: "1964",
        correct: false,
        answerId: "a",
      },
      {
        answerContent: "1982",
        correct: false,
        answerId: "b",
      },
      {
        answerContent: "1995",
        correct: true,
        answerId: "c",
      },
      {
        answerContent: "2002",
        correct: false,
        answerId: "d",
      },
    ],
  },
  {
    questionId: 3,
    questionName: "Was bedeuten die Zahlen 1 und 0 in der Informatik?",
    answers: [
      {
        answerContent: "Links/Rechts",
        correct: false,
        answerId: "a",
      },
      {
        answerContent: "An/Aus",
        correct: false,
        answerId: "b",
      },
      {
        answerContent: "Oben/Unten",
        correct: false,
        answerId: "c",
      },
      {
        answerContent: "Wahr/Falsch",
        correct: true,
        answerId: "d",
      },
    ],
  },
  {
    questionId: 4,
    questionName:
      'Welche überraschende Tatsache verbirgt sich hinter dem Ursprung des Begriffs "Computer Bug"?',
    answers: [
      {
        answerContent:
          "Es war ein tatsächliches Insekt (eine Motte), das einen Rechnerausfall verursachte.",
        correct: true,
        answerId: "a",
      },
      {
        answerContent:
          "Es wurde von einem frühen Programmierer als Witz verwendet.",
        correct: false,
        answerId: "b",
      },
      {
        answerContent:
          "Der Begriff stammt aus der Funktechnik und wurde später übernommen.",
        correct: false,
        answerId: "c",
      },
      {
        answerContent:
          "Er bezieht sich auf einen logischen Fehler in einem Schaltplan.",
        correct: false,
        answerId: "d",
      },
    ],
  },
  {
    questionId: 5,
    questionName: "Aus welchem Material war die erste Computermaus, die 1964 von Douglas Engelbart erfunden wurde?",
    answers: [
      {
        answerContent: "Kunststoff",
        correct: false,
        answerId: "a",
      },
      {
        answerContent: "Aluminium",
        correct: false,
        answerId: "b",
      },
      {
        answerContent: "Holz",
        correct: true,
        answerId: "c",
      },
      {
        answerContent: "Gummi",
        correct: false,
        answerId: "d",
      },
    ],
  },
  {
    questionId: 6,
    questionName: "Was passiert, wenn du in JavaScript [] + [] in der Konsole eingibst?",
    answers: [
      {
        answerContent: 'Es ergibt undefined, weil Arrays sich nicht addieren lassen.',
        correct: false,
        answerId: "a",
      },
      {
        answerContent: 'Ein Fehler, weil Plus zwischen Arrays keinen Sinn ergibt.',
        correct: false,
        answerId: "b",
      },
      {
        answerContent: "Ein leerer String – weil JavaScript denkt, du willst concatenieren.",
        correct: true,
        answerId: "c",
      },
      {
        answerContent: 'Du öffnest versehentlich ein schwarzes Loch im Callstack.',
        correct: false,
        answerId: "d",
      },
    ],
  },
      {
        questionId: 7,
        questionName: 'Welche Programmiersprache wurde ursprünglich "Oak" genannt, bevor sie ihren heutigen Namen erhielt?',
        answers: [
            {
                answerContent: "Python",
                correct: false,
                answerId: "a",
            },
            {
                answerContent: "Java",
                correct: true,
                answerId: "b",
            },
            {
                answerContent: "C++",
                correct: false,
                answerId: "c",
            },
            {
                answerContent: "Ruby",
                correct: false,
                answerId: "d",
            },
        ],
    },
    {
        questionId: 8,
        questionName: 'Was ist ein "Heisenbug"?',
        answers: [
            {
                answerContent: "Ein Bug, der durch die Ausführung der Software auf einem bestimmten Betriebssystem verursacht wird.",
                correct: false,
                answerId: "a",
            },
            {
                answerContent: "Ein Bug, der schwer zu reproduzieren ist, weil er sein Verhalten ändert, sobald man ihn beobachtet oder debuggt.",
                correct: true,
                answerId: "b",
            },
            {
                answerContent: "Ein Bug, der nur auftritt, wenn die Software im Ruhezustand ist.",
                correct: false,
                answerId: "c",
            },
            {
                answerContent: "Ein Bug, der durch fehlende Semikolons in JavaScript verursacht wird.",
                correct: false,
                answerId: "d",
            },
        ],
    },
    {
        questionId: 9,
        questionName: "Was ist ein Null-Pointer-Fehler?",
        answers: [
            {
                answerContent: "Ein Fehler, der durch die Division durch Null verursacht wird.",
                correct: false,
                answerId: "a",
            },
            {
                answerContent: "Ein Fehler, bei dem versucht wird, auf einen Speicherbereich zuzugreifen, der nicht zugewiesen wurde.",
                correct: true,
                answerId: "b",
            },
            {
                answerContent: "Ein Fehler, der beim Öffnen einer leeren Datei auftritt.",
                correct: false,
                answerId: "c",
            },
            {
                answerContent: "Ein Fehler, der durch die Verwendung von nicht initialisierten Variablen verursacht wird.",
                correct: false,
                answerId: "d",
            },
        ],
    },
    {
        questionId: 10,
        questionName: 'Wofür steht der Begriff "Pixel"?',
        answers: [
            {
                answerContent: "Ein mysteriöses, unsichtbares Wesen, das Bugs verursacht.",
                correct: false,
                answerId: "a",
            },
            {
                answerContent: "Picture Element",
                correct: true,
                answerId: "b",
            },
            {
                answerContent: "Picture Excel",
                correct: false,
                answerId: "c",
            },
            {
                answerContent: "Pixel ist ein Name aus dem Computerjargon, der nichts bedeutet.",
                correct: false,
                answerId: "d",
            },
        ],
    },
];

export const stats = [
  {
    title: "Durchschnittliche Antwortdauer:",
    data: getAverageTime
  },
  {
    title: "Richtige Antworten:",
    data: () => goodAnswerCounter
  },
  {
    title: "Falsche Antworten:",
    data: () => badAnswerCounter
  }
];
