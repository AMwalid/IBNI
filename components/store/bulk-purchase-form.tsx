import { Building, School, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BulkItem } from "@/types"

type BulkPurchaseFormProps = {
  bulkItems: BulkItem[]
  addBulkItem: (productId: string, quantity: number) => void
  removeBulkItem: (productId: string) => void
  updateBulkItemQuantity: (productId: string, quantity: number) => void
  institutionType: string
  setInstitutionType: (type: string) => void
  contactName: string
  setContactName: (name: string) => void
  contactEmail: string
  setContactEmail: (email: string) => void
  contactPhone: string
  setContactPhone: (phone: string) => void
  notes: string
  setNotes: (notes: string) => void
  onSubmit: () => void
}

export function BulkPurchaseForm({
  bulkItems,
  addBulkItem,
  removeBulkItem,
  updateBulkItemQuantity,
  institutionType,
  setInstitutionType,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  notes,
  setNotes,
  onSubmit,
}: BulkPurchaseFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bulk Purchase for Institutions</h2>
          <p className="text-gray-600 mb-6">
            Looking to purchase supplies for your school or organization? Fill out this form and
            we'll get back to you with a quote and special pricing.
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="institution-type">Institution Type</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button
                  variant={institutionType === 'school' ? 'default' : 'outline'}
                  onClick={() => setInstitutionType('school')}
                >
                  <School className="h-4 w-4 mr-2" />
                  School
                </Button>
                <Button
                  variant={institutionType === 'business' ? 'default' : 'outline'}
                  onClick={() => setInstitutionType('business')}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Business
                </Button>
                <Button
                  variant={institutionType === 'other' ? 'default' : 'outline'}
                  onClick={() => setInstitutionType('other')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Other
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input
                  id="contact-name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-24">
          <h3 className="font-semibold mb-4">Your Bulk Order</h3>

          {bulkItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No items added yet</p>
          ) : (
            <div className="space-y-4">
              {bulkItems.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBulkItem(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium mb-4">
                  <span>Subtotal</span>
                  <span>
                    $
                    {bulkItems
                      .reduce(
                        (total, item) => total + item.product.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <Button className="w-full" onClick={onSubmit}>
                  Request Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
