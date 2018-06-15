export interface IReservation {
    id?: number;
    tourCode?: number;
    personName?: string;
    paid?: boolean;
    notes?: string;
}

export class Reservation implements IReservation {
    constructor(public id?: number, public tourCode?: number, public personName?: string, public paid?: boolean, public notes?: string) {
        this.paid = false;
    }
}
