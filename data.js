let quizQuestions = [
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
        answerContent: "Ein leerer String – weil JavaScript denkt, du willst concatenaten.",
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
];