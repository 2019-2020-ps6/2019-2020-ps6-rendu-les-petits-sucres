import {Question} from './question.model';

export interface Quiz {
    id: string;
    name: string;
    theme?: string;
    user: string;
    questions: Question[];
    image: string;
}
