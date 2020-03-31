export interface Answer {
    type?: string;
    value: string;
    isCorrect: string;
    id: number;
    questionId: number;
    quizId: number;
    image: string;
}

export interface Question {
    id: number;
    quizId: number;
    label: string;
    answers: Answer[];
}
