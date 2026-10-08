import { error } from '@sveltejs/kit';
import { articles } from '#lib/data';
export function load({ params }: { params: { id: string } }) { const article = articles.find((a) => a.id === params.id); if (!article) error(404, 'Artículo no encontrado / Article not found'); return { article }; }
