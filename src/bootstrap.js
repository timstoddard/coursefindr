var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var app_1 = require('./app');
var http_1 = require('angular2/http');
var course_service_1 = require('./course-service');
core_1.enableProdMode();
browser_1.bootstrap(app_1.AppComponent, [http_1.HTTP_PROVIDERS, course_service_1.CourseService]);

//# sourceMappingURL=bootstrap.js.map
