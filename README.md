# WEPRO — prototipo local

Aplicación navegable basada en las **21 páginas de `WEPRO Microsite Wireframes.pdf`**, revisadas visualmente y como texto. El PDF y el PowerPoint preexistentes se conservan intactos.

## Requisitos

- Node.js **22.17 o superior**; se ha utilizado Node **24.16.0**.
- pnpm **11.4.0**.
- Navegador moderno con JavaScript y almacenamiento local.
- Para las pruebas de navegador: Google Chrome instalado (`channel: 'chrome'`).

Versiones fijadas: SvelteKit **3.0.1**, Svelte **5.57.2**, Vite **8.3.4**, Tailwind CSS **4.3.3**, adapter-auto **8.0.0**. TypeScript **6.0.3** está resuelto en el lockfile. Compatibilidad comprobada mediante metadatos de paquetes y las comprobaciones del proyecto. SvelteKit 3 configura el framework dentro de `vite.config.ts`; utiliza subpath imports `#lib`.

## Instalación y arranque

Desde `/Users/m/Projects/wepro`:

```sh
pnpm install --frozen-lockfile
pnpm dev --port 5187 --strictPort
```

Abrir **http://127.0.0.1:5187**. Se utiliza 5187 para evitar otro servicio ya existente en 5173. La instalación inicial necesita acceso al registro de paquetes; la aplicación funciona sin imágenes, fuentes ni servicios remotos una vez instalada.

Para comprobar el build en local:

```sh
pnpm build
pnpm preview --port 4187 --strictPort
```

No necesita base de datos, Docker, Shopify, cuentas, claves ni archivos `.env`.

## Recorridos

1. Inicio → **Encontrar mi proyecto** → Renovar un mueble / Madera / Interior / Satinado → **Ver proyecto y editar kit** → Kit básico o completo → cambiar variantes o excluir productos → carrito → **Crear pedido ficticio local** → seguimiento simulado.
2. Productos → buscar `Water Based` → ficha → elegir formato, color/RAL y acabado → añadir → carrito.

Hay 11 productos de muestra (incluido un set de herramientas), 8 proyectos, 8 kits, 7 artículos y 3 tiendas ficticias. Productos con variantes de 200/400 ml; pinturas con 5 colores y 3 acabados. Negro de 200 ml tiene stock cero para probar el aviso de reposición.

## Datos y simulaciones

- **Todos los precios, descuentos, stocks, plazos, tiempos técnicos, compatibilidades y valoraciones son de demostración.** No hay datos comerciales aprobados.
- Checkout sin registro: genera exclusivamente un pedido local. **No cobra ni transmite información.** Compra rápida y exprés llevan al mismo flujo simulado.
- Los vídeos son secuencias animadas locales de muestra con reproducir/pausar; no son grabaciones ni tutoriales técnicos reales.
- El mapa es esquemático. «Usar ubicación simulada» selecciona Barcelona sin acceder al GPS.
- Newsletter, contacto, reposición, recuperación de carrito y recordatorios poscompra están simulados; no se envían emails, SMS o WhatsApp.
- Las guías y fichas son páginas imprimibles de muestra. **Imprimir / guardar como PDF** abre el diálogo del navegador; no entrega certificaciones ni documentos técnicos reales.
- Carrito, respuestas, idioma ES/EN, pedidos, preferencias, favoritos y valoraciones locales se guardan bajo `wepro-demo-v1` en localStorage. Persisten al recargar, **sin sincronización entre navegadores o dispositivos**.
- **Reiniciar demo**, en el pie o Ayuda, vacía el estado local de WEPRO. Fotos opcionales para valoraciones: máximo 500 KB.
- Nombres de producto y colores de muestra se mantienen; navegación y acciones están disponibles en español e inglés.

### Reglas económicas de muestra

Los cálculos se realizan en céntimos enteros. Un kit con las cuatro fases recibe 10% de ahorro ficticio; al quitar una fase ese ahorro desaparece. `DEMO10` aplica otro 10% sobre el subtotal del carrito después del ahorro del kit. Envío demo UE: 4,90 € o gratis desde 60 €; EE. UU.: 14,90 € o gratis desde 100 €, siempre en EUR. El umbral se calcula después del cupón. No hay cálculos fiscales ni arancelarios reales.

## Organización

```text
src/lib/types.ts                 Tipos del dominio
src/lib/data.ts                  Fixtures y reglas tipadas de muestra
src/lib/recommendation.ts        Recomendador determinista
src/lib/pricing.ts               Cálculos de kit y carrito
src/lib/demo.svelte.ts           Estado con runes, persistencia y pedidos
src/lib/components/             Componentes compartidos e ilustraciones SVG
src/routes/                     Pantallas SvelteKit
tests/journeys.spec.ts           Recorridos y comprobación de enlaces
docs/cobertura-wireframes.md     Correspondencia de las 21 páginas y límites
```

## Verificación

```sh
pnpm check
pnpm test
pnpm build
pnpm test:e2e
```

Las pruebas de navegador levantan su propio servidor en 5187 y requieren que ese puerto esté libre. Comprueban ambos recorridos en escritorio **1440×1000** y móvil **390×844**, persistencia al recargar, edición de kit, stocks, filtros, cambio de idioma, favoritos, localizador, reproducción, reinicio, errores de consola, enlaces locales y desbordamiento horizontal. Las capturas se generan en `test-results/` (excluido de Git).

Repositorio Git local inicializado en rama `main`. No se han creado commits ni publicado un remoto.
