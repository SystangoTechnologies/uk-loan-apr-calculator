"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instalment {
    get Amount() {
        return this.amount;
    }
    set Amount(value) {
        this.amount = value;
    }
    get DaysAfterFirstAdvance() {
        return this.daysAfterFirstAdvance;
    }
    set DaysAfterFirstAdvance(value) {
        this.daysAfterFirstAdvance = value;
    }
    Calculate(apr) {
        const divisor = Math.pow((1 + apr), this.DaysToYears);
        const sum = (this.Amount / divisor);
        return sum;
    }
    get DaysToYears() {
        return this.DaysAfterFirstAdvance / 365.25;
    }
}
exports.default = Instalment;
