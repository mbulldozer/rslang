type Stage = 'difficulty-selection' | 'level-start' | 'level-end' | 'results';
type AnswerStatus = 'empty' | 'correct-answer' | 'wrong-answer';

interface IAnswer {
  word: string,
  status: AnswerStatus,
}

interface IAudioChallengeState {
  stage: Stage,
  usedWords: IWord[],
  answers: IAnswer[],
}

interface ISprintState {
  stage: Stage,
  usedWords: IWord[],
  answer: string,
  score: number,
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
  AnswerStatus, Stage, IAudioChallengeState, ISprintState, IWord, IAnswer,
};
