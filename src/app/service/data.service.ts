import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDataModel, IStatsModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private httpClient: HttpClient) { }

    getData(activity_status: string | null, startDate: string | null, endDate: string | null): Observable<Array<IDataModel>> {
        let url = `${environment.apiUrl}/data`;

        if (activity_status && startDate && endDate) {
            url += `?activity_status=${activity_status}&startDate=${startDate}&endDate=${endDate}`;
        } else {
            if (startDate && endDate)
                url += `?startDate=${startDate}&endDate=${endDate}`;
            if (activity_status)
                url += `?activity_status=${activity_status}`;
        }

        return this.httpClient.get<Array<IDataModel>>(url);
    }

    getStats(): Observable<IStatsModel> {
        let url = `${environment.apiUrl}/stats`;
        return this.httpClient.get<IStatsModel>(url);
    }
}