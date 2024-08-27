'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  title: string
  href: string
  icon: React.ReactNode
}

export const SidebarItem = ({ title, href, icon }: Props) => {
  const pathname = usePathname()
  return (
    <li>
      <Link
        href={href}
        className={`relative px-4 py-3 flex items-center space-x-4 hover:bg-sky-500 hover:text-white
        ${pathname === href
            ? 'rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : 'rounded-md text-gray-600 group'
          }`}>
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}
