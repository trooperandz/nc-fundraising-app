import { json, LoaderFunction } from '@remix-run/node';
import axios, { AxiosResponse } from 'axios';
// import Config from 'react-native-config';

export const donationApi = axios.create({
  // baseURL: Config.ITINERARIES_API_BASE_URL,
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:3W91JFSj',
});

export type MaterialsInventory = {
  id: number;
  item_name: string;
  item_description: string;
  item_category: string;
  quantity_needed: number;
  quantity_donated: number;
  quantity_remaining: number;
  status: 'active';
  requester_id: number;
  example_url: string;
  unit_price: number;
}[];

export const getMaterialsInventory = async () => {
  try {
    const result: AxiosResponse<MaterialsInventory> = await donationApi.get(
      '/tools_materials_inventory',
    );

    return result.data;
  } catch (err) {
    console.error('Error fetching itineraries:', err);
    throw err;
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await donationApi.get('/tools_materials_inventory');
    return json(response.data); // Return the data as JSON
  } catch (error) {
    throw new Response('Failed to load materials', { status: 500 });
  }
};
