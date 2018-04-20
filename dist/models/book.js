"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class Book {
    // constructor() {}
    constructor(number1, number2) {
        this.number1 = number1;
        this.number2 = number2;
    }
    getSummation() {
        return this.number1 + this.number2;
    }
}
__decorate([
    class_validator_1.IsInt({ message: "Number1 must be numeric" }),
    class_validator_1.IsNotEmpty({ message: "$property is required" }),
    class_validator_1.IsPositive()
], Book.prototype, "number1", void 0);
__decorate([
    class_validator_1.IsInt({ message: "Number2 must be numeric" }),
    class_validator_1.IsNotEmpty({ message: "$property is required" }),
    class_validator_1.IsPositive()
], Book.prototype, "number2", void 0);
exports.Book = Book;
//# sourceMappingURL=book.js.map