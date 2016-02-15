import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {AppComponent} from './app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {CourseService} from './course-service';

enableProdMode();
bootstrap(AppComponent, [HTTP_PROVIDERS, CourseService]);