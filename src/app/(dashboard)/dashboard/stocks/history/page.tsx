/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  useGetProductStockHistoryQuery,
  useGetAllProductsQuery,
} from '@/redux/features/dashboard/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
} from 'lucide-react';

export default function StockHistory() {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const { data: productsData } = useGetAllProductsQuery({});
  const { data: historyData, isLoading } = useGetProductStockHistoryQuery(
    selectedProductId,
    { skip: !selectedProductId },
  );

  const selectedProduct = productsData?.data?.find(
    (p: any) => p._id === selectedProductId,
  );

  const stockHistory = Array.isArray(historyData)
    ? historyData
    : (historyData?.data ?? []);

  return (
    <div className="shadow-md pt-5 px-5 rounded-md">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Stock <span className="text-orange-600">History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <Package className="w-3 h-3 text-orange-600" />
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Select Product
              </label>
            </div>
            <Select
              onValueChange={setSelectedProductId}
              value={selectedProductId}
            >
              <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                <SelectValue placeholder="Choose a product to view stock history" />
              </SelectTrigger>
              <SelectContent>
                {productsData?.data?.map((product: any) => (
                  <SelectItem key={product._id} value={product._id}>
                    {product.name} (Current Stock: {product.totalStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Current Stock Summary */}
          {selectedProduct && (
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Product
                    </div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                      {selectedProduct.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Current Stock
                    </div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                      {selectedProduct.totalStock} units
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Category
                    </div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                      {selectedProduct.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Status
                    </div>
                    <Badge
                      variant={
                        selectedProduct.isActive ? 'default' : 'secondary'
                      }
                    >
                      {selectedProduct.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stock History Table */}
          {selectedProductId && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Stock Movement History
              </h3>
              {isLoading ? (
                <div className="text-center py-8">Loading stock history...</div>
              ) : stockHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Operation</th>
                        <th className="text-left p-3">Quantity</th>
                        <th className="text-left p-3">Purchase Price</th>
                        <th className="text-left p-3">Remaining Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockHistory.map((entry: any, index: number) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              {new Date(
                                entry.purchaseDate,
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                entry.quantity > 0 ? 'default' : 'destructive'
                              }
                            >
                              <div className="flex items-center gap-1">
                                {entry.quantity > 0 ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                {entry.quantity > 0 ? 'Stock In' : 'Stock Out'}
                              </div>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span
                              className={`font-medium ${
                                entry.quantity > 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {entry.quantity > 0 ? '+' : ''}
                              {entry.quantity}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />$
                              {entry.purchasePrice.toFixed(2)}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="font-medium">
                              {entry.remainingQuantity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No stock history found for this product.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
