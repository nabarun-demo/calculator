import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book';
import axios from 'axios';
import { validate } from 'class-validator';
import { resolve } from 'path';

class bookController {
  constructor() {}

  getAdditionResult(req: Request, res: Response, next: NextFunction) {
    let book = new Book(parseInt(req.body.number1), parseInt(req.body.number2));

    // console.log(book);
    validate(book, { validationError: { target: false } }).then(errors => {
      if (errors.length > 0) {
        res.status(500).json({ message: 'Validation error', errors: errors });
      } else {
        try {
          let result = book.number1 + book.number2;
          res.status(201).json({ message: 'success', result: result });
        } catch (error) {
          res.status(500).json({ message: 'Error during calculation' });
        }
      }
    });
  }
}

export default new bookController();
