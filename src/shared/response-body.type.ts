type TranslationResult = [
    string, // Translation
    string, // Source text
    string | undefined,
    string | undefined,
    number,
    undefined?,
    undefined?,
    [unknown[], unknown[]]?,
    [[[string, string]], [[string, string]]]?,
];

type TranslationPhonetics = [
    string | undefined,
    string | undefined,
    string, // Source phonetics
    string?, // Translation phonetics
];

type TranslationFrequency = [
    string, // Translation
    string[], // Source polysemy
    undefined,
    number, // Translation Rating
];

type TranslationPartsOfSpeech =
    | Array<
          [
              string, // Translation POS
              string[], // Translation polysemy
              TranslationFrequency[],
              string, // Source text
              number, // Polysemy index
          ]
      >
    | undefined;

type TranslationPolysemy = [
    [
        string, // Source text
        undefined,
        Array<
            [
                string, // Translation
                number,
                boolean,
                boolean,
                number[],
                undefined?,
                number[][]?,
            ]
        >,
        number[][],
        string, // Source text
        number,
        number,
    ],
];

type SourceDetection = [
    [string], // Detect code
    undefined,
    [number],
    [string], // Detect code
];

type SourcePolysemy =
    | Array<
          [
              string, // Synonym POS
              Array<
                  [
                      string[], // Synonym list
                      string,
                      [string[]]?, // Synonym terminology
                  ]
              >,
              string, // Source text
              number, // Synonym Index
          ]
      >
    | undefined;

type SourceDefinition = Array<
    [
        string, // Source definition POS
        Array<
            [
                string, // Source definition description
                string,
                (string | undefined)?,
                Array<[string] | undefined>?, // Definition terminology
            ]
        >,
        string, // Source text
        number,
    ]
>;

type SourceExampleSentence =
    | [
          Array<
              [
                  string, // Source Example Sentence
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  string,
              ]
          >,
      ]
    | undefined;

export type ResponseBody = [
    /* Sentence, phrase or word */
    [TranslationResult, TranslationPhonetics],
    TranslationPartsOfSpeech,
    string, // Source code
    undefined,
    undefined,
    TranslationPolysemy,
    number,
    [string?, string?, number[]?, undefined?, undefined?, boolean?],
    SourceDetection,

    /* Word */
    undefined?,
    undefined?,
    SourcePolysemy?,
    SourceDefinition?,
    SourceExampleSentence?,
];
