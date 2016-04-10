import {Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output} from 'angular2/core';
import {Course} from './course';
import {CourseService} from './course-service';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {OrderByPipe} from './orderByPipe';
import {FilterPipe} from './filterPipe';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrls: ['./app.css', './css/bootstrap.css'],
  providers: [CourseService],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [OrderByPipe, FilterPipe],
  viewBindings: [CourseService]
})
export class AppComponent {

    public hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    public mySelectedCourses: Course[];
    public MSCSortType = 'courseNumber';
    public MSCSortReverse = false;
    public classTypes: string;
    public units: number;
    public unitsHasRange: boolean;
    public selectedText: string = 'Select courses below by department, course number, or units';
    
    public showCourse: Course;
    public courses: Course[] = [];
    public ACSortType = 'courseNumber';
    public ACSortReverse = false;
    public searchString: string;
    public subjects = ['AEPS','AERO','AG','AGB','AGC','AGED','ANT','ARCE','ARCH','ART','ASCI','ASTR','BIO',
            'BMED','BOT','BRAE','BUS','CD','CE','CHEM','CHIN','CM','COMS','CPE','CRP','CSC','DANC',
            'DATA','DSCI','ECON','EDES','EDUC','EE','ENGL','ENGR','ENVE','ERSC','ES','FR','FSN',
            'GEOG','GEOL','GER','GRC','GSB','HIST','IME','ISLA','IT','ITAL','JOUR','JPNS','KINE',
            'LA','LS','MATE','MATH','MCRO','ME','MLL','MSCI','MSL','MU','NR','PHIL','PHYS','POLS',
            'PSC','PSY','RELS','RPTA','SCM','SOC','SOCS','SPAN','SS','STAT','TH','WGS','WVIT','ZOO'];
                     
    constructor(private _courseService: CourseService,
                private _changeDetectorRef: ChangeDetectorRef) {
        this.courses = [];
        if (this.hasLocalStorage && localStorage.getItem('mySelectedCourses') !== null) {
            this.mySelectedCourses = JSON.parse(localStorage.getItem('mySelectedCourses'));
            this.updateStats();
        }
    }
    
    getCourses(col: string, value: string) {
        this.selectedText = 'Loading...';
        this._courseService.getCourses(col, value)
            .subscribe(
                res => {
                    this.courses = res;
                    let self = this;
                    this.courses.forEach(function(elem) {
                        if (self.classAlreadyAdded(elem.dept, elem.courseNumber, elem.type)) {
                            elem.added = true;
                        }
                    });
                    if (col === 'Dept') {
                        this.selectedText = `Showing all ${value} courses`;
                    } else if (col === 'courseNumber') {
                        this.selectedText = `Showing all ${value + '00-level'} courses`;
                    } else if (col === 'units') {
                        this.selectedText = `Showing all ${(parseInt(value) > 0 ? value : 'varying') + '-unit'} courses`;
                    }
                    this._changeDetectorRef.markForCheck();
                },
                error => console.log(error));
    }
    
    private classAlreadyAdded(dept: string, courseNumber: string, type: string) {
        let temp: boolean = false;
        if (this.mySelectedCourses) {
            this.mySelectedCourses.forEach(function(elem) {
                if (elem.dept === dept && elem.courseNumber === courseNumber && elem.type === type) {
                    temp = true;
                }
            });
        }
        return temp;
    }
    
    removeAll() {
        this.mySelectedCourses = [];
        localStorage.removeItem('mySelectedCourses');
    }
    
    onCourseSelect(c: Course) {
        this.showCourse = c;
    }
    
    addCourse(c: Course) {
        if (this.mySelectedCourses == null) {
            this.mySelectedCourses = [];
        }
        this.mySelectedCourses.push(c);
        c.added = true;
        this.updateStats();
        if (this.hasLocalStorage) {
            localStorage.setItem('mySelectedCourses', JSON.stringify(this.mySelectedCourses));
        }
    }
    
    removeCourse(c: Course) {
        this.mySelectedCourses.splice(this.mySelectedCourses.indexOf(c), 1);
        c.added = false;
        this.updateStats();
        if (this.hasLocalStorage) {
            localStorage.setItem('mySelectedCourses', JSON.stringify(this.mySelectedCourses));
        }
    }
    
    updateStats() {
        var tempData = [];
        var unitsCount = 0;
        this.mySelectedCourses.forEach((elem) => {
            if (tempData[elem.type] == null) {
                tempData[elem.type] = 1;
            } else {
                tempData[elem.type] += 1;
            }
            unitsCount += parseInt(elem.units);
        });
        this.checkUnitsHasHypen();
        this.units = unitsCount;
        let tempString = '';
        let numProps = Object.keys(tempData).length;
        for (var prop in tempData) {
            if (tempData[prop] > 0) {
                tempString += this.prettify(prop, tempData[prop]) + (numProps > 1 ? ', ' : '');
            }
            numProps--;
        }
        this.classTypes = tempString;
    }
    
    private prettify(code: string, num: number) {
        if (code === 'Lec') {
            return num + ' lecture' + (num > 1 ? 's' : '');
        } else if (code === 'Lab') {
            return num + ' lab' + (num > 1 ? 's' : '');
        } else if (code === 'Act') {
            return num + ' activit' + (num > 1 ? 'ies' : 'y');
        } else if (code === 'Dis') {
            return num + ' discussion' + (num > 1 ? 's' : '');
        } else if (code === 'Sem') {
            return num + ' seminar' + (num > 1 ? 's' : '');
        } else if (code === 'Ind') {
            return num + ' independent course' + (num > 1 ? 's' : '');
        }
        return '';
    }
    
    private checkUnitsHasHypen() {
        var temp = false;
        this.mySelectedCourses.forEach((elem) => {
            if (elem.units.indexOf('-') != -1) {
                temp = true;
            }
        });
        this.unitsHasRange = temp;
    }
}