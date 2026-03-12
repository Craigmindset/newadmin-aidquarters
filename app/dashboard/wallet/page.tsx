"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Download,
  Settings,
  Zap,
} from "lucide-react";

export default function WalletPage() {
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [autoDebitEnabled, setAutoDebitEnabled] = useState(true);

  const walletBalance = 45000;
  const pendingPayments = 155000;
  const monthlyDebit = 155000;

  const transactions = [
    {
      id: 1,
      type: "debit",
      description: "Salary payment to Grace Okoro",
      amount: 60000,
      date: "2024-12-01",
      status: "Completed",
      reference: "PAY001",
    },
    {
      id: 2,
      type: "debit",
      description: "Salary payment to Ibrahim Musa",
      amount: 50000,
      date: "2024-12-01",
      status: "Completed",
      reference: "PAY002",
    },
    {
      id: 3,
      type: "credit",
      description: "Wallet top-up",
      amount: 100000,
      date: "2024-11-28",
      status: "Completed",
      reference: "TOP001",
    },
    {
      id: 4,
      type: "debit",
      description: "Salary payment to Chioma Nwankwo",
      amount: 45000,
      date: "2024-11-01",
      status: "Completed",
      reference: "PAY003",
    },
    {
      id: 5,
      type: "credit",
      description: "Wallet top-up",
      amount: 200000,
      date: "2024-10-25",
      status: "Completed",
      reference: "TOP002",
    },
  ];

  const handleTopUp = () => {
    // Handle top-up logic here
    setShowTopUpDialog(false);
    setTopUpAmount("");
  };

  return (
    <div className="space-y-6 min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Wallet Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your wallet balance and payment settings
          </p>
        </div>
        <Button
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
          onClick={() => setShowTopUpDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Top Up Wallet
        </Button>
      </div>

      {/* Wallet Overview */}
      <div className="grid md:grid-cols-3 gap-6 min-w-0">
        <Card className="md:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Wallet className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₦{walletBalance.toLocaleString()}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Available balance
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pending Payments
                  </p>
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    ₦{pendingPayments.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Auto-debit
                  </p>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    ₦{monthlyDebit.toLocaleString()}
                  </p>
                </div>
              </div>

              {walletBalance < monthlyDebit && (
                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                      Low Balance Warning
                    </p>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                    Your balance is insufficient for next month's auto-debit.
                    Please top up your wallet.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Auto-debit
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatic salary payments
                  </p>
                </div>
                <Switch
                  checked={autoDebitEnabled}
                  onCheckedChange={setAutoDebitEnabled}
                />
              </div>

              {autoDebitEnabled && (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Auto-debit Active
                    </p>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Salaries will be automatically paid on the 1st of each month
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button
                variant="outline"
                className="w-full dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 min-w-0">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 dark:border-gray-700 dark:hover:bg-gray-700"
              onClick={() => setShowTopUpDialog(true)}
            >
              <Plus className="h-6 w-6" />
              <span>Top Up</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <CreditCard className="h-6 w-6" />
              <span>Pay Staff</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Download className="h-6 w-6" />
              <span>Statement</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Settings className="h-6 w-6" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-white">
              Transaction History
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-400">Type</TableHead>
                  <TableHead className="dark:text-gray-400">
                    Description
                  </TableHead>
                  <TableHead className="dark:text-gray-400">Amount</TableHead>
                  <TableHead className="dark:text-gray-400">Date</TableHead>
                  <TableHead className="dark:text-gray-400">Status</TableHead>
                  <TableHead className="dark:text-gray-400">
                    Reference
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="dark:border-gray-700"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                        <span className="capitalize dark:text-gray-300">
                          {transaction.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {transaction.description}
                    </TableCell>
                    <TableCell
                      className={
                        transaction.type === "credit"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {transaction.type === "credit" ? "+" : "-"}₦
                      {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm dark:text-gray-300">
                      {transaction.reference}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top Up Dialog */}
      <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Top Up Wallet</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="dark:text-gray-300">
                Amount (₦)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">Payment Method</Label>
              <Select defaultValue="bank-transfer">
                <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="ussd">USSD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Quick Amounts
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[50000, 100000, 200000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    ₦{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTopUpDialog(false)}
              className="dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              onClick={handleTopUp}
              disabled={!topUpAmount || Number.parseInt(topUpAmount) <= 0}
            >
              Top Up ₦
              {topUpAmount
                ? Number.parseInt(topUpAmount).toLocaleString()
                : "0"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
