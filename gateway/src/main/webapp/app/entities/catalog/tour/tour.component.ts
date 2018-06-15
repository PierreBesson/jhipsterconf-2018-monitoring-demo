import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITour } from 'app/shared/model/catalog/tour.model';
import { Principal } from 'app/core';
import { TourService } from './tour.service';

@Component({
    selector: 'jhi-tour',
    templateUrl: './tour.component.html'
})
export class TourComponent implements OnInit, OnDestroy {
    tours: ITour[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tourService: TourService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tourService.query().subscribe(
            (res: HttpResponse<ITour[]>) => {
                this.tours = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTours();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITour) {
        return item.id;
    }

    registerChangeInTours() {
        this.eventSubscriber = this.eventManager.subscribe('tourListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
