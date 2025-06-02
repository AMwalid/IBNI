"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Share2, Printer } from "lucide-react";
import { useRouter } from 'next/navigation';

interface BackpackItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ChildInfo {
  name: string;
  grade: string;
}

interface Backpack {
  id: string;
  childInfo: ChildInfo;
  items: {
    uniform: BackpackItem[];
    backpack: BackpackItem[];
    stationery: BackpackItem[];
    books: BackpackItem[];
    creative: BackpackItem[];
    tech: BackpackItem[];
  };
  createdAt: string;
}

interface BackpacksListProps {
  onEditBackpack?: (backpack: Backpack) => void;
  onBackpackUpdate?: (backpack: Backpack) => void;
}

export function BackpacksList({ onEditBackpack, onBackpackUpdate }: BackpacksListProps) {
  const [savedBackpacks, setSavedBackpacks] = useState<Backpack[]>([]);
  const [selectedBackpack, setSelectedBackpack] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const router = useRouter();

  const loadBackpacks = () => {
    const saved = localStorage.getItem('savedBackpacks');
    if (saved) {
      setSavedBackpacks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadBackpacks();

    const handleBackpackUpdate = () => {
      loadBackpacks();
    };
    
    window.addEventListener('backpack-updated', handleBackpackUpdate);
    
    return () => {
      window.removeEventListener('backpack-updated', handleBackpackUpdate);
    };
  }, []);

  const handleEditName = (id: string, currentName: string) => {
    setEditingName(id);
    setNewName(currentName);
  };

  const handleSaveName = (id: string) => {
    const updatedBackpacks = savedBackpacks.map(backpack => {
      if (backpack.id === id) {
        const updatedBackpack = {
          ...backpack,
          childInfo: {
            ...backpack.childInfo,
            name: newName
          }
        };
        if (onBackpackUpdate) {
          onBackpackUpdate(updatedBackpack);
        }
        return updatedBackpack;
      }
      return backpack;
    });
    setSavedBackpacks(updatedBackpacks);
    localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks));
    setEditingName(null);
    
    // Dispatch event to notify parent component
    window.dispatchEvent(new Event('backpack-updated'));
  };

  const handleItemQuantityChange = (backpackId: string, category: keyof Backpack['items'], itemId: string, newQuantity: number) => {
    const updatedBackpacks = savedBackpacks.map(backpack => {
      if (backpack.id === backpackId) {
        const updatedItems = {
          ...backpack.items,
          [category]: backpack.items[category].map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        };
        const updatedBackpack = {
          ...backpack,
          items: updatedItems
        };
        if (onBackpackUpdate) {
          onBackpackUpdate(updatedBackpack);
        }
        return updatedBackpack;
      }
      return backpack;
    });
    setSavedBackpacks(updatedBackpacks);
    localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks));
    
    // Dispatch event to notify parent component
    window.dispatchEvent(new Event('backpack-updated'));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this backpack?')) {
      const updatedBackpacks = savedBackpacks.filter(backpack => backpack.id !== id);
      setSavedBackpacks(updatedBackpacks);
      localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks));
      
      // Dispatch event to notify parent component
      window.dispatchEvent(new Event('backpack-updated'));
    }
  };

  const handleEdit = (backpack: Backpack) => {
    if (onEditBackpack) {
      onEditBackpack(backpack);
    } else {
      router.push(`/backpack-builder?edit=${backpack.id}`);
    }
  };

  const handleShare = async (backpack: Backpack) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${backpack.childInfo.name}'s Backpack`,
          text: `Check out ${backpack.childInfo.name}'s school backpack!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePrint = (backpack: Backpack) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = `
        <html>
          <head>
            <title>${backpack.childInfo.name}'s Backpack</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .item { margin: 10px 0; }
              .total { margin-top: 20px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${backpack.childInfo.name}'s Backpack</h1>
            <h2>Grade: ${backpack.childInfo.grade}</h2>
            <div class="items">
              ${Object.entries(backpack.items).map(([category, items]) => `
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                ${items.map(item => `
                  <div class="item">
                    ${item.name} - Quantity: ${item.quantity} - Price: ${item.price} DZD
                  </div>
                `).join('')}
              `).join('')}
            </div>
            <div class="total">
              Total Items: ${Object.values(backpack.items).reduce((acc, items) => 
                acc + items.reduce((sum, item) => sum + item.quantity, 0), 0
              )}
            </div>
          </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const renderCategoryItems = (category: string, items: BackpackItem[], backpackId: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">
                Price: {item.price} DZD
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleItemQuantityChange(backpackId, category as keyof Backpack['items'], item.id, Math.max(0, item.quantity - 1))}
                  className="h-6 w-6 p-0"
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleItemQuantityChange(backpackId, category as keyof Backpack['items'], item.id, item.quantity + 1)}
                  className="h-6 w-6 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            <p className="text-sm font-medium text-green-600">
              Total: {(item.price * item.quantity).toFixed(2)} DZD
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Add a new function to calculate totals for a single backpack
  const calculateBackpackTotals = (backpack: Backpack) => {
    const allItems = [
      ...(backpack.items.uniform || []),
      ...(backpack.items.backpack || []),
      ...(backpack.items.stationery || []),
      ...(backpack.items.books || []),
      ...(backpack.items.creative || []),
      ...(backpack.items.tech || [])
    ];

    const totalItems = allItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalCost = allItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

    return { totalItems, totalCost };
  };

  if (savedBackpacks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No backpacks saved yet.</p>
        <Button onClick={() => router.push('/backpack-builder')}>
          Create New Backpack
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedBackpacks.map((backpack) => (
        <Card key={backpack.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                {editingName === backpack.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveName(backpack.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{backpack.childInfo.name}'s Backpack</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditName(backpack.id, backpack.childInfo.name)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <p className="text-gray-600">{backpack.childInfo.grade}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(backpack.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(backpack)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(backpack)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePrint(backpack)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Printer className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(backpack.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBackpack(selectedBackpack === backpack.id ? null : backpack.id)}
              className="w-full mb-4"
            >
              {selectedBackpack === backpack.id ? 'Hide Items' : 'Show Items'}
            </Button>

            {selectedBackpack === backpack.id && (
              <div className="space-y-6">
                {backpack.items.uniform.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Uniform Items</h3>
                      {renderCategoryItems("uniform", backpack.items.uniform, backpack.id)}
                    </CardContent>
                  </Card>
                )}
                
                {backpack.items.backpack.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Backpack & Accessories</h3>
                      {renderCategoryItems("backpack", backpack.items.backpack, backpack.id)}
                    </CardContent>
                  </Card>
                )}
                
                {backpack.items.stationery.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Stationery Supplies</h3>
                      {renderCategoryItems("stationery", backpack.items.stationery, backpack.id)}
                    </CardContent>
                  </Card>
                )}
                
                {backpack.items.books.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Books</h3>
                      {renderCategoryItems("books", backpack.items.books, backpack.id)}
                    </CardContent>
                  </Card>
                )}
                
                {backpack.items.creative.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Creative Supplies</h3>
                      {renderCategoryItems("creative", backpack.items.creative, backpack.id)}
                    </CardContent>
                  </Card>
                )}
                
                {backpack.items.tech.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Tech Gear</h3>
                      {renderCategoryItems("tech", backpack.items.tech, backpack.id)}
                    </CardContent>
                  </Card>
                )}

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Backpack Summary</h4>
                  <div className="space-y-2">
                    {(() => {
                      const { totalItems, totalCost } = calculateBackpackTotals(backpack);
                      return (
                        <>
                          <div className="flex justify-between">
                            <span>Total Items:</span>
                            <span className="font-medium">{totalItems}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Cost:</span>
                            <span className="font-medium text-green-600">
                              {totalCost.toFixed(2)} DZD
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 