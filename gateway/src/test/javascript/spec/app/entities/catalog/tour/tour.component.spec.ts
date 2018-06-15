/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TourComponent } from 'app/entities/catalog/tour/tour.component';
import { TourService } from 'app/entities/catalog/tour/tour.service';
import { Tour } from 'app/shared/model/catalog/tour.model';

describe('Component Tests', () => {
    describe('Tour Management Component', () => {
        let comp: TourComponent;
        let fixture: ComponentFixture<TourComponent>;
        let service: TourService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TourComponent],
                providers: []
            })
                .overrideTemplate(TourComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TourComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TourService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Tour(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tours[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
