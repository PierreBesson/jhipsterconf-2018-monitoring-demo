import { Moment } from 'moment';

export interface ITour {
    id?: number;
    tourName?: string;
    type?: string;
    duration?: string;
    fromDate?: Moment;
    toDate?: Moment;
    description?: string;
}

export class Tour implements ITour {
    constructor(
        public id?: number,
        public tourName?: string,
        public type?: string,
        public duration?: string,
        public fromDate?: Moment,
        public toDate?: Moment,
        public description?: string
    ) {}
}
