// Shows options for materials etc donation options
import * as React from 'react';
import { json, Link } from '@remix-run/react';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { donationApi, MaterialsInventory } from '../services/api';
import { useLoaderData } from '@remix-run/react';
import { useAppContext } from '../providers/AppProvider';
// @ts-ignore
import stylesheet from '../styles/donate-material.css?url'; // TODO: get index.d.ts to fix this type error
import Layout from '../components/Layout';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await donationApi.get('/tools_materials_inventory');

    return json(response.data);
  } catch (error) {
    throw new Response('Failed to load materials', { status: 500 });
  }
};

export default function DonateMaterial() {
  const { materialDonations, setMaterialDonations } = useAppContext();

  const materials = useLoaderData<MaterialsInventory>();

  const handleCounterChange = (
    id: number,
    name: string,
    quantity: number,
    price: number,
    deliveryType: string,
  ) => {
    if (quantity > 0) {
      const updatedMaterialsDonation = {
        name,
        quantity,
        price,
        deliveryType,
      };

      setMaterialDonations({
        ...materialDonations,
        [id]: updatedMaterialsDonation,
      });
    }
  };

  const handleDeliveryTypeChange = (id: number, value: string) => {
    const updatedMaterialsDonation = {
      ...materialDonations[id],
      deliveryType: value,
    };

    setMaterialDonations({
      ...materialDonations,
      [id]: updatedMaterialsDonation,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">Donate Materials</h2>
        {materials?.length > 0 ? (
          <table>
            <thead className="bg-slate-500 text-gray-500">
              <tr className="bg-slate-500 text-white font-normal">
                <th className="px-3 w-32">Item Name</th>
                <th className="px-3">Unit Price</th>
                {/* <th style={{ width: 450 }}>Description</th> */}
                <th className="px-3">Needed</th>
                <th className="px-3">Donated</th>
                <th>Remaining</th>
                <th className="px-3 w-22">Quantity</th>
                <th className="px-3 w-22">Donation Type</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(item => {
                return (
                  item.quantity_remaining > 0 && (
                    <tr>
                      <td className="py-2 px-2">{item.item_name}</td>
                      <td className="text-center">${item.unit_price}</td>
                      {/* <td className="py-2">{item.item_description}</td> */}
                      <td className="text-center">{item.quantity_needed}</td>
                      <td className="text-center">{item.quantity_donated}</td>
                      <td className="text-center">{item.quantity_remaining}</td>
                      <td className="text-center">
                        <input
                          className="border border-gray-400 w-24 text-center rounded-md"
                          type="number"
                          max={item.quantity_remaining}
                          min="0"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) =>
                            handleCounterChange(
                              item.id,
                              item.item_name,
                              Number(event.target.value),
                              item.unit_price,
                              materialDonations[item.id] &&
                                materialDonations[item.id].deliveryType
                                ? materialDonations[item.id].deliveryType
                                : 'financial',
                            )
                          }
                          placeholder="Select"
                          value={
                            materialDonations[item.id]
                              ? materialDonations[item.id].quantity
                              : undefined
                          }
                        />
                      </td>
                      <td className="py-2">
                        <label className="flex items-center space-x-2 cursor-pointer ml-6">
                          <input
                            className="form-radio"
                            type="radio"
                            name={`materials-donation-type-${item.id}`}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              handleDeliveryTypeChange(item.id, e.target.value)
                            }
                            value="financial"
                            checked={
                              materialDonations[item.id] &&
                              materialDonations[item.id].deliveryType ===
                                'financial'
                            }
                          />
                          <span className="text-blue-600">Financial</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer ml-6">
                          <input
                            className="form-radio"
                            type="radio"
                            name={`materials-donation-type-${item.id}`}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              handleDeliveryTypeChange(item.id, e.target.value)
                            }
                            value="delivery"
                            checked={
                              materialDonations[item.id] &&
                              materialDonations[item.id].deliveryType ===
                                'delivery'
                            }
                          />
                          <span className="text-blue-600">Delivery</span>
                        </label>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        ) : null}

        <Link to={`/contact-information`} className="mt-12">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
          >
            Continue
          </button>
        </Link>
      </div>
    </Layout>
  );
}
