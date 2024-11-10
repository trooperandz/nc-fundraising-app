// Root route displaying contribution options
import * as React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
// @ts-expect-error
import whiskeyGirlImage from '../images/whisky-girl.jpg'; // TODO: reduce image size
import { Link, useLocation, useNavigate } from '@remix-run/react';
import { classNames } from '../utils';
import FooterCart from './FooterCart';

interface Props {}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Donate Money', href: '/donate-financial' },
  { name: 'Donate Material', href: '/donate-material' },
  { name: 'About', href: '/about' },
];

const userNavigation = [
  // { name: 'Account', href: '/profile' },
  // { name: 'Settings', href: '#' },
  // { name: 'Sign out', href: '#' },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="relative min-h-full wallpaper-background"
        style={{ paddingBottom: '70px' }}
      >
        <FooterCart />
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center">
                    <div
                      onClick={() => navigate('/')}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      <img
                        alt="Whisky Girl Image"
                        src={whiskeyGirlImage}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map(item => {
                          const isRouteActive = item.href === location.pathname;

                          return (
                            <div
                              key={item.name}
                              className={classNames(
                                'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                                isRouteActive
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                            >
                              <Link
                                key={item.name}
                                to={item.href}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  backgroundColor: 'inherit',
                                }}
                              >
                                {item.name}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        onClick={() => navigate('/checkout-review')}
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View cart</span>
                        <ShoppingCartIcon
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        {/* <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon
                              width={26}
                              height={26}
                              fontSize={26}
                              className="text-gray-400 hover:text-white"
                            />
                          </MenuButton>
                        </div> */}
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {/* TODO: only show this if user is administrator? */}
                          {/* {userNavigation.map(item => (
                            <MenuItem key={item.name}>
                              <a
                                // href={item.href}
                                onClick={() => navigate(item.href)}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                              >
                                {item.name}
                              </a>
                            </MenuItem>
                          ))} */}
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon
                        aria-hidden="true"
                        className="block h-6 w-6 group-data-[open]:hidden"
                      />
                      <XMarkIcon
                        aria-hidden="true"
                        className="hidden h-6 w-6 group-data-[open]:block"
                      />
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="border-b border-gray-700 md:hidden">
              <div className="space-y-1 px-2 py-3 sm:px-3">
                {navigation.map(item => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div
                    onClick={() => navigate('/checkout-review')}
                    className="flex w-full text-base font-medium leading-none text-gray-400 cursor-pointer"
                  >
                    Cart
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {/* {user.name} */}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {/* {user.email} */}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                {/* <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map(item => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div> */}
              </div>
            </DisclosurePanel>
          </Disclosure>
          <header className="py-10">
            <div className="flex justify-center md:justify-between w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="font-bold tracking-tight text-white">
                Help Rebuild Hot Springs
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
