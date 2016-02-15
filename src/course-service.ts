import {Injectable, EventEmitter, Output} from 'angular2/core';
import {Course} from './course';
import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {CORE_DIRECTIVES} from 'angular2/common';
import 'rxjs/Rx';

@Injectable()
export class CourseService {
    
    constructor(private http: Http) {}
    @Output() update: EventEmitter<any> = new EventEmitter();
    getCourses(col: string, value: string) {
        return this.http.get(
            'http://172.16.100.7:8888/api.php?col='+col+'&value='+value)
            .map(res => res.json());
    }
}