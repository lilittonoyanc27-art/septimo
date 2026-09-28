import { LanguageFunctionItem, MemoryTableRow, QuestionAnswer, ShortText } from './types';

export const FULL_TEXT_PARAGRAPHS = [
  {
    id: 'intro-1',
    es: 'Las funciones del lenguaje son las diferentes formas en las que utilizamos la lengua según nuestra intención al comunicarnos.',
    hy: 'Լեզվի գործառույթները այն տարբեր ձևերն են, որոնցով մենք օգտագործում ենք լեզուն՝ կախված հաղորդակցվելու մեր նպատակից։',
  },
  {
    id: 'intro-2',
    es: 'Cuando hablamos o escribimos, podemos tener distintos objetivos: informar, expresar sentimientos, pedir algo, llamar la atención, explicar el significado de una palabra o crear un mensaje artístico.',
    hy: 'Երբ խոսում կամ գրում ենք, կարող ենք ունենալ տարբեր նպատակներ՝ տեղեկություն հաղորդել, զգացմունք արտահայտել, որևէ բան խնդրել, ուշադրություն գրավել, բառի նշանակությունը բացատրել կամ գեղեցիկ ու գեղարվեստական հաղորդագրություն ստեղծել։',
  },
  {
    id: 'intro-3',
    es: 'Por eso existen diferentes funciones del lenguaje.',
    hy: 'Այդ պատճառով գոյություն ունեն լեզվի տարբեր գործառույթներ։',
  },
  {
    id: 'fn-referencial',
    es: 'La función referencial o representativa se utiliza para transmitir información objetiva sobre la realidad. Por ejemplo: “Hoy hace frío”.',
    hy: 'Տեղեկատվական կամ ներկայացուցչական գործառույթը օգտագործվում է իրականության մասին օբյեկտիվ տեղեկություն հաղորդելու համար։ Օրինակ՝ «Այսօր ցուրտ է»։',
    fnKey: 'referencial',
  },
  {
    id: 'fn-expresiva',
    es: 'La función expresiva o emotiva se utiliza para expresar sentimientos, emociones u opiniones del hablante. Por ejemplo: “¡Estoy muy contento!”.',
    hy: 'Զգացմունքային կամ արտահայտչական գործառույթը օգտագործվում է խոսողի զգացմունքները, հույզերը կամ կարծիքը արտահայտելու համար։ Օրինակ՝ «Ես շատ ուրախ եմ»։',
    fnKey: 'expresiva',
  },
  {
    id: 'fn-apelativa',
    es: 'La función apelativa o conativa se utiliza para influir en el receptor, pedirle algo, darle una orden o hacerle una pregunta. Por ejemplo: “Cierra la puerta, por favor”.',
    hy: 'Դիմողական կամ ազդող գործառույթը օգտագործվում է դիմացինի վրա ազդելու, որևէ բան խնդրելու, հրահանգ տալու կամ հարց տալու համար։ Օրինակ՝ «Փակի՛ր դուռը, խնդրում եմ»։',
    fnKey: 'apelativa',
  },
  {
    id: 'fn-fatica',
    es: 'La función fática se utiliza para iniciar, mantener o comprobar la comunicación. Por ejemplo: “¿Me escuchas?” o “Hola”.',
    hy: 'Ֆատիկ գործառույթը օգտագործվում է հաղորդակցությունը սկսելու, շարունակելու կամ ստուգելու համար։ Օրինակ՝ «Լսո՞ւմ ես ինձ» կամ «Բարև»։',
    fnKey: 'fatica',
  },
  {
    id: 'fn-metalinguistica',
    es: 'La función metalingüística se utiliza cuando hablamos sobre la propia lengua. Por ejemplo: “Casa es un sustantivo”.',
    hy: 'Մետալեզվական գործառույթը օգտագործվում է, երբ խոսում ենք հենց լեզվի մասին։ Օրինակ՝ «Casa բառը գոյական է»։',
    fnKey: 'metalinguistica',
  },
  {
    id: 'fn-poetica',
    es: 'La función poética se utiliza cuando lo más importante es la forma del mensaje. Aparece especialmente en poemas, canciones, publicidad y textos literarios.',
    hy: 'Բանաստեղծական գործառույթը օգտագործվում է, երբ կարևոր է հաղորդագրության ձևը և գեղեցկությունը։ Այն հաճախ հանդիպում է բանաստեղծություններում, երգերում, գովազդում և գրական տեքստերում։',
    fnKey: 'poetica',
  },
  {
    id: 'conclusion',
    es: 'En resumen, las funciones del lenguaje dependen de la intención que tenemos cuando comunicamos un mensaje.',
    hy: 'Ամփոփելով՝ լեզվի գործառույթը կախված է նրանից, թե ինչ նպատակ ունենք հաղորդագրություն փոխանցելիս։',
  },
];

export const MAIN_FUNCTIONS: LanguageFunctionItem[] = [
  {
    id: 1,
    slug: 'referencial',
    esName: '1. Función referencial o representativa',
    hyName: '1. Տեղեկատվական գործառույթ',
    esPurpose: 'Sirve para informar sobre hechos o situaciones.',
    hyPurpose: 'Օգտագործվում է փաստերի կամ իրավիճակների մասին տեղեկություն հաղորդելու համար։',
    examples: [
      {
        es: 'Madrid es la capital de España.',
        hy: 'Մադրիդը Իսպանիայի մայրաքաղաքն է։',
      },
    ],
    toRemember: {
      es: 'Referencial = información',
      hy: 'Տեղեկատվական = տեղեկություն',
    },
  },
  {
    id: 2,
    slug: 'expresiva',
    esName: '2. Función expresiva o emotiva',
    hyName: '2. Զգացմունքային գործառույթ',
    esPurpose: 'Sirve para expresar sentimientos, emociones y opiniones.',
    hyPurpose: 'Օգտագործվում է զգացմունքներ, հույզեր և կարծիքներ արտահայտելու համար։',
    examples: [
      {
        es: '¡Qué feliz estoy!',
        hy: 'Ես ինչքա՜ն ուրախ եմ։',
      },
    ],
    toRemember: {
      es: 'Expresiva = sentimientos',
      hy: 'Արտահայտչական = զգացմունքներ',
    },
  },
  {
    id: 3,
    slug: 'apelativa',
    esName: '3. Función apelativa o conativa',
    hyName: '3. Դիմողական գործառույթ',
    esPurpose: 'Sirve para conseguir una reacción del receptor.',
    hyPurpose: 'Օգտագործվում է դիմացինից որևէ արձագանք ստանալու համար։',
    types: [
      { es: 'una orden', hy: 'հրաման' },
      { es: 'una petición', hy: 'խնդրանք' },
      { es: 'una pregunta', hy: 'հարց' },
    ],
    examples: [
      {
        es: 'Abre el libro.',
        hy: 'Բացի՛ր գիրքը։',
      },
    ],
  },
  {
    id: 4,
    slug: 'fatica',
    esName: '4. Función fática',
    hyName: '4. Ֆատիկ գործառույթ',
    esPurpose: 'Sirve para comprobar si la comunicación funciona.',
    hyPurpose: 'Օգտագործվում է ստուգելու համար, թե արդյոք հաղորդակցությունը գործում է։',
    examples: [
      {
        es: '¿Me oyes?',
        hy: 'Լսո՞ւմ ես ինձ։',
      },
      {
        es: 'Hola, ¿qué tal?',
        hy: 'Բարև, ինչպե՞ս ես։',
      },
    ],
  },
  {
    id: 5,
    slug: 'metalinguistica',
    esName: '5. Función metalingüística',
    hyName: '5. Մետալեզվական գործառույթ',
    esPurpose: 'Se utiliza para hablar de la lengua y explicar palabras o reglas.',
    hyPurpose: 'Օգտագործվում է լեզվի, բառերի և քերականական կանոնների մասին խոսելու համար։',
    examples: [
      {
        es: '“Rápido” es un adjetivo.',
        hy: '«Rápido» բառը ածական է։',
      },
    ],
  },
  {
    id: 6,
    slug: 'poetica',
    esName: '6. Función poética',
    hyName: '6. Բանաստեղծական գործառույթ',
    esPurpose: 'Se centra en la forma y belleza del mensaje. Aparece mucho en poemas, canciones y publicidad.',
    hyPurpose: 'Կենտրոնանում է հաղորդագրության ձևի և գեղեցկության վրա։ Հաճախ հանդիպում է բանաստեղծություններում, երգերում և գովազդում։',
    examples: [
      {
        es: 'Tus ojos brillan como estrellas.',
        hy: 'Քո աչքերը փայլում են աստղերի պես։',
      },
    ],
  },
];

export const MEMORY_TABLE: MemoryTableRow[] = [
  {
    id: 1,
    función: 'Referencial',
    paraQueSirve: 'Informar',
    hyText: 'Տեղեկություն հաղորդել',
  },
  {
    id: 2,
    función: 'Expresiva',
    paraQueSirve: 'Expresar sentimientos',
    hyText: 'Զգացմունք արտահայտել',
  },
  {
    id: 3,
    función: 'Apelativa',
    paraQueSirve: 'Pedir, ordenar, preguntar',
    hyText: 'Խնդրել, հրամայել, հարցնել',
  },
  {
    id: 4,
    función: 'Fática',
    paraQueSirve: 'Comprobar la comunicación',
    hyText: 'Ստուգել հաղորդակցությունը',
  },
  {
    id: 5,
    función: 'Metalingüística',
    paraQueSirve: 'Hablar de la lengua',
    hyText: 'Խոսել լեզվի մասին',
  },
  {
    id: 6,
    función: 'Poética',
    paraQueSirve: 'Crear belleza en el mensaje',
    hyText: 'Գեղեցիկ ձևով արտահայտվել',
  },
];

export const QUESTIONS_AND_ANSWERS: QuestionAnswer[] = [
  {
    id: 1,
    esQuestion: '¿Qué son las funciones del lenguaje?',
    hyQuestion: 'Ի՞նչ են լեզվի գործառույթները։',
    esAnswer: 'Son las diferentes formas de utilizar la lengua según nuestra intención comunicativa.',
    hyAnswer: 'Դրանք լեզվի օգտագործման տարբեր ձևերն են՝ կախված մեր հաղորդակցական նպատակից։',
  },
  {
    id: 2,
    esQuestion: '¿Cuántas funciones principales del lenguaje hay?',
    hyQuestion: 'Քանի՞ հիմնական լեզվական գործառույթ կա։',
    esAnswer: 'Seis.',
    hyAnswer: 'Վեց։',
  },
  {
    id: 3,
    esQuestion: '¿Cuáles son?',
    hyQuestion: 'Որո՞նք են դրանք։',
    esAnswer: 'Referencial, expresiva, apelativa, fática, metalingüística y poética.',
    hyAnswer: 'Տեղեկատվական, զգացմունքային, դիմողական, ֆատիկ, մետալեզվական և բանաստեղծական։',
  },
  {
    id: 4,
    esQuestion: '¿Para qué sirve la función referencial?',
    hyQuestion: 'Ինչի՞ համար է տեղեկատվական գործառույթը։',
    esAnswer: 'Para transmitir información objetiva.',
    hyAnswer: 'Օբյեկտիվ տեղեկություն հաղորդելու համար։',
  },
  {
    id: 5,
    esQuestion: '¿Qué función aparece en “Hoy hace calor”?',
    hyQuestion: 'Ո՞ր գործառույթն է «Այսօր շոգ է» նախադասության մեջ։',
    esAnswer: 'La función referencial.',
    hyAnswer: 'Տեղեկատվական գործառույթը։',
  },
  {
    id: 6,
    esQuestion: '¿Para qué sirve la función expresiva?',
    hyQuestion: 'Ինչի՞ համար է արտահայտչական գործառույթը։',
    esAnswer: 'Para expresar sentimientos o emociones.',
    hyAnswer: 'Զգացմունքներ կամ հույզեր արտահայտելու համար։',
  },
  {
    id: 7,
    esQuestion: '¿Qué función aparece en “¡Estoy muy cansado!”?',
    hyQuestion: 'Ո՞ր գործառույթն է «Ես շատ հոգնած եմ» նախադասության մեջ։',
    esAnswer: 'La función expresiva.',
    hyAnswer: 'Զգացմունքային գործառույթը։',
  },
  {
    id: 8,
    esQuestion: '¿Para qué sirve la función apelativa?',
    hyQuestion: 'Ինչի՞ համար է դիմողական գործառույթը։',
    esAnswer: 'Para provocar una reacción en el receptor.',
    hyAnswer: 'Դիմացինից արձագանք ստանալու համար։',
  },
  {
    id: 9,
    esQuestion: '¿Qué función aparece en “Ven aquí”?',
    hyQuestion: 'Ո՞ր գործառույթն է «Արի այստեղ» նախադասության մեջ։',
    esAnswer: 'La función apelativa.',
    hyAnswer: 'Դիմողական գործառույթը։',
  },
  {
    id: 10,
    esQuestion: '¿Para qué sirve la función fática?',
    hyQuestion: 'Ինչի՞ համար է ֆատիկ գործառույթը։',
    esAnswer: 'Para iniciar, mantener o comprobar la comunicación.',
    hyAnswer: 'Հաղորդակցությունը սկսելու, շարունակելու կամ ստուգելու համար։',
  },
  {
    id: 11,
    esQuestion: '¿Qué función aparece en “¿Me escuchas?”?',
    hyQuestion: 'Ո՞ր գործառույթն է «Լսո՞ւմ ես ինձ» հարցում։',
    esAnswer: 'La función fática.',
    hyAnswer: 'Ֆատիկ գործառույթը։',
  },
  {
    id: 12,
    esQuestion: '¿Para qué sirve la función metalingüística?',
    hyQuestion: 'Ինչի՞ համար է մետալեզվական գործառույթը։',
    esAnswer: 'Para hablar sobre la propia lengua.',
    hyAnswer: 'Հենց լեզվի մասին խոսելու համար։',
  },
  {
    id: 13,
    esQuestion: '¿Qué función aparece en “Perro es un sustantivo”?',
    hyQuestion: 'Ո՞ր գործառույթն է «Perro բառը գոյական է» նախադասության մեջ։',
    esAnswer: 'La función metalingüística.',
    hyAnswer: 'Մետալեզվական գործառույթը։',
  },
  {
    id: 14,
    esQuestion: '¿Para qué sirve la función poética?',
    hyQuestion: 'Ինչի՞ համար է բանաստեղծական գործառույթը։',
    esAnswer: 'Para dar importancia a la forma y belleza del mensaje.',
    hyAnswer: 'Հաղորդագրության ձևն ու գեղեցկությունը կարևորելու համար։',
  },
  {
    id: 15,
    esQuestion: '¿Dónde aparece frecuentemente la función poética?',
    hyQuestion: 'Որտե՞ղ է հաճախ հանդիպում բանաստեղծական գործառույթը։',
    esAnswer: 'En poemas, canciones, publicidad y literatura.',
    hyAnswer: 'Բանաստեղծություններում, երգերում, գովազդում և գրականության մեջ։',
  },
];

export const SHORT_TEXT: ShortText = {
  esParagraphs: [
    'Las funciones del lenguaje son las diferentes formas de utilizar la lengua según nuestra intención.',
    'Hay seis funciones principales. La función referencial sirve para informar; la expresiva, para expresar sentimientos; la apelativa, para pedir u ordenar; la fática, para comprobar la comunicación; la metalingüística, para hablar de la lengua; y la poética, para crear un mensaje más bello.',
  ],
  hyParagraphs: [
    'Լեզվի գործառույթները լեզվի օգտագործման տարբեր ձևերն են՝ կախված մեր նպատակից։',
    'Կան վեց հիմնական գործառույթներ։ Տեղեկատվական գործառույթը ծառայում է տեղեկություն հաղորդելուն, զգացմունքայինը՝ զգացմունք արտահայտելուն, դիմողականը՝ խնդրելուն կամ հրահանգ տալուն, ֆատիկը՝ հաղորդակցությունը ստուգելուն, մետալեզվականը՝ լեզվի մասին խոսելուն, իսկ բանաստեղծականը՝ հաղորդագրությունն ավելի գեղեցիկ դարձնելուն։',
  ],
};
