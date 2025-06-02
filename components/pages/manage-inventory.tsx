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
  Package,
  DollarSign,
  AlertTriangle,
  ShoppingBag,
  Edit,
  Trash,
  Eye,
  BarChart
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ManageInventory() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Science Lab Equipment",
      category: "Laboratory",
      quantity: 50,
      minQuantity: 20,
      price: 299,
      inStore: true,
      status: "in-stock"
    },
    {
      id: 2,
      name: "School Uniforms",
      category: "Clothing",
      quantity: 15,
      minQuantity: 30,
      price: 45,
      inStore: true,
      status: "low-stock"
    },
    {
      id: 3,
      name: "Textbooks",
      category: "Books",
      quantity: 200,
      minQuantity: 50,
      price: 79,
      inStore: true,
      status: "in-stock"
    }
  ])

  const getStockStatus = (item: any) => {
    if (item.quantity === 0) return "out-of-stock"
    if (item.quantity <= item.minQuantity) return "low-stock"
    return "in-stock"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockPercentage = (quantity: number, minQuantity: number) => {
    const target = minQuantity * 2
    return Math.min(Math.round((quantity / target) * 100), 100)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Inventory Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">265</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">$45,250</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Store Listed</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Inventory Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Store</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.quantity} units</span>
                        <span className="text-gray-500">Min: {item.minQuantity}</span>
                      </div>
                      <Progress
                        value={getStockPercentage(item.quantity, item.minQuantity)}
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(getStockStatus(item))}>
                      {getStockStatus(item)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.inStore ? "default" : "outline"}>
                      {item.inStore ? "Listed" : "Not Listed"}
                    </Badge>
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
      </div>
    </Card>
  )
}
