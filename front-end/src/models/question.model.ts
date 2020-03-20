export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    id: number;
    questionId: number;
    quizId: number;
}

export interface Question {
    id: number;
    quizId: number;
    label: string;
    answers: Answer[];
}
