import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITour } from 'app/shared/model/catalog/tour.model';
import { TourService } from './tour.service';

@Component({
    selector: 'jhi-tour-update',
    templateUrl: './tour-update.component.html'
})
export class TourUpdateComponent implements OnInit {
    private _tour: ITour;
    isSaving: boolean;
    fromDate: string;
    toDate: string;

    constructor(private tourService: TourService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ tour }) => {
            this.tour = tour;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tour.fromDate = moment(this.fromDate, DATE_TIME_FORMAT);
        this.tour.toDate = moment(this.toDate, DATE_TIME_FORMAT);
        if (this.tour.id !== undefined) {
            this.subscribeToSaveResponse(this.tourService.update(this.tour));
        } else {
            this.subscribeToSaveResponse(this.tourService.create(this.tour));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITour>>) {
        result.subscribe((res: HttpResponse<ITour>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tour() {
        return this._tour;
    }

    set tour(tour: ITour) {
        this._tour = tour;
        this.fromDate = moment(tour.fromDate).format(DATE_TIME_FORMAT);
        this.toDate = moment(tour.toDate).format(DATE_TIME_FORMAT);
    }
}
