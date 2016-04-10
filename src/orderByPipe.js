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
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        if (array === null || array === undefined || array.length === 0)
            return array;
        array.sort(function (a, b) {
            // sort by dept
            if (args[0] === 'dept') {
                // sort by dept, courseNumber, type
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            }
            else if (args[0] === 'courseNumber') {
                // sort by courseNumber, dept, type
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            }
            else if (args[0] === 'name') {
                // sort by name, type
                if (a.name.localeCompare(b.name) != 0) {
                    return (args[1]) ? -a.name.localeCompare(b.name) : a.name.localeCompare(b.name);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            }
            else if (args[0] === 'type') {
                // sort by type, dept, courseNumber
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
            }
            else if (args[0] === 'sections') {
                // sort by sections, dept, courseNumber, type
                var aSections = parseInt(a.sections), bSections = parseInt(b.sections);
                if (aSections != bSections) {
                    return (args[1]) ? bSections - aSections : aSections - bSections;
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            }
            else if (args[0] === 'units') {
                // sort by units, dept, courseNumber, type
                if (a.units.localeCompare(b.units) != 0) {
                    return (args[1]) ? -a.units.localeCompare(b.units) : a.units.localeCompare(b.units);
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            }
            return 0;
        });
        return array;
    };
    OrderByPipe = __decorate([
        core_1.Pipe({
            name: "orderBy",
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
})();
exports.OrderByPipe = OrderByPipe;

//# sourceMappingURL=orderByPipe.js.map
