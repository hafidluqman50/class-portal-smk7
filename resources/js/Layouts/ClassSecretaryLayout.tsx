import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, router } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Toaster } from "@/Components/ui/toaster"

import { logoPng } from '@/lib/assets'

export default function Authenticated({ user, header, routeParent = null, routeChild = null, children }: PropsWithChildren<{ 
    // user: User, 
    user?: {
      name:string,
      email:string
    } | null | undefined,
    header?: ReactNode, 
    routeParent?:string|null, 
    routeChild?:string|null 
}>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-between">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src={logoPng} width={65} height={65} />
                                </Link>
                            </div>

                            <div className="hidden space-x-4 sm:-my-px sm:ms-10 lg:flex">
                                <NavLink href={route('class-secretary.dashboard.main')} active={route().current('class-secretary.dashboard.main')}>
                                    Dashboard
                                </NavLink>
                                {/* <NavLink href='#' active={routeParent == 'data-master'}>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger>
                                        Menu
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                          <DropdownMenuItem>
                                            <NavLink href={'#'} active={routeChild == 'data-dokter'}>
                                                Menu 1
                                            </NavLink>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <NavLink href={'#'} active={routeChild == 'data-tindakan-lab'}>
                                                Menu 2
                                            </NavLink>
                                          </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavLink> */}
                                <NavLink href={route('class-secretary.journal.main')} active={ route().current('class-secretary.journal.main') }>
                                  Data Jurnal
                                </NavLink>
                                <NavLink href={route('class-secretary.attendances.main')} active={ route().current('class-secretary.attendances.main')}>
                                  Data Presensi
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden lg:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        {/* <Dropdown.Link onClick={() => {
                                          localStorage.removeItem('auth_token')
                                        }} href={route('login')}>
                                            Log Out
                                        </Dropdown.Link> */}
                                        <Button variant="ghost" onClick={() => {
                                          localStorage.removeItem('auth_token')
                                          
                                          router.get('/')
                                        }}>
                                          Log out
                                        </Button>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('administrator.dashboard')} active={route().current('administrator.dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user?.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="mb-auto">{children}</main>
            <Toaster />
            <footer className="bg-white p-5">
                <p className="text-center font-medium">
                    &copy; Copyright RPL Programmer Team - {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}
