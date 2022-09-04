type Stage = 'difficulty-selection' | 'level-start' | 'level-end' | 'results';
type AnswerStatus = 'empty' | 'correct-answer' | 'wrong-answer';

interface IGameState {
  stage: Stage,
  usedWords: any[],
  answers: any[],
}

export {
  Stage, AnswerStatus, IGameState,
};
