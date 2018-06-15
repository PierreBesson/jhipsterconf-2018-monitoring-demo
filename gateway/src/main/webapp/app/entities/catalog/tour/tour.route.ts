import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Tour } from 'app/shared/model/catalog/tour.model';
import { TourService } from './tour.service';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail.component';
import { TourUpdateComponent } from './tour-update.component';
import { TourDeletePopupComponent } from './tour-delete-dialog.component';
import { ITour } from 'app/shared/model/catalog/tour.model';

@Injectable({ providedIn: 'root' })
export class TourResolve implements Resolve<ITour> {
    constructor(private service: TourService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((tour: HttpResponse<Tour>) => tour.body);
        }
        return Observable.of(new Tour());
    }
}

export const tourRoute: Routes = [
    {
        path: 'tour',
        component: TourComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tours'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tour/:id/view',
        component: TourDetailComponent,
        resolve: {
            tour: TourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tours'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tour/new',
        component: TourUpdateComponent,
        resolve: {
            tour: TourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tours'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tour/:id/edit',
        component: TourUpdateComponent,
        resolve: {
            tour: TourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tours'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tourPopupRoute: Routes = [
    {
        path: 'tour/:id/delete',
        component: TourDeletePopupComponent,
        resolve: {
            tour: TourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
