export type Language = 'es' | 'en';
export type Copy = Record<Language, string>;
export type Phase = 'repara' | 'prepara' | 'pinta' | 'protege';
export type Material = 'wood' | 'metal' | 'plastic' | 'stone' | 'ceramic' | 'bodywork' | 'glass' | 'wall';
export type Environment = 'interior' | 'exterior';
export type Finish = 'matte' | 'satin' | 'gloss' | 'effect';
export type Need = 'repair' | 'renew' | 'paint' | 'protect' | 'restore' | 'vehicle' | 'outdoor' | 'personalize';
export interface Variant { id: string; format: string; color: string; ral?: string; hex: string; finish: Finish; price: number; stock: number }
export interface Product { id: string; name: string; phase: Phase | 'tools'; materials: Material[]; environments: Environment[]; base: string; variants: Variant[]; isNew: boolean; popular: number; demo: true }
export interface ProjectPhase { phase: Phase; productId: string; instruction: Copy; tools: Copy; drying: number; quantity: number }
export interface Project { id: string; title: Copy; material: Material; environment: Environment; need: Need; difficulty: 'easy' | 'medium' | 'advanced'; hours: number; category: Copy; color: string; phases: ProjectPhase[]; demo: true }
export interface KitSelection { productId: string; variantId: string; quantity: number; selected: boolean }
export interface KitFixture { projectId: string; products: { productId: string; quantity: number }[]; accessoryId: string; demo: true }
export interface CartLine { id: string; kind: 'product' | 'kit'; productId?: string; projectId?: string; variantId?: string; selections?: KitSelection[]; quantity: number }
export interface Answers { need?: Need; material?: Material; environment?: Environment; finish?: Finish }
export interface RecommendationRule { need?: Need; material?: Material; environment?: Environment; finish?: Finish; target: { kind: 'project' | 'product'; id: string } }
export interface Article { id: string; title: Copy; kind: 'tutorial' | 'short' | 'video' | 'guide' | 'errors' | 'comparison' | 'material'; material: Material; phase: Phase; productId: string; demo: true }
export interface Order { id: string; created: string; lines: CartLine[]; subtotal: number; discount: number; shipping: number; total: number; market: 'EU' | 'US'; status: number; reminders: string[] }
export interface DemoState { language: Language; cart: CartLine[]; answers: Answers; orders: Order[]; wishlist: string[]; notifications: string[]; reviews: { target: string; text: string; stars: number; photo?: string }[]; promo: string; market: 'EU' | 'US' }
