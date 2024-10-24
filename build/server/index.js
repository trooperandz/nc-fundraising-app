import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, Scripts, useNavigate, Link, useLoaderData, json as json$1 } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ShoppingCartIcon, UserCircleIcon, Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { ShareIcon, CurrencyDollarIcon as CurrencyDollarIcon$1, WrenchScrewdriverIcon as WrenchScrewdriverIcon$1 } from "@heroicons/react/24/solid";
import axios from "axios";
import { CurrencyDollarIcon, WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const tailwindStyles = "/assets/tailwind-keDF0F0C.css";
const appStyles = "/assets/index-DlNE2eFy.css";
const AppContext = React.createContext(void 0);
const AppProvider = ({ children }) => {
  const [user2, setUser] = React.useState();
  const [materialDonations, setMaterialDonations] = React.useState({});
  const [presetDonation, setPresetDonation] = React.useState();
  const [registerUser, setRegisterUser] = React.useState({
    name: "",
    email: "",
    phone: ""
  });
  const [customDonation, setCustomDonation] = React.useState();
  const materialDonationsTotalCost = React.useMemo(() => {
    return Object.keys(materialDonations).reduce((acc, id) => {
      const donation = materialDonations[id];
      acc += Number(donation.price * donation.quantity);
      return acc;
    }, 0);
  }, [materialDonations]);
  return /* @__PURE__ */ jsx(
    AppContext.Provider,
    {
      value: {
        customDonation,
        donationDollarTotal: (Number(customDonation || presetDonation) + materialDonationsTotalCost).toFixed(2),
        materialDonations,
        materialDonationsTotalCost,
        presetDonation,
        registerUser,
        setCustomDonation,
        setMaterialDonations,
        setPresetDonation,
        setRegisterUser,
        user: user2,
        setUser
      },
      children
    }
  );
};
const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
const links$3 = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: appStyles }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { className: "h-full bg-gray-100", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx("body", { className: "h-full", children: /* @__PURE__ */ jsxs(AppProvider, { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] }) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links: links$3
}, Symbol.toStringTag, { value: "Module" }));
const whiskeyGirlImage = "/assets/whisky-girl-DeFry83y.jpg";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const navigation = [
  { name: "Donate", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Projects", href: "/projects", current: false }
];
const userNavigation = [
  { name: "Your Account", href: "/profile" },
  // { name: 'Settings', href: '#' },
  { name: "Sign out", href: "#" }
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Layout({ children }) {
  const [showWhiskey, setShowWhisky] = React.useState(true);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `min-h-full ${showWhiskey ? "test-div" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 pb-32", children: [
      /* @__PURE__ */ jsxs(Disclosure, { as: "nav", className: "bg-gray-800", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "border-b border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between px-4 sm:px-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
              "img",
              {
                alt: "Whisky Girl Image",
                src: whiskeyGirlImage,
                className: "h-10 w-10 rounded-full"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "ml-10 flex items-baseline space-x-4", children: navigation.map((item) => /* @__PURE__ */ jsx(
              "a",
              {
                className: classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                  // item.current
                  //   ? 'bg-gray-900 text-white'
                  //   : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  // 'rounded-md px-3 py-2 text-sm font-medium',
                ),
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: item.href,
                    style: {
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "inherit"
                    },
                    children: item.name
                  },
                  item.name
                )
              }
            )) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "ml-4 flex items-center md:ml-6", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("/cart"),
                className: "relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View cart" }),
                  /* @__PURE__ */ jsx(
                    ShoppingCartIcon,
                    {
                      "aria-hidden": "true",
                      className: "h-6 w-6"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative ml-3", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(MenuButton, { className: "relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open user menu" }),
                /* @__PURE__ */ jsx(
                  UserCircleIcon,
                  {
                    width: 26,
                    height: 26,
                    fontSize: 26,
                    className: "text-gray-400 hover:text-white"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(
                MenuItems,
                {
                  transition: true,
                  className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in",
                  children: userNavigation.map((item) => /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      onClick: () => navigate(item.href),
                      className: "block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100",
                      children: item.name
                    }
                  ) }, item.name))
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "-mr-2 flex md:hidden", children: /* @__PURE__ */ jsxs(DisclosureButton, { className: "group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
            /* @__PURE__ */ jsx(
              Bars3Icon,
              {
                "aria-hidden": "true",
                className: "block h-6 w-6 group-data-[open]:hidden"
              }
            ),
            /* @__PURE__ */ jsx(
              XMarkIcon,
              {
                "aria-hidden": "true",
                className: "hidden h-6 w-6 group-data-[open]:block"
              }
            )
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsxs(DisclosurePanel, { className: "border-b border-gray-700 md:hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-1 px-2 py-3 sm:px-3", children: navigation.map((item) => /* @__PURE__ */ jsx(
            DisclosureButton,
            {
              as: "a",
              href: item.href,
              "aria-current": item.current ? "page" : void 0,
              className: classNames(
                item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              ),
              children: item.name
            },
            item.name
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-700 pb-3 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center px-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  alt: "",
                  src: user.imageUrl,
                  className: "h-10 w-10 rounded-full"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-medium leading-none text-white", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-none text-gray-400", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View notifications" }),
                    /* @__PURE__ */ jsx(BellIcon, { "aria-hidden": "true", className: "h-6 w-6" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-1 px-2", children: userNavigation.map((item) => /* @__PURE__ */ jsx(
              DisclosureButton,
              {
                as: "a",
                href: item.href,
                className: "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white",
                children: item.name
              },
              item.name
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("header", { className: "py-10", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("h1", { className: "flex text-3xl font-bold tracking-tight text-white justify-between", children: [
        "Help Rebuild The Whisky Girl",
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-sm self-end text-indigo-400 cursor-pointer",
            onClick: () => setShowWhisky(!showWhiskey),
            children: showWhiskey ? "Hide Whisky" : "Show Whisky"
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "-mt-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-white px-5 py-6 shadow sm:px-6", children }) }) })
  ] }) });
}
function CheckoutConfirmation() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-8", children: "Thank you for helping to rebuild Hot Springs!" }),
    /* @__PURE__ */ jsx("p", { className: "mb-8", children: "A confirmation email has been sent to..." }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center cursor-pointer", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-gray-100", children: /* @__PURE__ */ jsx(
        ShareIcon,
        {
          width: 24,
          height: 24,
          className: "text-orange-400 mr-1"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 ml-2 ", children: "Please spread the word and let others know about your donation!" })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: `/`, className: "text-blue-600 underline mt-6", children: "Back to home" })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CheckoutConfirmation
}, Symbol.toStringTag, { value: "Module" }));
const nameRegex = /^[A-Za-z\s]*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
function ContactInformation() {
  const { registerUser, setRegisterUser } = useAppContext();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: ""
  });
  console.log({ errors });
  const handleChangeText = (value, key) => {
    let updatedErrors = { ...errors };
    switch (key) {
      case "name":
        if (nameRegex.test(value)) {
          setRegisterUser({ ...registerUser, [key]: value });
          updatedErrors.name = "";
        }
        break;
      case "email":
        setRegisterUser({ ...registerUser, [key]: value });
        updatedErrors.email = "";
        break;
      case "phone":
        let sanitizedValue = value.replace(/[^0-9-]/g, "");
        setRegisterUser({ ...registerUser, [key]: sanitizedValue });
        updatedErrors.phone = "";
        break;
    }
    setErrors(updatedErrors);
  };
  const handleSubmit = () => {
    let newErrors = {
      name: "",
      email: "",
      phone: ""
    };
    if (!registerUser.name || !nameRegex.test(registerUser.name)) {
      newErrors.name = "Please enter a valid name";
    }
    if (!registerUser.email || !emailRegex.test(registerUser.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!registerUser.phone || !phoneRegex.test(registerUser.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      navigate("/checkout-review");
    }
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h2", { children: "Your Contact Information" }),
    /* @__PURE__ */ jsxs("div", { style: { width: "450px" }, children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "name",
          className: "block text-sm font-medium leading-6 mt-6 text-gray-900",
          children: "Name"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "name",
            name: "name",
            type: "text",
            placeholder: "John Doe",
            onChange: (e) => handleChangeText(e.target.value, "name"),
            value: registerUser == null ? void 0 : registerUser.name,
            className: "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
        ),
        errors.name && /* @__PURE__ */ jsx("small", { className: "text-red-700", children: errors.name })
      ] }),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium leading-6 mt-3 text-gray-900",
          children: "Email"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "you@example.com",
            onChange: (e) => handleChangeText(e.target.value, "email"),
            value: registerUser == null ? void 0 : registerUser.email,
            className: "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
        ),
        errors.email && /* @__PURE__ */ jsx("small", { className: "text-red-700", children: errors.email })
      ] }),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "phone",
          className: "block text-sm font-medium leading-6 mt-3 text-gray-900",
          children: "Phone"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "phone",
            name: "phone",
            type: "tel",
            placeholder: "5555555555",
            onChange: (e) => handleChangeText(e.target.value, "phone"),
            value: registerUser == null ? void 0 : registerUser.phone,
            className: "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
        ),
        errors.phone && /* @__PURE__ */ jsx("small", { className: "text-red-700", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSubmit,
          type: "button",
          className: "rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
          children: "Proceed to Checkout"
        }
      )
    ] })
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactInformation
}, Symbol.toStringTag, { value: "Module" }));
const donationApi = axios.create({
  // baseURL: Config.ITINERARIES_API_BASE_URL,
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:3W91JFSj"
});
const donationAmounts = ["25", "50", "100", "150", "200", "250"];
const loader$1 = async ({ params }) => {
  try {
    const response = await donationApi.get("/tools_materials_inventory");
    return json(response.data);
  } catch (error) {
    throw new Response("Failed to load materials", { status: 500 });
  }
};
function DonateFinancial() {
  const {
    customDonation,
    setCustomDonation,
    presetDonation,
    setPresetDonation
  } = useAppContext();
  console.log({ customDonation });
  const handleInputChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    if (/^\d*\.?\d{0,2}$/.test(sanitizedValue)) {
      setPresetDonation(void 0);
      setCustomDonation(sanitizedValue);
    }
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "Make a Financial Donation" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "dollar-input",
          className: "block cursor-pointer mb-3 text-gray-500",
          children: "Select Amount"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-x-6", children: donationAmounts.map((donationAmount) => {
        const isMatchingDonation = presetDonation === donationAmount;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setCustomDonation("");
              setPresetDonation(
                presetDonation === donationAmount ? "" : donationAmount
              );
            },
            className: `font-bold border-2 border-green-500 min-w-16 rounded-xl px-2 py-2 ${isMatchingDonation ? "bg-green-500 hover:bg-green-400 text-white" : "hover:bg-green-200"}`,
            children: [
              "$",
              donationAmount
            ]
          }
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 relative items-center w-30", children: /* @__PURE__ */ jsx("p", { className: " text-gray-500 mt-12", children: "OR" }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "dollar-input",
          className: "block cursor-pointer leading-6 text-gray-500",
          children: "Enter Custom Amount"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative mt-2 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 sm:text-sm", children: "$" }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "dollar-input",
            name: "dollar-input",
            type: "text",
            placeholder: "0.00",
            "aria-describedby": "price-currency",
            className: "block w-full rounded-md border-0 py-2.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            onChange: handleInputChange,
            value: customDonation,
            style: { minWidth: 500, fontSize: 16 }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ jsx("span", { id: "price-currency", className: "text-gray-500 sm:text-sm", children: "USD" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Link, { to: `/contact-information`, className: "mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
        children: "Continue"
      }
    ) })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DonateFinancial,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const formatToDollars = (amount) => amount.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
function Cart$1() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost
  } = useAppContext();
  const materialDonationIds = Object.keys(materialDonations);
  return /* @__PURE__ */ jsxs("div", { children: [
    customDonation || presetDonation ? /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx(CurrencyDollarIcon, { className: "size-8 text-green-500 mr-2" }),
      /* @__PURE__ */ jsx("h3", { className: "text-gray-600", children: "Financial Donation:" }),
      /* @__PURE__ */ jsx("p", { className: "font-bold ml-3", children: formatToDollars(Number(customDonation || presetDonation)) })
    ] }) : null,
    /* @__PURE__ */ jsx("br", {}),
    materialDonationIds.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { className: "size-6 text-amber-500 mr-2" }),
        /* @__PURE__ */ jsx("h3", { className: "text-gray-600 mt-2", children: "Materials Donations:" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border border-gray-200 w-full my-2" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "w-32", children: "Item Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-3", children: "Quantity" }),
          /* @__PURE__ */ jsx("th", { className: "px-3", children: "Unit Price" }),
          /* @__PURE__ */ jsx("th", { className: "px-3 w-22", children: "Method" }),
          /* @__PURE__ */ jsx("th", { className: "px-3", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: materialDonationIds.map((id) => {
          const item = materialDonations[id];
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "pl-6", children: item.name }),
            /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity }),
            /* @__PURE__ */ jsxs("td", { className: "pl-6", children: [
              "$",
              item.price.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-2", children: item.deliveryType.toUpperCase() }),
            /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
              "$",
              (item.quantity * Number(item.price)).toFixed(2)
            ] })
          ] });
        }) }),
        /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "pl-6", children: "Total:" }),
          /* @__PURE__ */ jsx("td", {}),
          /* @__PURE__ */ jsx("td", {}),
          /* @__PURE__ */ jsx("td", {}),
          /* @__PURE__ */ jsx("td", { children: formatToDollars(materialDonationsTotalCost) })
        ] }) })
      ] })
    ] }) : null,
    materialDonationsTotalCost ? /* @__PURE__ */ jsx("div", { className: "flex items-center mt-7 mb-6", children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-gray-600", children: "Total Contribution:" }),
      /* @__PURE__ */ jsx("p", { className: "font-bold ml-3 text-green-600", children: formatToDollars(
        Number(customDonation || presetDonation || 0) + // TODO: fix 0 issue
        materialDonationsTotalCost
      ) })
    ] }) }) : null,
    !presetDonation && !customDonation && !materialDonationsTotalCost ? /* @__PURE__ */ jsx("p", { children: "Your cart is empty" }) : null
  ] });
}
const stylesheet$1 = "/assets/cart-C6fbvMqx.css";
const links$2 = () => [
  { rel: "stylesheet", href: stylesheet$1 }
];
function CheckoutReview() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "Review Your Donation" }),
    /* @__PURE__ */ jsx(Cart$1, {}),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate("/checkout"),
        type: "button",
        className: "rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
        children: "Proceed to Checkout"
      }
    )
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CheckoutReview,
  links: links$2
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/donate-material-ZfKvcgfb.css";
const links$1 = () => [
  { rel: "stylesheet", href: stylesheet }
];
const loader = async ({ params }) => {
  try {
    const response = await donationApi.get("/tools_materials_inventory");
    return json$1(response.data);
  } catch (error) {
    throw new Response("Failed to load materials", { status: 500 });
  }
};
function DonateMaterial() {
  const { materialDonations, setMaterialDonations } = useAppContext();
  const materials = useLoaderData();
  const handleCounterChange = (id, name, quantity, price, deliveryType) => {
    if (quantity > 0) {
      const updatedMaterialsDonation = {
        name,
        quantity,
        price,
        deliveryType
      };
      setMaterialDonations({
        ...materialDonations,
        [id]: updatedMaterialsDonation
      });
    }
  };
  const handleDeliveryTypeChange = (id, value) => {
    const updatedMaterialsDonation = {
      ...materialDonations[id],
      deliveryType: value
    };
    setMaterialDonations({
      ...materialDonations,
      [id]: updatedMaterialsDonation
    });
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "Donate Materials" }),
    (materials == null ? void 0 : materials.length) > 0 ? /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { className: "!bg-slate-500 text-gray-500", children: /* @__PURE__ */ jsxs("tr", { className: "!bg-slate-500 text-white font-normal", children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 w-32", children: "Item Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-3", children: "Unit Price" }),
        /* @__PURE__ */ jsx("th", { className: "px-3", children: "Needed" }),
        /* @__PURE__ */ jsx("th", { className: "px-3", children: "Donated" }),
        /* @__PURE__ */ jsx("th", { children: "Remaining" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 w-22", children: "Quantity" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 w-22", children: "Donation Type" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: materials.map((item) => {
        return item.quantity_remaining > 0 && /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-2 px-2", children: item.item_name }),
          /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
            "$",
            item.unit_price
          ] }),
          /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity_needed }),
          /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity_donated }),
          /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity_remaining }),
          /* @__PURE__ */ jsx("td", { className: "text-center", children: /* @__PURE__ */ jsx(
            "input",
            {
              className: "border border-gray-400 w-24 text-center rounded-md",
              type: "number",
              max: item.quantity_remaining,
              min: "0",
              onChange: (event) => handleCounterChange(
                item.id,
                item.item_name,
                Number(event.target.value),
                item.unit_price,
                materialDonations[item.id] && materialDonations[item.id].deliveryType ? materialDonations[item.id].deliveryType : "financial"
              ),
              placeholder: "Select",
              value: materialDonations[item.id] ? materialDonations[item.id].quantity : void 0
            }
          ) }),
          /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer ml-6", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "form-radio",
                  type: "radio",
                  name: `materials-donation-type-${item.id}`,
                  onChange: (e) => handleDeliveryTypeChange(item.id, e.target.value),
                  value: "financial",
                  checked: materialDonations[item.id] && materialDonations[item.id].deliveryType === "financial"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Financial" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer ml-6", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "form-radio",
                  type: "radio",
                  name: `materials-donation-type-${item.id}`,
                  onChange: (e) => handleDeliveryTypeChange(item.id, e.target.value),
                  value: "delivery",
                  checked: materialDonations[item.id] && materialDonations[item.id].deliveryType === "delivery"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Delivery" })
            ] })
          ] })
        ] });
      }) })
    ] }) : null,
    /* @__PURE__ */ jsx(Link, { to: `/contact-information`, className: "mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
        children: "Continue"
      }
    ) })
  ] }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DonateMaterial,
  links: links$1,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function Checkout() {
  const { setCustomDonation, setMaterialDonations, setPresetDonation } = useAppContext();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-10", children: "Checkout" }),
    /* @__PURE__ */ jsx("p", { children: "Stripe goes here..." }),
    /* @__PURE__ */ jsx(Link, { to: `/checkout-confirmation`, className: "mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setPresetDonation("");
          setCustomDonation("");
          setMaterialDonations({});
        },
        type: "button",
        className: "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
        children: "Submit Payment"
      }
    ) })
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Checkout
}, Symbol.toStringTag, { value: "Module" }));
function Projects() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 items-center", children: /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "Current Projects" }) }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Projects
}, Symbol.toStringTag, { value: "Module" }));
function Profile() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 items-center", children: /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "My Information" }) }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
function Root() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center mt-10", children: [
    /* @__PURE__ */ jsx(Link, { to: `/donate-financial`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gray-100 px-10 py-5 rounded-xl mb-8 shadow-sm",
        style: { minWidth: "357px" },
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(CurrencyDollarIcon$1, { className: "size-8 text-green-500 mr-2" }),
          /* @__PURE__ */ jsx("button", { className: "font-bold px-2 py-2", children: "Make a Financial Donation" })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx(Link, { to: `/donate-material`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gray-100 px-10 py-5 rounded-xl mb-8 shadow-sm",
        style: { minWidth: "357px" },
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(WrenchScrewdriverIcon$1, { className: "size-6 text-amber-500 mr-2" }),
          /* @__PURE__ */ jsx("button", { className: "font-bold px-2 py-2", children: "Purchase or Donate Materials" })
        ] })
      }
    ) })
  ] }) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Root
}, Symbol.toStringTag, { value: "Module" }));
function About() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 items-center", children: /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "About Us" }) }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "stylesheet", href: stylesheet$1 }
];
function Cart() {
  const { customDonation, presetDonation, materialDonationsTotalCost } = useAppContext();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-12", children: "Your Cart" }),
    /* @__PURE__ */ jsx(Cart$1, {}),
    customDonation || presetDonation || materialDonationsTotalCost ? /* @__PURE__ */ jsx(Link, { to: `/checkout-review`, className: "mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36",
        children: "Proceed to Checkout"
      }
    ) }) : null
  ] }) });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cart,
  links
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-QLVxyb7O.js", "imports": ["/assets/components-CzUGsV2B.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CdYF7nlO.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/AppProvider-CaJJHtGr.js"], "css": [] }, "routes/checkout-confirmation": { "id": "routes/checkout-confirmation", "parentId": "root", "path": "checkout-confirmation", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/checkout-confirmation-DV1zE7zv.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/contact-information": { "id": "routes/contact-information", "parentId": "root", "path": "contact-information", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-information-CAm6W_Hp.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/AppProvider-CaJJHtGr.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/donate-financial": { "id": "routes/donate-financial", "parentId": "root", "path": "donate-financial", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/donate-financial-CT1yQynv.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/AppProvider-CaJJHtGr.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/checkout-review": { "id": "routes/checkout-review", "parentId": "root", "path": "checkout-review", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/checkout-review-F7mh-T8N.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js", "/assets/cart-C5bSDmdh.js", "/assets/AppProvider-CaJJHtGr.js"], "css": [] }, "routes/donate-material": { "id": "routes/donate-material", "parentId": "root", "path": "donate-material", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/donate-material-DPk6xGRW.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/AppProvider-CaJJHtGr.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/checkout": { "id": "routes/checkout", "parentId": "root", "path": "checkout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/checkout-BcrvuaG9.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js", "/assets/AppProvider-CaJJHtGr.js"], "css": [] }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects-D92b1dYI.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile-B2WOV20j.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CLEfy31v.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-JMA8XHdn.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/Layout-Chk07N_d.js"], "css": [] }, "routes/cart": { "id": "routes/cart", "parentId": "root", "path": "cart", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/cart-61AYXeWE.js", "imports": ["/assets/components-CzUGsV2B.js", "/assets/cart-C5bSDmdh.js", "/assets/Layout-Chk07N_d.js", "/assets/AppProvider-CaJJHtGr.js"], "css": [] } }, "url": "/assets/manifest-b7fc4b13.js", "version": "b7fc4b13" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/checkout-confirmation": {
    id: "routes/checkout-confirmation",
    parentId: "root",
    path: "checkout-confirmation",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/contact-information": {
    id: "routes/contact-information",
    parentId: "root",
    path: "contact-information",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/donate-financial": {
    id: "routes/donate-financial",
    parentId: "root",
    path: "donate-financial",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/checkout-review": {
    id: "routes/checkout-review",
    parentId: "root",
    path: "checkout-review",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/donate-material": {
    id: "routes/donate-material",
    parentId: "root",
    path: "donate-material",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/checkout": {
    id: "routes/checkout",
    parentId: "root",
    path: "checkout",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route9
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/cart": {
    id: "routes/cart",
    parentId: "root",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
