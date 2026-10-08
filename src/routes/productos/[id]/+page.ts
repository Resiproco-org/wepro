import { error } from '@sveltejs/kit';
import { products } from '#lib/data';
export function load({ params }: { params: { id: string } }) { const product = products.find((p) => p.id === params.id); if (!product) error(404, 'Producto no encontrado / Product not found'); return { product }; }
