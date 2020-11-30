import Instalment from './Instalment'
import InstalmentFrequency from './InstalmentFrequency'
import InstalmentType from './InstalmentType'

export default class APRCalculator {
    private _advances

    private _payments

    public constructor(firstAdvance: number) {
        this.constructorMthod(firstAdvance, [], [])
    }

    private constructorMthod(firstAdvance: number, advances, payments) {
        this._advances = advances
        this._payments = payments
        const inst = new Instalment()
        inst.Amount = firstAdvance
        inst.DaysAfterFirstAdvance = 0
        this._advances.push(inst)
    }

    public SinglePaymentCalculation(payment: number, daysAfterAdvance: number): number {
        return Math.round(((Math.pow((this._advances[0].Amount / payment), ((365.25 / daysAfterAdvance) * -1)) - 1) * 100))
    }

    public Calculate(guess = 0): number {
        let rateToTry: number = (guess / 100)
        let difference = 1
        let amountToAdd = 0.0001
        while ((difference !== 0)) {
            let advances = 0
            let payments = 0
            this._advances.forEach(function(value, key) {
                advances += value.Calculate(rateToTry)
            })
            this._payments.forEach(function(value, key) {
                payments += value.Calculate(rateToTry)
            })
            difference = (payments - advances)
            if ((difference <= 0.0000001) && (difference >= -0.0000001)) {
                break
            }

            if (difference > 0) {
                amountToAdd = (amountToAdd * 2)
                rateToTry = (rateToTry + amountToAdd)
            } else {
                amountToAdd = (amountToAdd / 2)
                rateToTry = (rateToTry - amountToAdd)
            }
        }

        return parseFloat((rateToTry * 100).toFixed(2))
    }

    public AddInstalment(amount: number, daysAfterFirstAdvance: number, instalmentType: InstalmentType = InstalmentType.Payment): void {
        const instalment = new Instalment()
        instalment.Amount = amount
        instalment.DaysAfterFirstAdvance = daysAfterFirstAdvance
        switch (instalmentType) {
            case InstalmentType.Payment:
                this._payments.push(instalment)
                break
            case InstalmentType.Advance:
                this._advances.push(instalment)
                break
        }
    }

    private static GetDaysBewteenInstalments(instalmentFrequency: InstalmentFrequency): number {
        switch (instalmentFrequency) {
            case InstalmentFrequency.Daily:
                return 1
                break
            case InstalmentFrequency.Weekly:
                return 7
                break
            case InstalmentFrequency.Fortnightly:
                return 14
                break
            case InstalmentFrequency.FourWeekly:
                return 28
                break
            case InstalmentFrequency.Monthly:
                return (365.25 / 12)
                break
            case InstalmentFrequency.Quarterly:
                return (365.25 / 4)
                break
            case InstalmentFrequency.Annually:
                return 365.25
                break
        }

        return 1
    }

    public AddRegularInstalments(amount: number, numberOfInstalments: number, instalmentFrequency: InstalmentFrequency, daysAfterFirstAdvancefirstInstalment = 0): void {
        const daysBetweenInstalments = APRCalculator.GetDaysBewteenInstalments(instalmentFrequency)
        if ((daysAfterFirstAdvancefirstInstalment === 0)) {
            daysAfterFirstAdvancefirstInstalment = daysBetweenInstalments
        }

        for (let i: number = 0; (i < numberOfInstalments); i++) {
            const inst = new Instalment()
            inst.Amount = amount
            inst.DaysAfterFirstAdvance = daysAfterFirstAdvancefirstInstalment + (daysBetweenInstalments * i)
            this._payments.push(inst)
        }
    }

    private calculateAPRMonthly(goal: number, term: number, loanCost): number {
        try {
            let startApr = 0
            let endApr = 100
            for (let l = 0; l < 100; l++) {
                const discounted = this.calculateTotalDiscounted(term, loanCost, startApr)
                console.log('here', goal, discounted)
                if ((discounted + 1.5) > goal && (discounted - 1.5) < goal) {
                    return startApr
                }
                if (discounted > goal) {
                    startApr++
                }
                if (discounted < goal) {
                    endApr = startApr--
                }
                if (endApr !== 100) {
                    startApr = startApr + 0.1
                }
            }
            return startApr
        } catch (error) {
            console.log(error)
        }
    }

    private calculateTotalDiscounted(term, loanCost, apr) {
        let totalRepay = 0
        const ratio = (1 / (1 + (apr / 100)))
        for (let l = 1; l <= term; l++) {
            if (l !== term) {
                const t = 3 * (Math.pow(ratio, l / 12))
                totalRepay += t
            } else {
                const t = (loanCost + 3) * (Math.pow(ratio, l / 12))
                totalRepay += t
            }
        }
        return totalRepay
    }
}