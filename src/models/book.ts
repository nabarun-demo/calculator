import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsNegative,
  IsPositive
} from "class-validator";
import { isNullOrUndefined } from "util";

export class Book {
  @IsInt({ message: "Number1 must be numeric" })
  @IsNotEmpty({ message: "$property is required" })
  @IsPositive()
  private number1: number;

  @IsInt({ message: "Number2 must be numeric" })
  @IsNotEmpty({ message: "$property is required" })
  @IsPositive()
  private number2: number;

  // constructor() {}

  constructor(number1: number, number2: number) {
    this.number1 = number1;
    this.number2 = number2;
  }

  public getSummation(): number {
    return this.number1 + this.number2;
  }

  // IsEqual(b: Book): boolean {
  //   if (isNullOrUndefined(b)) {
  //     return false;
  //   }
  //   if (
  //     this.title === b.title &&
  //     this.author === b.author &&
  //     this.year === b.year &&
  //     this.pages === b.pages
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }
}
