import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NotionConnection from "./NotionConnection"

const SettingsPage = () => {
  return (
    <div>
      {/* Notion Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="">Notion Integration</CardTitle>
          <CardDescription>Manage your Notion connection and sync settings</CardDescription>
        </CardHeader>

        <CardContent>
          <NotionConnection />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage