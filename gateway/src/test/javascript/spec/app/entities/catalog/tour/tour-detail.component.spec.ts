/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TourDetailComponent } from 'app/entities/catalog/tour/tour-detail.component';
import { Tour } from 'app/shared/model/catalog/tour.model';

describe('Component Tests', () => {
    describe('Tour Management Detail Component', () => {
        let comp: TourDetailComponent;
        let fixture: ComponentFixture<TourDetailComponent>;
        const route = ({ data: of({ tour: new Tour(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TourDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TourDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TourDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tour).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
