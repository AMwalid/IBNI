import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComparePage from "@/components/pages/compare-page"

export default function Compare() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <ComparePage />
      </TabsContent>
    </Tabs>
  )
}
