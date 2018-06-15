import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITour } from 'app/shared/model/catalog/tour.model';

@Component({
    selector: 'jhi-tour-detail',
    templateUrl: './tour-detail.component.html'
})
export class TourDetailComponent implements OnInit {
    tour: ITour;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ tour }) => {
            this.tour = tour;
        });
    }

    previousState() {
        window.history.back();
    }
}
