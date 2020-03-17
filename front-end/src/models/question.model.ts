export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    quizId: number;
    label: string;
    answers: Answer[];
}
