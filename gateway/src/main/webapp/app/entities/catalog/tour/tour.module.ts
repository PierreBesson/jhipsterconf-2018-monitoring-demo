import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    TourComponent,
    TourDetailComponent,
    TourUpdateComponent,
    TourDeletePopupComponent,
    TourDeleteDialogComponent,
    tourRoute,
    tourPopupRoute
} from './';

const ENTITY_STATES = [...tourRoute, ...tourPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TourComponent, TourDetailComponent, TourUpdateComponent, TourDeleteDialogComponent, TourDeletePopupComponent],
    entryComponents: [TourComponent, TourUpdateComponent, TourDeleteDialogComponent, TourDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTourModule {}
