/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TourUpdateComponent } from 'app/entities/catalog/tour/tour-update.component';
import { TourService } from 'app/entities/catalog/tour/tour.service';
import { Tour } from 'app/shared/model/catalog/tour.model';

describe('Component Tests', () => {
    describe('Tour Management Update Component', () => {
        let comp: TourUpdateComponent;
        let fixture: ComponentFixture<TourUpdateComponent>;
        let service: TourService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TourUpdateComponent]
            })
                .overrideTemplate(TourUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TourUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TourService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Tour(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tour = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Tour();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tour = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
