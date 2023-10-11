import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDataModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private httpClient: HttpClient) { }
    
    getData(dataRange: string | null, activity_status: string | null): Observable<Array<IDataModel>> {
        let url = `${environment.apiUrl}/data`;

        if (dataRange && activity_status)
            url += `?dataRange=${dataRange}&activity_status=${activity_status}`

        if(dataRange)
            url += `?dataRange=${dataRange}`;
        
        if(activity_status)
            url += `?activity_status=${activity_status}`;
        
        return this.httpClient.get<Array<IDataModel>>(url);
    }
}