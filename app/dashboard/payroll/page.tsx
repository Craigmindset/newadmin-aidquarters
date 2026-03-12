import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PayrollPage() {
  const employees = [
    {
      id: 1,
      name: "Grace Okoro",
      position: "Nanny",
      image: "/placeholder.svg?height=40&width=40",
      salary: 60000,
      lastPaid: "2024-12-01",
      status: "Paid",
    },
    {
      id: 2,
      name: "Ibrahim Musa",
      position: "Driver",
      image: "/placeholder.svg?height=40&width=40",
      salary: 50000,
      lastPaid: "2024-12-01",
      status: "Paid",
    },
    {
      id: 3,
      name: "Chioma Nwankwo",
      position: "Housekeeper",
      image: "/placeholder.svg?height=40&width=40",
      salary: 45000,
      lastPaid: "2024-11-01",
      status: "Pending",
    },
  ];

  const paymentHistory = [
    {
      id: 1,
      staffName: "Grace Okoro",
      amount: 60000,
      paymentDate: "2024-12-01",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 2,
      staffName: "Ibrahim Musa",
      amount: 50000,
      paymentDate: "2024-12-01",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 3,
      staffName: "Chioma Nwankwo",
      amount: 45000,
      paymentDate: "2024-11-01",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 4,
      staffName: "Grace Okoro",
      amount: 60000,
      paymentDate: "2024-11-01",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 5,
      staffName: "Ibrahim Musa",
      amount: 50000,
      paymentDate: "2024-11-01",
      status: "Paid",
      method: "Bank Transfer",
    },
  ];

  const totalMonthlyPayroll = employees.reduce(
    (sum, emp) => sum + emp.salary,
    0,
  );
  const pendingPayments = employees.filter(
    (emp) => emp.status === "Pending",
  ).length;

  return (
    <div className="space-y-6 min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Payroll Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage staff payments and view payment history
          </p>
        </div>
        <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
          <CreditCard className="h-4 w-4 mr-2" />
          Pay All Staff
        </Button>
      </div>

      {/* Payroll Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Monthly Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ₦{totalMonthlyPayroll.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total for {employees.length} employees
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {pendingPayments}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Payments due
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Next Payment Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              Jan 1
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Staff Payments */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Current Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <Avatar>
                    <AvatarImage
                      src={employee.image || "/placeholder.svg"}
                      alt={employee.name}
                    />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {employee.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {employee.position}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₦{employee.salary.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly salary
                    </p>
                  </div>

                  <Badge
                    className={
                      employee.status === "Paid"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                        : "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
                    }
                  >
                    {employee.status}
                  </Badge>

                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    disabled={employee.status === "Paid"}
                  >
                    {employee.status === "Paid" ? "Paid" : "Pay Now"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="dark:text-white">Payment History</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10 w-full sm:w-64 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-x-auto">
            <Table className="min-w-[680px]">
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-400">
                    Staff Name
                  </TableHead>
                  <TableHead className="dark:text-gray-400">Amount</TableHead>
                  <TableHead className="dark:text-gray-400">
                    Payment Date
                  </TableHead>
                  <TableHead className="dark:text-gray-400">Method</TableHead>
                  <TableHead className="dark:text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id} className="dark:border-gray-700">
                    <TableCell className="font-medium dark:text-white">
                      {payment.staffName}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      ₦{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {payment.method}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
