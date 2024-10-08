import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
};

export default function CookiesPage() {

  const cookieStore = cookies()
  const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1')


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  );
}