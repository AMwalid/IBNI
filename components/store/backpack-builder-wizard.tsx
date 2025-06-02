import { GraduationCap, BookText, Shirt, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackpackItem } from "@/types"

type BackpackBuilderWizardProps = {
  backpackStep: number
  setBackpackStep: (step: number) => void
  backpackItems: BackpackItem[]
  addToBackpack: (productId: string) => void
  removeFromBackpack: (productId: string) => void
  gradeLevel: string
  setGradeLevel: (level: string) => void
  needs: string[]
  setNeeds: (needs: string[]) => void
  products: any[]
}

export function BackpackBuilderWizard({
  backpackStep,
  setBackpackStep,
  backpackItems,
  addToBackpack,
  removeFromBackpack,
  gradeLevel,
  setGradeLevel,
  needs,
  setNeeds,
  products,
}: BackpackBuilderWizardProps) {
  const gradeLevels = [
    'Kindergarten',
    'Elementary (1-5)',
    'Middle School (6-8)',
    'High School (9-12)',
    'College',
  ]

  const commonNeeds = [
    'Notebooks',
    'Pens & Pencils',
    'Binders',
    'Art Supplies',
    'Calculators',
    'Textbooks',
    'Uniforms',
  ]

  return (
    <div className="bg-white rounded-lg border p-6 mb-8">
      <h2 className="text-xl font-semibold mb-2">Build Your School Backpack</h2>
      <p className="text-gray-600 mb-6">
        Create a customized school supply kit based on grade level and needs. We'll help you select the right
        items.
      </p>

      {backpackStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Grade Level</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gradeLevels.map((level) => (
                <Button
                  key={level}
                  variant={gradeLevel === level ? 'default' : 'outline'}
                  onClick={() => setGradeLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">What do you need?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonNeeds.map((need) => (
                <Button
                  key={need}
                  variant={needs.includes(need) ? 'default' : 'outline'}
                  onClick={() =>
                    setNeeds(
                      needs.includes(need)
                        ? needs.filter((n) => n !== need)
                        : [...needs, need]
                    )
                  }
                >
                  {need}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setBackpackStep(2)}
              disabled={!gradeLevel || needs.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {backpackStep === 2 && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="font-medium text-lg">
                <GraduationCap className="inline h-5 w-5 mr-2" />
                {gradeLevel} Essentials
              </h3>
              <p className="text-sm text-gray-500">
                Selected needs: {needs.join(', ')}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setBackpackStep(1)}
              className="mt-2 md:mt-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(
                (product) =>
                  product.audience.includes('students') &&
                  needs.some((need) =>
                    product.name.toLowerCase().includes(need.toLowerCase())
                  )
              )
              .slice(0, 6)
              .map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToBackpack(product.id)}
                    disabled={backpackItems.some(
                      (item) => item.product.id === product.id
                    )}
                  >
                    Add
                  </Button>
                </div>
              ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setBackpackStep(3)}>Next</Button>
          </div>
        </div>
      )}

      {backpackStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="font-medium text-lg">Your Backpack Items</h3>
                <p className="text-sm text-gray-500">
                  {backpackItems.length} items selected
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setBackpackStep(2)}
                className="mt-2 md:mt-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="space-y-4">
              {backpackItems.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <BookText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No items in your backpack yet</p>
                </div>
              ) : (
                backpackItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product.image || '/placeholder.svg'}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromBackpack(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg border p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Backpack Summary</h3>

              {backpackItems.length === 0 ? (
                <p className="text-gray-500">No items added yet</p>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {backpackItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-sm">{item.product.name}</span>
                        <span className="text-sm font-medium">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium mb-4">
                      <span>Total</span>
                      <span>
                        $
                        {backpackItems
                          .reduce(
                            (total, item) => total + item.product.price,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
