import type { Article, Copy, Finish, KitFixture, Material, Need, Product, Project, ProjectPhase, RecommendationRule, Variant } from './types';
export const copy = (es: string, en: string): Copy => ({ es, en });
export const phases = ['repara', 'prepara', 'pinta', 'protege'] as const;
export const phaseNames = { repara: copy('REPARA', 'REPAIR'), prepara: copy('PREPARA', 'PREPARE'), pinta: copy('PINTA', 'PAINT'), protege: copy('PROTEGE', 'PROTECT'), tools: copy('ACCESORIOS', 'TOOLS') };
export const materials: Record<Material, Copy> = { wood: copy('Madera', 'Wood'), metal: copy('Metal', 'Metal'), plastic: copy('Plástico', 'Plastic'), stone: copy('Piedra y mármol', 'Stone and marble'), ceramic: copy('Cerámica', 'Ceramic'), bodywork: copy('Carrocería', 'Bodywork'), glass: copy('Vidrio', 'Glass'), wall: copy('Pared', 'Wall') };
export const needs: Record<Need, Copy> = { repair: copy('Reparar un desperfecto', 'Repair damage'), renew: copy('Renovar un mueble', 'Renew furniture'), paint: copy('Pintar una superficie', 'Paint a surface'), protect: copy('Proteger un acabado', 'Protect a finish'), restore: copy('Restaurar metal', 'Restore metal'), vehicle: copy('Reparar un vehículo', 'Repair a vehicle'), outdoor: copy('Mejorar un exterior', 'Improve an outdoor space'), personalize: copy('Personalizar un objeto', 'Personalize an object') };
export const finishes: Record<Finish, Copy> = { matte: copy('Mate', 'Matte'), satin: copy('Satinado', 'Satin'), gloss: copy('Brillante', 'Gloss'), effect: copy('Efecto especial', 'Special effect') };
export const environments = { interior: copy('Interior', 'Indoor'), exterior: copy('Exterior', 'Outdoor') };
export const difficulties = { easy: copy('Fácil', 'Easy'), medium: copy('Media', 'Medium'), advanced: copy('Avanzada', 'Advanced') };
export const colors = [
  { color: 'Blanco demo', ral: '9010', hex: '#eee9df' },
  { color: 'Verde demo', ral: '6003', hex: '#69765a' },
  { color: 'Terracota demo', ral: '8004', hex: '#b36a4c' },
  { color: 'Azul demo', ral: '5008', hex: '#425567' },
  { color: 'Negro demo', ral: '9005', hex: '#242624' }
];
function variants(id: string, price: number, paint = false, varnish = false): Variant[] {
  return ['400 ml', '200 ml'].flatMap((format, f) => (paint ? colors : [{ color: varnish ? 'Transparente demo' : 'Neutro demo', hex: varnish ? '#dbba83' : '#ddd7c9' }]).flatMap((c, i) => (paint || varnish ? ['matte', 'satin', 'gloss'] as Finish[] : ['matte'] as Finish[]).map((finish) => ({ id: `${id}-${f}-${i}-${finish}`, format, ...c, finish, price: price - f * 250, stock: paint && i === 4 && f === 1 ? 0 : 20 }))));
}
const productSeed: [string, string, Product['phase'], Material[], string, number][] = [
  ['masilla-madera', 'Masilla para madera', 'repara', ['wood'], '—', 1150],
  ['masilla-metal', 'Masilla para metal', 'repara', ['metal', 'bodywork'], '—', 1250],
  ['masilla-universal', 'Masilla universal', 'repara', ['wood', 'stone', 'ceramic', 'wall'], '—', 1050],
  ['imprimacion-madera', 'Imprimación para madera', 'prepara', ['wood'], '—', 1390],
  ['imprimacion-metal', 'Imprimación anticorrosiva', 'prepara', ['metal', 'bodywork'], '—', 1490],
  ['imprimacion-universal', 'Imprimación universal', 'prepara', ['plastic', 'ceramic', 'glass', 'wall', 'stone'], '—', 1290],
  ['pintura-water-based', 'Pintura Water Based', 'pinta', ['wood', 'metal', 'plastic', 'ceramic', 'wall', 'glass', 'stone'], 'Water Based', 1590],
  ['pintura-solvent-based', 'Pintura Solvent Based', 'pinta', ['metal', 'bodywork', 'wood'], 'Solvent Based', 1690],
  ['efecto-decorativo', 'Efecto decorativo', 'pinta', ['wood', 'plastic', 'ceramic'], 'Especialidades', 1890],
  ['barniz-acrilico', 'Barniz acrílico', 'protege', ['wood', 'metal', 'plastic', 'ceramic', 'bodywork', 'stone', 'wall', 'glass'], '—', 1490],
  ['herramientas', 'Set de herramientas · demo', 'tools', ['wood', 'metal', 'plastic', 'ceramic', 'stone', 'bodywork', 'wall', 'glass'], '—', 990]
];
export const products: Product[] = productSeed.map(([id, name, phase, mat, base, price], i) => ({ id, name, phase, materials: mat, base, environments: phase === 'pinta' && base === 'Water Based' ? ['interior'] : ['interior', 'exterior'], variants: variants(id, price, phase === 'pinta', phase === 'protege'), isNew: i === 8 || i === 5, popular: 100 - i * 5, demo: true }));
const instructions = [copy('Ejemplo: revisar los daños y rellenar pequeñas irregularidades. Validar la aplicación con la ficha aprobada.', 'Example: inspect damage and fill small irregularities. Validate application against approved documentation.'), copy('Ejemplo: preparar una superficie limpia y elegir la imprimación correspondiente.', 'Example: prepare a clean surface and select the matching primer.'), copy('Ejemplo: elegir el color y practicar las pasadas en una pieza de muestra.', 'Example: choose a color and practice passes on a sample piece.'), copy('Ejemplo: elegir el acabado y revisar la compatibilidad antes de proteger.', 'Example: choose a finish and check compatibility before protecting.')];
function steps(material: Material, outdoor: boolean): ProjectPhase[] {
  const ids = [material === 'wood' ? 'masilla-madera' : material === 'metal' || material === 'bodywork' ? 'masilla-metal' : 'masilla-universal', material === 'wood' ? 'imprimacion-madera' : material === 'metal' || material === 'bodywork' ? 'imprimacion-metal' : 'imprimacion-universal', outdoor || material === 'bodywork' ? 'pintura-solvent-based' : 'pintura-water-based', 'barniz-acrilico'];
  return phases.map((phase, i) => ({ phase, productId: ids[i], instruction: instructions[i], tools: copy(i === 0 ? 'Espátula y lija · muestra' : 'Protección y cinta · muestra', i === 0 ? 'Spatula and sandpaper · sample' : 'Protection and masking tape · sample'), drying: [60, 30, 45, 120][i], quantity: 1 }));
}
const projectSeed: [string, Copy, Material, Project['environment'], Need, Project['difficulty'], number, string][] = [
  ['renovar-mesa-madera', copy('Cómo reparar y renovar una mesa de madera', 'How to repair and renew a wooden table'), 'wood', 'interior', 'renew', 'medium', 6, '#69765a'],
  ['restaurar-barandilla', copy('Restaurar una barandilla oxidada', 'Restore a rusty railing'), 'metal', 'exterior', 'restore', 'medium', 8, '#425567'],
  ['renovar-radiador', copy('Renovar un radiador', 'Renew a radiator'), 'metal', 'interior', 'paint', 'easy', 3, '#b36a4c'],
  ['personalizar-maceta', copy('Personalizar un jarrón o maceta', 'Personalize a vase or planter'), 'ceramic', 'interior', 'personalize', 'easy', 1, '#b36a4c'],
  ['muebles-jardin', copy('Renovar muebles de jardín de metal', 'Renew metal garden furniture'), 'metal', 'exterior', 'outdoor', 'medium', 6, '#69765a'],
  ['reparar-carroceria', copy('Reparar un arañazo en la carrocería', 'Repair a bodywork scratch'), 'bodywork', 'exterior', 'vehicle', 'advanced', 12, '#425567'],
  ['reparar-pared', copy('Reparar un desperfecto en la pared', 'Repair wall damage'), 'wall', 'interior', 'repair', 'easy', 2, '#dbba83'],
  ['renovar-plastico', copy('Dar nueva vida a una silla de plástico', 'Give a plastic chair a new life'), 'plastic', 'interior', 'personalize', 'easy', 3, '#69765a']
];
export const projects: Project[] = projectSeed.map(([id, title, material, environment, need, difficulty, hours, color]) => ({ id, title, material, environment, need, difficulty, hours, color, category: needs[need], phases: steps(material, environment === 'exterior'), demo: true }));
export const kits: KitFixture[] = projects.map((p) => ({ projectId: p.id, products: p.phases.map((s) => ({ productId: s.productId, quantity: s.quantity })), accessoryId: 'herramientas', demo: true }));
export const recommendationRules: RecommendationRule[] = [
  { need: 'protect', target: { kind: 'product', id: 'barniz-acrilico' } },
  { need: 'repair', material: 'wood', target: { kind: 'product', id: 'masilla-madera' } },
  { need: 'repair', material: 'metal', target: { kind: 'product', id: 'masilla-metal' } },
  ...projects.map((p): RecommendationRule => ({ need: p.need, material: p.material, environment: p.environment, target: { kind: 'project', id: p.id } })),
  { finish: 'effect', target: { kind: 'product', id: 'efecto-decorativo' } }
];
export const articles: Article[] = [
  ['mesa', copy('Renovar una mesa: el orden de las fases', 'Renew a table: the phase order'), 'tutorial', 'wood', 'repara', 'masilla-madera'],
  ['pasadas', copy('Practica tus pasadas en 30 segundos', 'Practice your passes in 30 seconds'), 'short', 'wood', 'pinta', 'pintura-water-based'],
  ['metal', copy('Un proyecto de metal, de principio a fin', 'A metal project from start to finish'), 'video', 'metal', 'prepara', 'imprimacion-metal'],
  ['guia', copy('Lista de materiales para tu proyecto', 'Your project material checklist'), 'guide', 'wood', 'prepara', 'imprimacion-madera'],
  ['errores', copy('Goteos y marcas: qué revisar', 'Drips and marks: what to check'), 'errors', 'plastic', 'pinta', 'pintura-water-based'],
  ['bases', copy('Water Based o Solvent Based', 'Water Based or Solvent Based'), 'comparison', 'metal', 'pinta', 'pintura-solvent-based'],
  ['plastico', copy('Antes de pintar plástico', 'Before painting plastic'), 'material', 'plastic', 'prepara', 'imprimacion-universal']
].map((row) => ({ id: row[0], title: row[1], kind: row[2], material: row[3], phase: row[4], productId: row[5], demo: true } as Article));
export const stores = [{ id: 1, name: 'Taller Barcelona · demo', city: 'Barcelona', postal: '08001', x: 72, y: 28 }, { id: 2, name: 'Taller Madrid · demo', city: 'Madrid', postal: '28001', x: 40, y: 53 }, { id: 3, name: 'Taller Valencia · demo', city: 'Valencia', postal: '46001', x: 64, y: 70 }];
export function productById(id: string): Product { const p = products.find((p) => p.id === id); if (!p) throw new Error(`Unknown product: ${id}`); return p; }
export function variantById(productId: string, variantId: string): Variant { const v = productById(productId).variants.find((v) => v.id === variantId); if (!v) throw new Error(`Unknown variant: ${variantId}`); return v; }
