import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservation } from 'app/shared/model/booking/reservation.model';

@Component({
    selector: 'jhi-reservation-detail',
    templateUrl: './reservation-detail.component.html'
})
export class ReservationDetailComponent implements OnInit {
    reservation: IReservation;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ reservation }) => {
            this.reservation = reservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
