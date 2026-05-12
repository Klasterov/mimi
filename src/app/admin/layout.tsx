import "@/admin-app/App.css"
import "@/admin-app/pages/Dashboard.css"
import "@/admin-app/pages/LoginPage.css"
import "@/admin-app/components/ArticleForm.css"
import "@/admin-app/components/CrudTable.css"
import "@/admin-app/components/AdminsTab.css"
import "@/admin-app/components/DetectorForm.css"
import "@/admin-app/components/ExportTab.css"
import "@/admin-app/components/LeadsTab.css"
import "@/admin-app/components/ProjectForm.css"
import "@/admin-app/components/SensorForm.css"
import "@/admin-app/components/StatsTab.css"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
