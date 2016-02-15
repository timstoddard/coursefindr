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
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (array, args) {
        if (array === null || array === undefined || args[0] === null || args[0] === undefined)
            return array;
        if (array.length === 0 || args[0].length == 0)
            return array;
        array = array.filter(function (value) {
            for (var propertyName in value) {
                if (typeof (value[propertyName]) === 'string'
                    && String(value[propertyName]).toLocaleLowerCase().indexOf(args[0].toLocaleLowerCase()) >= 0
                    && propertyName != 'description') {
                    return true;
                }
            }
            return false;
        });
        return array;
    };
    FilterPipe = __decorate([
        core_1.Pipe({
            name: "filter",
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
})();
exports.FilterPipe = FilterPipe;

//# sourceMappingURL=filterPipe.js.map
