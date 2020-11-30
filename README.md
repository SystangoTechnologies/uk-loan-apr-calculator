# United Kingdom APR Calculator

## This project contains code to calculate the Annual Percentage Rate for a loan and it's Instalments.

The APR is essentially how much your borrowing will cost over the period of an average year, over the term of your debt. It takes into account interest charged as well as any additional fees (such as arrangement fees, or annual fees) you’ll have to pay. It also considers the frequency with which interest is charged on your borrowing, as this as an impact on how much you will pay as well.
 

## Usage
Example : 

import APRCalculator from 'ukaprcalculator'
import { InstalmentFrequency } from 'ukaprcalculator'

Class test {
	async APRCalculatorTest
    {
    	<!-- this example considers principle amount 2000, interest rate 10%, duration 1 year -->
    	const calculator = new APRCalculator(2000)
        calculator.AddRegularInstalments(175.43, 12, InstalmentFrequency.Monthly)
        const apr = calculator.Calculate()
        console.log('Result 14.92 ', apr)
    }
}
