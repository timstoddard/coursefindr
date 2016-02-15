var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var course_service_1 = require('./course-service');
var common_1 = require('angular2/common');
var orderByPipe_1 = require('./orderByPipe');
var filterPipe_1 = require('./filterPipe');
var AppComponent = (function () {
    function AppComponent(_courseService) {
        this._courseService = _courseService;
        this.hasLocalStorage = typeof (Storage) !== 'undefined';
        this.MSCSortType = 'courseNumber';
        this.MSCSortReverse = false;
        this.selectedText = 'Select courses below by department, course number, or units';
        this.courses = [];
        this.ACSortType = 'courseNumber';
        this.ACSortReverse = false;
        this.subjects = ['AEPS', 'AERO', 'AG', 'AGB', 'AGC', 'AGED', 'ANT', 'ARCE', 'ARCH', 'ART', 'ASCI', 'ASTR', 'BIO',
            'BMED', 'BOT', 'BRAE', 'BUS', 'CD', 'CE', 'CHEM', 'CHIN', 'CM', 'COMS', 'CPE', 'CRP', 'CSC', 'DANC',
            'DATA', 'DSCI', 'ECON', 'EDES', 'EDUC', 'EE', 'ENGL', 'ENGR', 'ENVE', 'ERSC', 'ES', 'FR', 'FSN',
            'GEOG', 'GEOL', 'GER', 'GRC', 'GSB', 'HIST', 'IME', 'ISLA', 'IT', 'ITAL', 'JOUR', 'JPNS', 'KINE',
            'LA', 'LS', 'MATE', 'MATH', 'MCRO', 'ME', 'MLL', 'MSCI', 'MSL', 'MU', 'NR', 'PHIL', 'PHYS', 'POLS',
            'PSC', 'PSY', 'RELS', 'RPTA', 'SCM', 'SOC', 'SOCS', 'SPAN', 'SS', 'STAT', 'TH', 'WGS', 'WVIT', 'ZOO'];
        this.update = new core_1.EventEmitter();
        this.courses = [];
        if (this.hasLocalStorage && localStorage.getItem('mySelectedCourses') !== null) {
            this.mySelectedCourses = JSON.parse(localStorage.getItem('mySelectedCourses'));
            this.updateStats();
        }
    }
    AppComponent.prototype.getCourses = function (col, value) {
        var _this = this;
        if (col === 'Dept') {
            this.updateSelectedText('Department', value);
        }
        else if (col === 'courseNumber') {
            this.updateSelectedText('Course Number', value + '00-' + value + '99');
        }
        else if (col === 'units') {
            this.updateSelectedText('Units', parseInt(value) > 0 ? value : 'Range');
        }
        this._courseService.getCourses(col, value)
            .subscribe(function (res) {
            _this.courses = res;
            var self = _this;
            // check if class already added
            _this.courses.forEach(function (elem) {
                if (self.classAlreadyAdded(elem.dept, elem.courseNumber, elem.type)) {
                    elem.added = true;
                }
            });
        }, function (error) { return console.log(error); }, function () { return _this.update.emit(_this.courses); } /* doesn't work (why?) */ /* doesn't work (why?) */);
    };
    AppComponent.prototype.classAlreadyAdded = function (dept, courseNumber, type) {
        var temp = false;
        this.mySelectedCourses.forEach(function (elem) {
            if (elem.dept === dept && elem.courseNumber === courseNumber && elem.type === type) {
                temp = true;
            }
        });
        return temp;
    };
    AppComponent.prototype.updateView = function () {
        this.update.emit(this.courses); /* this one works... */
    };
    AppComponent.prototype.removeAll = function () {
        this.mySelectedCourses = [];
        localStorage.removeItem('mySelectedCourses');
    };
    AppComponent.prototype.onCourseSelect = function (c) {
        this.showCourse = c;
    };
    AppComponent.prototype.addCourse = function (c) {
        if (this.mySelectedCourses == null) {
            this.mySelectedCourses = [];
        }
        this.mySelectedCourses.push(c);
        c.added = true;
        this.updateStats();
        if (this.hasLocalStorage) {
            localStorage.setItem('mySelectedCourses', JSON.stringify(this.mySelectedCourses));
        }
    };
    AppComponent.prototype.removeCourse = function (c) {
        this.mySelectedCourses.splice(this.mySelectedCourses.indexOf(c), 1);
        c.added = false;
        this.updateStats();
        if (this.hasLocalStorage) {
            localStorage.setItem('mySelectedCourses', JSON.stringify(this.mySelectedCourses));
        }
    };
    AppComponent.prototype.onSearchFocus = function () {
        if (this.courses.length <= 0) {
            alert('No courses selected.');
            document.getElementById('courseSearch').blur();
        }
    };
    AppComponent.prototype.updateSelectedText = function (col, value) {
        this.selectedText = 'Showing all courses where: ' + col + ' = ' + value;
    };
    AppComponent.prototype.updateStats = function () {
        var tempData = [];
        var unitsCount = 0;
        this.mySelectedCourses.forEach(function (elem) {
            if (tempData[elem.type] == null) {
                tempData[elem.type] = 1;
            }
            else {
                tempData[elem.type] += 1;
            }
            unitsCount += parseInt(elem.units);
        });
        this.checkUnitsHasHypen();
        this.units = unitsCount;
        var tempString = '';
        var numProps = Object.keys(tempData).length;
        for (var prop in tempData) {
            if (tempData[prop] > 0) {
                tempString += this.prettify(prop, tempData[prop]) + (numProps > 1 ? ', ' : '');
            }
            numProps--;
        }
        this.classTypes = tempString;
    };
    AppComponent.prototype.prettify = function (code, num) {
        if (code === 'Lec') {
            return num + ' lecture' + (num > 1 ? 's' : '');
        }
        else if (code === 'Lab') {
            return num + ' lab' + (num > 1 ? 's' : '');
        }
        else if (code === 'Act') {
            return num + ' activit' + (num > 1 ? 'ies' : 'y');
        }
        else if (code === 'Dis') {
            return num + ' discussion' + (num > 1 ? 's' : '');
        }
        else if (code === 'Sem') {
            return num + ' seminar' + (num > 1 ? 's' : '');
        }
        else if (code === 'Ind') {
            return num + ' independent course' + (num > 1 ? 's' : '');
        }
        return '';
    };
    AppComponent.prototype.checkUnitsHasHypen = function () {
        var temp = false;
        this.mySelectedCourses.forEach(function (elem) {
            if (elem.units.indexOf('-') != -1) {
                temp = true;
            }
        });
        this.unitsHasRange = temp;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AppComponent.prototype, "update", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app.html',
            styleUrls: ['./app.css', './css/bootstrap.css'],
            providers: [course_service_1.CourseService],
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            pipes: [orderByPipe_1.OrderByPipe, filterPipe_1.FilterPipe],
            viewBindings: [course_service_1.CourseService]
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.js.map
