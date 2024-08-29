'use client'

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {

  const router = useRouter()
  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className={`
      flex justify-around w-full rounded-xl bg-gray-200 p-2
    `}>
      {
        tabOptions.map(tab => (
          <div className="m-auto w-full" key={tab}>
            <input
              checked={selected === tab}
              // onchage for the error of react
              onChange={() => {}}
              type="radio"
              id={tab.toString()}
              className="peer hidden" />
            <label
              onClick={() => onTabSelected(tab)}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>
        ))
      }
    </div>
  )
}
