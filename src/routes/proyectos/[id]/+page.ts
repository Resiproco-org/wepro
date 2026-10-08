import { error } from '@sveltejs/kit';
import { projects } from '#lib/data';
export function load({ params }: { params: { id: string } }) { const project = projects.find((p) => p.id === params.id); if (!project) error(404, 'Proyecto no encontrado / Project not found'); return { project }; }
