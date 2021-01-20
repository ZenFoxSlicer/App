import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    apiURI: string;

    constructor() {
        this.apiURI = 'https://localhost:44300';
     }

     getApiURI() {
         return this.apiURI;
     }
}
