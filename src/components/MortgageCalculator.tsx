import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number | "">("");
  const [loanTerm, setLoanTerm] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = Number(homeValue) - Number(downPayment);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    const mortgage =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(mortgage); // Set as a number
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homeValue">Home Value ($)</Label>
            <Input
              id="homeValue"
              type="number"
              value={homeValue}
              onChange={(e) =>
                setHomeValue(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Enter home value"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) =>
                setDownPayment(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Enter down payment"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) =>
                setLoanTerm(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Enter loan term"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Enter interest rate"
            />
          </div>
          <Button onClick={calculateMortgage} className="w-full">
            Calculate
          </Button>
          {monthlyPayment !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Estimated Monthly Payment:
              </p>
              <p className="text-2xl font-bold">${monthlyPayment.toFixed(2)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
