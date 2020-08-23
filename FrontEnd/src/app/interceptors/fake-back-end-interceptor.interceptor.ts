import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { LoginResult } from '../shared/models/LoginResult';
import { Employee } from '../shared/models/employee.model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<LoginResult>> {

    switch (true) {
      case request.url.endsWith('auth/login'):
        {
          return of(new HttpResponse<LoginResult>({ body: { authToken: 'fake-jwt-token' } }));
        }
      case request.url.endsWith('table/table-data'):
        {
          const employees: Employee[] = [
            { position: 'Worker', name: 'Jack Rundal', yearsWorked: 1, age: 25 },
            { position: 'Worker', name: 'Michael Morra', yearsWorked: 4, age: 23 },
            { position: 'manager', name: 'Jane Jass', yearsWorked: 6, age: 26 },
            { position: 'Manager', name: 'Mike Lokt', yearsWorked: 9, age: 35 },
            { position: 'Worker', name: 'James Krill', yearsWorked: 10, age: 25 },
            { position: 'Director', name: 'Lourel Loin', yearsWorked: 12, age: 51 },
            { position: 'Worker', name: 'Betty Kin', yearsWorked: 14, age: 31 },
            { position: 'Worker', name: 'Mike Long', yearsWorked: 15, age: 56 },
            { position: 'Manager', name: 'Jasper Knight', yearsWorked: 18, age: 45 },
            { position: 'Top Manager', name: 'Nina Moore', yearsWorked: 20, age: 55 },
          ];
          return of(new HttpResponse<any>({ body: employees }));
        }
      case request.url.endsWith('dashboard/pie-chart-data'):
        {
          const response = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
              text: "Basic Column Chart in Angular"
            },
            data: [{
              type: "column",
              dataPoints: [
                { y: 71, label: "Apple" },
                { y: 55, label: "Mango" },
                { y: 50, label: "Orange" },
                { y: 65, label: "Banana" },
                { y: 95, label: "Pineapple" },
                { y: 68, label: "Pears" },
                { y: 28, label: "Grapes" },
                { y: 34, label: "Lychee" },
                { y: 14, label: "Jackfruit" }
              ]
            }]
          };
          return of(new HttpResponse<any>({ body: response }));
        }
    }
    return of(null);
  }
}

