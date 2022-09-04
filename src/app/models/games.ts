type Stage = 'difficulty-selection' | 'level-start' | 'level-end' | 'results';
type AnswerStatus = 'empty' | 'correct-answer' | 'wrong-answer';

interface IAnswer {
  word: string,
  status: AnswerStatus,
}

interface IGameState {
  stage: Stage,
  usedWords: IWord[],
  answers: IAnswer[],
}

interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
}

export {
  AnswerStatus, Stage, IGameState, IWord, IAnswer,
};
