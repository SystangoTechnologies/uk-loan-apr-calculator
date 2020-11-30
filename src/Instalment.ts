export default class Instalment {
        amount: number
        daysAfterFirstAdvance: number
        
        public get Amount(): number {
            return this.amount
        }
        public set Amount(value: number)  {
            this.amount = value
        }
        
        public get DaysAfterFirstAdvance(): number {
            return this.daysAfterFirstAdvance
        }
        public set DaysAfterFirstAdvance(value: number)  {
            this.daysAfterFirstAdvance = value
        }
        
        private Calculate(apr: number): number {
            const divisor = Math.pow((1 + apr), this.DaysToYears);
            const sum = (this.Amount / divisor);
            return sum;
        }
        
        private get DaysToYears(): number {
            return this.DaysAfterFirstAdvance / 365.25;
        }
    }
// const instalment: Instalment = new Instalment()
// export default instalment