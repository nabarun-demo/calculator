"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const class_validator_1 = require("class-validator");
class bookController {
    constructor() { }
    getAdditionResult(req, res, next) {
        let book = new book_1.Book(parseInt(req.body.number1), parseInt(req.body.number2));
        // console.log(book);
        class_validator_1.validate(book, { validationError: { target: false } }).then(errors => {
            if (errors.length > 0) {
                res.status(500).json({ message: "Validation error", errors: errors });
            }
            else {
                try {
                    res.status(201).json({
                        message: "success",
                        result: book.getSummation()
                    });
                }
                catch (error) {
                    res.status(500).json({ message: "Error during calculation" });
                }
            }
        });
    }
}
exports.default = new bookController();
//# sourceMappingURL=bookController.js.map