import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { SidebarItem } from './';
import { LogoutButton } from './LogoutButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const menuItems = [
  {
    icon: <IoCalendarOutline size={25}/>,
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline size={25}/>,
    title: 'Rest TODOS',
    href: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline size={25}/>,
    title: 'Server Actions',
    href: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline size={25}/>,
    title: 'Cookies',
    href: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline size={25}/>,
    title: 'Products',
    href: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline size={25}/>,
    title: 'Perfil',
    href: '/dashboard/profile'
  },
]

export const Sidebar = async() => {
  const session = await getServerSession(authOptions)

  const avatarUrl = (session?.user?.image)
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"

  const userName = session?.user?.name ?? 'No name'
  const userRoles = session?.user?.roles ?? ['client']

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={128}
              height={128}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            width={128}
            height={128}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItems.map((item) => (
              <SidebarItem key={item.title} {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton/>
      </div>
    </aside>
  )
}
