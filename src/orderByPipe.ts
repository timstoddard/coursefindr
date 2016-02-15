import {Pipe} from 'angular2/core';
import {Course} from './course';

@Pipe({
    name: "orderBy",
    pure: false
})
export class OrderByPipe {

    transform(array: Array<Course>, args: string): Array<Course> {
        if (array === null || array === undefined) return array;
        if (array.length == 0) return array;
        array.sort((a: Course, b: Course) => {
            // sort by dept
            if (args[0] === 'dept') {
                // sort by dept, then courseNumber, then type
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            // sort by courseNumber    
            } else if (args[0] === 'courseNumber') {
                // sort by courseNumber then type
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            // sort by name
            } else if (args[0] === 'name') {
                // sort by name then type
                if (a.name.localeCompare(b.name) != 0) {
                    return (args[1]) ? -a.name.localeCompare(b.name) : a.name.localeCompare(b.name);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            // sort by type
            } else if (args[0] === 'type') {
                // sort by type then dept then courseNumber
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
                if (a.dept.localeCompare(b.dept) != 0) {
                    return (args[1]) ? -a.dept.localeCompare(b.dept) : a.dept.localeCompare(b.dept);
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
            // sort by sections
            } else if (args[0] === 'sections') {
                // sort by sections then courseNumber then type
                let aSections = parseInt(a.sections), bSections = parseInt(b.sections);
                if (aSections != bSections) {
                    return (args[1]) ? bSections - aSections : aSections - bSections;
                }
                if (a.courseNumber.localeCompare(b.courseNumber) != 0) {
                    return (args[1]) ? -a.courseNumber.localeCompare(b.courseNumber) : a.courseNumber.localeCompare(b.courseNumber);
                }
                if (a.type.localeCompare(b.type) != 0) {
                    return (args[1]) ? -a.type.localeCompare(b.type) : a.type.localeCompare(b.type);
                }
            // sort by units
            } else if (args[0] === 'units') {
                // sort by units then dept then courseNumber then type
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
    }
}