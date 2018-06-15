import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITour } from 'app/shared/model/catalog/tour.model';

type EntityResponseType = HttpResponse<ITour>;
type EntityArrayResponseType = HttpResponse<ITour[]>;

@Injectable({ providedIn: 'root' })
export class TourService {
    private resourceUrl = SERVER_API_URL + 'catalog/api/tours';

    constructor(private http: HttpClient) {}

    create(tour: ITour): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tour);
        return this.http
            .post<ITour>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(tour: ITour): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tour);
        return this.http
            .put<ITour>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITour>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITour[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(tour: ITour): ITour {
        const copy: ITour = Object.assign({}, tour, {
            fromDate: tour.fromDate != null && tour.fromDate.isValid() ? tour.fromDate.toJSON() : null,
            toDate: tour.toDate != null && tour.toDate.isValid() ? tour.toDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fromDate = res.body.fromDate != null ? moment(res.body.fromDate) : null;
        res.body.toDate = res.body.toDate != null ? moment(res.body.toDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((tour: ITour) => {
            tour.fromDate = tour.fromDate != null ? moment(tour.fromDate) : null;
            tour.toDate = tour.toDate != null ? moment(tour.toDate) : null;
        });
        return res;
    }
}
