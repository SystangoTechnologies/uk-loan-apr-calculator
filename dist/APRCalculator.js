"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instalment_1 = __importDefault(require("./Instalment"));
const InstalmentFrequency_1 = __importDefault(require("./InstalmentFrequency"));
const InstalmentType_1 = __importDefault(require("./InstalmentType"));
class APRCalculator {
    constructor(firstAdvance) {
        this.constructorMthod(firstAdvance, [], []);
    }
    constructorMthod(firstAdvance, advances, payments) {
        this._advances = advances;
        this._payments = payments;
        const inst = new Instalment_1.default();
        inst.Amount = firstAdvance;
        inst.DaysAfterFirstAdvance = 0;
        this._advances.push(inst);
    }
    SinglePaymentCalculation(payment, daysAfterAdvance) {
        return Math.round(((Math.pow((this._advances[0].Amount / payment), ((365.25 / daysAfterAdvance) * -1)) - 1) * 100));
    }
    Calculate(guess = 0) {
        let rateToTry = (guess / 100);
        let difference = 1;
        let amountToAdd = 0.0001;
        while ((difference !== 0)) {
            let advances = 0;
            let payments = 0;
            this._advances.forEach(function (value, key) {
                advances += value.Calculate(rateToTry);
            });
            this._payments.forEach(function (value, key) {
                payments += value.Calculate(rateToTry);
            });
            difference = (payments - advances);
            if ((difference <= 0.0000001) && (difference >= -0.0000001)) {
                break;
            }
            if (difference > 0) {
                amountToAdd = (amountToAdd * 2);
                rateToTry = (rateToTry + amountToAdd);
            }
            else {
                amountToAdd = (amountToAdd / 2);
                rateToTry = (rateToTry - amountToAdd);
            }
        }
        return parseFloat((rateToTry * 100).toFixed(2));
    }
    AddInstalment(amount, daysAfterFirstAdvance, instalmentType = InstalmentType_1.default.Payment) {
        const instalment = new Instalment_1.default();
        instalment.Amount = amount;
        instalment.DaysAfterFirstAdvance = daysAfterFirstAdvance;
        switch (instalmentType) {
            case InstalmentType_1.default.Payment:
                this._payments.push(instalment);
                break;
            case InstalmentType_1.default.Advance:
                this._advances.push(instalment);
                break;
        }
    }
    static GetDaysBewteenInstalments(instalmentFrequency) {
        switch (instalmentFrequency) {
            case InstalmentFrequency_1.default.Daily:
                return 1;
                break;
            case InstalmentFrequency_1.default.Weekly:
                return 7;
                break;
            case InstalmentFrequency_1.default.Fortnightly:
                return 14;
                break;
            case InstalmentFrequency_1.default.FourWeekly:
                return 28;
                break;
            case InstalmentFrequency_1.default.Monthly:
                return (365.25 / 12);
                break;
            case InstalmentFrequency_1.default.Quarterly:
                return (365.25 / 4);
                break;
            case InstalmentFrequency_1.default.Annually:
                return 365.25;
                break;
        }
        return 1;
    }
    AddRegularInstalments(amount, numberOfInstalments, instalmentFrequency, daysAfterFirstAdvancefirstInstalment = 0) {
        const daysBetweenInstalments = APRCalculator.GetDaysBewteenInstalments(instalmentFrequency);
        if ((daysAfterFirstAdvancefirstInstalment === 0)) {
            daysAfterFirstAdvancefirstInstalment = daysBetweenInstalments;
        }
        for (let i = 0; (i < numberOfInstalments); i++) {
            const inst = new Instalment_1.default();
            inst.Amount = amount;
            inst.DaysAfterFirstAdvance = daysAfterFirstAdvancefirstInstalment + (daysBetweenInstalments * i);
            this._payments.push(inst);
        }
    }
    calculateAPRMonthly(goal, term, loanCost) {
        try {
            let startApr = 0;
            let endApr = 100;
            for (let l = 0; l < 100; l++) {
                const discounted = this.calculateTotalDiscounted(term, loanCost, startApr);
                console.log('here', goal, discounted);
                if ((discounted + 1.5) > goal && (discounted - 1.5) < goal) {
                    return startApr;
                }
                if (discounted > goal) {
                    startApr++;
                }
                if (discounted < goal) {
                    endApr = startApr--;
                }
                if (endApr !== 100) {
                    startApr = startApr + 0.1;
                }
            }
            return startApr;
        }
        catch (error) {
            console.log(error);
        }
    }
    calculateTotalDiscounted(term, loanCost, apr) {
        let totalRepay = 0;
        const ratio = (1 / (1 + (apr / 100)));
        for (let l = 1; l <= term; l++) {
            if (l !== term) {
                const t = 3 * (Math.pow(ratio, l / 12));
                totalRepay += t;
            }
            else {
                const t = (loanCost + 3) * (Math.pow(ratio, l / 12));
                totalRepay += t;
            }
        }
        return totalRepay;
    }
}
exports.default = APRCalculator;
