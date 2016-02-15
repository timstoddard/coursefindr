import {Pipe} from 'angular2/core';
import {Course} from './course';

@Pipe({
    name: "filter",
    pure: false
})
export class FilterPipe {

    transform(array: Array<Course>, args: string): Array<Course> {
        if (array === null || array === undefined || args[0] === null || args[0] === undefined) return array;
        if (array.length === 0 || args[0].length == 0) return array;
        array = array.filter((value: Course) => {
            for (var propertyName in value) {
                if (typeof(value[propertyName]) === 'string'
                        && String(value[propertyName]).toLocaleLowerCase().indexOf(args[0].toLocaleLowerCase()) >= 0
                        && propertyName != 'description') {
                    return true;
                }
            }
            return false;
        });
        
        return array;
    }
}