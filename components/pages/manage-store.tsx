"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Archive,
  Package,
  BookOpen,
  BarChart
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ManageStore() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Advanced Mathematics Course",
      type: "Course",
      price: 299,
      sales: 45,
      revenue: 13455,
      status: "active",
      trending: true
    },
    {
      id: 2,
      name: "Science Lab Equipment Kit",
      type: "Inventory",
      price: 199,
      sales: 28,
      revenue: 5572,
      status: "active",
      trending: false
    },
    {
      id: 3,
      name: "English Literature Course",
      type: "Course",
      price: 249,
      sales: 32,
      revenue: 7968,
      status: "draft",
      trending: false
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Store Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$45,250</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold">892</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-2xl font-bold">+24%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Store Products Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trending</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {product.type === "Course" ? (
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Package className="w-4 h-4 text-purple-600" />
                      )}
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${product.revenue}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.trending && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Trending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BarChart className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {products
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 3)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.type === "Course" ? (
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Package className="w-4 h-4 text-purple-600" />
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <Progress value={Math.min((product.sales / 50) * 100, 100)} className="w-24 h-2" />
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Courses</span>
                  <span className="text-sm text-gray-600">$21,423</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Inventory Items</span>
                  <span className="text-sm text-gray-600">$15,827</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Digital Resources</span>
                  <span className="text-sm text-gray-600">$8,000</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
