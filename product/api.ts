import axios from "axios";
import {Product} from './types';
import Papa from 'papaparse'

const imagenes = {
    list: async (): Promise<Product[]> => {
        return axios
            .get(
                `https://docs.google.com/spreadsheets/d/e/2PACX-1vS9alYmRZ0dZj6tyveWTd-rL7gd1Y-8tpXKukVLk6M8LTW4O9i8ieZFjpkSbBdJlBLEDvcCuZCyhTxe/pub?output=csv`,
                {
                    responseType:"blob",
                },
            )
            .then((response) =>{
                return new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => {
                            const products = results.data as Product[];
                            return resolve(
                                products.map((product) => ({
                                    ...product,
                                    price: Number(product.price),
                                })),
                            );
                        },
                        error: (error) => reject(error.message),
                    });
                });
            });
    },
}
export default imagenes;