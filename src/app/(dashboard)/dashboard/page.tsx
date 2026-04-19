/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetAnalyticsSummaryQuery } from '@/redux/features/dashboard/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  const { data: analyticsData, isLoading } = useGetAnalyticsSummaryQuery({});

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const summary = analyticsData?.data || [];

  // Calculate totals from summary
  const totalSales = summary.reduce(
    (sum: number, item: any) => sum + item.totalSales,
    0,
  );
  const totalProfit = summary.reduce(
    (sum: number, item: any) => sum + item.totalProfit,
    0,
  );
  const totalOrders = summary.reduce(
    (sum: number, item: any) => sum + item.totalOrders,
    0,
  );
  const totalProducts = summary.reduce(
    (sum: number, item: any) => sum + item.totalProducts,
    0,
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Group</th>
                  <th className="text-left p-2">Total Sales</th>
                  <th className="text-left p-2">Total Profit</th>
                  <th className="text-left p-2">Orders</th>
                  <th className="text-left p-2">Products</th>
                  <th className="text-left p-2">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((item: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item._id || 'All'}</td>
                    <td className="p-2">${item.totalSales.toFixed(2)}</td>
                    <td className="p-2">${item.totalProfit.toFixed(2)}</td>
                    <td className="p-2">{item.totalOrders}</td>
                    <td className="p-2">{item.totalProducts}</td>
                    <td className="p-2">${item.averageSellPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
