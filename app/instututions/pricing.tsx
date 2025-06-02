import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const capacities = [50, 100, 250, 500, 750, 1000, "More"] as const;
type Capacity = typeof capacities[number];

type Plan = "Lite" | "Plus" | "Pro";

const plans: { key: Plan; name: string; color: string }[] = [
  { key: "Lite", name: "Lite", color: "border-green-300" },
  { key: "Plus", name: "Plus", color: "border-green-500" },
  { key: "Pro", name: "Pro", color: "border-green-700" },
];

const pricing: Record<Capacity, Record<Plan, number>> = {
  50: { Lite: 12500, Plus: 20000, Pro: 35000 },
  100: { Lite: 15000, Plus: 25000, Pro: 40000 },
  250: { Lite: 20000, Plus: 30000, Pro: 50000 },
  500: { Lite: 30000, Plus: 40000, Pro: 60000 },
  750: { Lite: 40000, Plus: 50000, Pro: 70000 },
  1000: { Lite: 50000, Plus: 60000, Pro: 80000 },
  More: { Lite: 0, Plus: 0, Pro: 0 }, // Contact us
};

const featureGroups = [
  {
    group: "Available accounts",
    features: [
      { name: "Management accounts", values: [true, true, true] },
      { name: "Teachers accounts", values: [true, true, true] },
      { name: "Employee accounts", values: [false, true, true] },
      { name: "Student accounts", values: [false, false, true] },
      { name: "Parents accounts", values: [false, false, true] },
    ],
  },
  {
    group: "Administrative system services",
    features: [
      { name: "Student Management", values: [true, true, true] },
      { name: "Level and Department Management", values: [true, true, true] },
      { name: "Teacher Management", values: [true, true, true] },
      { name: "Staff Management", values: [false, true, true] },
      { name: "Schedule Management", values: [false, true, true] },
      { name: "School Calendar", values: [false, true, true] },
      { name: "User Cards", values: [false, true, true] },
      { name: "Parent Management", values: [false, false, true] },
    ],
  },
  {
    group: "Educational system services",
    features: [
      { name: "Attendance Management", values: [true, true, true] },
      { name: "Student Grades", values: [false, true, true] },
      { name: "Digital Library", values: [false, true, true] },
      { name: "Homework Management", values: [false, true, true] },
      { name: "E-Learning", values: [false, true, true] },
      { name: "Electronic Exams", values: [false, true, true] },
      { name: "Question Bank", values: [false, true, true] },
      { name: "Incentive System", values: [false, false, true] },
    ],
  },
  {
    group: "Financial system and accounts services",
    features: [
      { name: "Tuition Fees", values: [true, true, true] },
      { name: "Employee Salaries", values: [true, true, true] },
      { name: "Revenues and Expenses", values: [true, true, true] },
      { name: "Financial Reports", values: [true, true, true] },
      { name: "Online Payment", values: [false, true, true] },
    ],
  },
  {
    group: "Communication tools",
    features: [
      { name: "Diaries", values: [false, true, true] },
      { name: "Stories", values: [false, true, true] },
      { name: "Alerts", values: [false, true, true] },
      { name: "Leave Requests", values: [false, true, true] },
    ],
  },
  {
    group: "General features",
    features: [
      { name: "Smartphone application", values: [false, true, true] },
      { name: "Add-ons", values: [false, true, true] },
    ],
  },
  {
    group: "Human resources system services",
    features: [
      { name: "Personnel", values: [false, true, true] },
      { name: "Attendance and Departure", values: [false, true, true] },
      { name: "Contracts", values: [false, true, true] },
      { name: "Vacations", values: [false, true, true] },
      { name: "An account for each employee", values: [false, true, true] },
      { name: "Staff reports", values: [false, true, true] },
    ],
  },
  {
    group: "Technical services",
    features: [
      { name: "Technical Support", values: [true, true, true] },
      { name: "Multi-language Support", values: [false, true, true] },
      { name: "Access Control", values: [false, true, true] },
      { name: "Printing Lists", values: [true, true, true] },
      { name: "Data Import", values: [true, true, true] },
      { name: "Updates", values: [true, true, true] },
      { name: "Training and Development", values: [false, false, true] },
    ],
  },
  {
    group: "Diverse services",
    features: [
      { name: "Food Program", values: [false, true, true] },
    ],
  },
  {
    group: "Library",
    features: [],
  },
  {
    group: "Educational content",
    features: [],
  },
];

export default function InstitutionsPricingPage() {
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity>(50);

  const priceFor = (plan: Plan) => {
    const price = pricing[selectedCapacity][plan];
    if (selectedCapacity === "More" || price === 0) return "Contact us";
    return `${price.toLocaleString()} دج`;
  };

  return (
    <div className="container mx-auto py-12 px-2 md:px-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-2">Institution Pricing Plans</h1>
      <p className="text-center text-gray-600 mb-8">Choose the best plan for your school. Pricing is based on the number of students.</p>

      {/* Capacity Selector */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex gap-2 md:gap-4 items-center">
          {capacities.map((cap) => (
            <button
              key={cap}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                selectedCapacity === cap
                  ? "bg-green-600 text-white shadow"
                  : "bg-green-50 text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => setSelectedCapacity(cap)}
            >
              {cap === "More" ? "More" : cap}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 mt-2">How many students does your school have?</span>
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-green-100 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-50">
              <th className="w-56 py-4 px-2 text-left font-bold text-green-700">Package</th>
              {plans.map((plan) => (
                <th
                  key={plan.key}
                  className={`py-4 px-4 text-center font-bold text-green-700 border-l ${plan.color}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>{plan.name}</span>
                    <div className="text-xl font-extrabold">{priceFor(plan.key)}</div>
                    <Button
                      className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-4 py-2"
                      size="sm"
                    >
                      CHOOSE PLAN
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureGroups.map((group, i) => (
              <>
                {group.features.length > 0 && (
                  <tr key={group.group + "-header"} className="bg-green-50">
                    <td colSpan={4} className="py-2 px-2 font-semibold text-green-700 border-t border-green-100">
                      {group.group}
                    </td>
                  </tr>
                )}
                {group.features.map((feature, j) => (
                  <tr key={feature.name} className="border-t border-green-50 hover:bg-green-50/50">
                    <td className="py-2 px-2 text-gray-700">{feature.name}</td>
                    {feature.values.map((val, idx) => (
                      <td key={idx} className="text-center">
                        {val ? (
                          <Check className="inline text-green-600" />
                        ) : (
                          <X className="inline text-red-400" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 