# Cobertura de los wireframes WEPRO

Fuente: `WEPRO Microsite Wireframes.pdf`, 21 páginas. Revisión de texto y composición visual completa antes de implementar. Las notas de Horizon, metaobjetos, Flow y extensibilidad de Shopify se interpretan como funciones de producto. Se implementan con SvelteKit y estado local.

## Correspondencia

| Página | Referencia | Ruta / componentes | Implementación y diferencias |
|---|---|---|---|
| 1 | Cabecera global | `+layout.svelte` | Marca, cuatro enlaces, búsqueda local, ES/EN, favoritos y carrito. Cabecera sticky, menú móvil desplegable. Acceso a pedidos desde el pie; sin cuenta externa. |
| 2 | Pie global | `+layout.svelte`, `/ayuda` | Newsletter simulada y enlaces a compra, biblioteca, ayuda, pedidos y tiendas; reinicio de demo. Sin logos de medios de pago que sugieran una pasarela real. |
| 3 | S01–S03 | `/`, `Artwork`, `ProductCard` | Hero con CTAs; ocho necesidades con filtro; cuatro pestañas del método y productos vinculados. Hero SVG local de muestra en lugar de fotografía/vídeo aprobado. |
| 4 | S04–S06 | `/`, `ProjectCard`, `ProductCard` | Proyectos destacados, packs editables, pestañas más vendidos/novedades y añadir con variante. Grid responsive en lugar de carrusel. Precio kit y coste de muestra. |
| 5 | S06–S09 | `/`, `BeforeAfter`, `DemoVideo` | Añadir rápido, comparador deslizante, cuatro animaciones verticales con productos comprables y tarjetas educativas. Sin UGC real ni vídeo remoto. |
| 6 | S09–S10 y pie | `/`, `/tiendas`, `StoreLocator` | Artículos navegables; búsqueda por ciudad/código, selección de tienda y mapa esquemático. Ubicación Barcelona simulada; tres puntos ficticios. |
| 7 | P01–P02 | `/proyectos` | Necesidad, superficie, uso, dificultad y tiempo; filtros activos eliminables, reset, orden y carga de más resultados. En móvil, panel expandible. Ocho proyectos coherentes; no se replica cada categoría o filtro sin datos útiles. |
| 8 | Final filtros y pie | `/proyectos`, layout | Continuidad del listado y pie; filtros de presupuesto/base/tipo de daño/acabado del wireframe simplificados. Acabado se elige en recomendador y kit, precio aparece en las tarjetas. |
| 9 | PR01–PR03 | `/proyectos/[id]`, `Artwork`, `DemoVideo` | Cabecera con métricas demo, CTA al kit, barra sticky de compra, cinco bloques de diagnóstico y fases con productos comprables, herramientas y tiempos ficticios. |
| 10 | PR03–PR04 | `/proyectos/[id]`, `KitEditor` | Cuatro fases completas; enlaces al selector RAL y paso siguiente. Kit básico/completo, variantes, cantidades y exclusión. El acabado del recomendador se aplica donde existe la variante. |
| 11 | PR04–PR05 | `KitEditor`, `BeforeAfter`, `Reviews`, `/guia` | Recalcula subtotal/ahorro; editar kit desde carrito conserva su selección. Comparador, animación, guía imprimible, FAQ, seguridad, alternativas, proyectos similares y valoración local con foto. Galería de cliente sustituida por ilustración y fotos opcionales de demo. |
| 12 | PD01–PD02 | `/productos` | Cuatro familias enlazadas al filtro, bases, ayuda comparativa y catálogo. 11 referencias de muestra en lugar de 66; una tarjeta por producto, no por variante. |
| 13 | PD02 | `/productos`, `ProductCard` | Buscar nombre/color/RAL; filtrar fase, material, uso, acabado, formato, stock y precio; ordenar y añadir una variante. Sin carta cromática comercial completa. |
| 14 | F01–F04 | `/productos/[id]` | Galería/zoom, animación, formatos, swatches RAL, búsqueda RAL, acabados, cantidades, stock, favorito, compra rápida y acceso al proyecto. Diez campos prácticos y seis pasos ilustrativos. |
| 15 | F03–F06 | `/productos/[id]`, `/guia`, `Reviews` | Descargas como páginas imprimibles/guardar PDF, productos previos/siguientes y herramientas, proyecto compatible, valoraciones locales con filtro de foto. Sin certificados, compras verificadas ni fichas aprobadas. |
| 16 | C01–C04 | `/como-se-hace`, `/aprender/[id]` | Cuatro preguntas con respuestas persistentes y resultado explícito. Biblioteca filtrable por tipo/material/fase, artículos y animaciones locales. Reglas puras separadas y deterministas. |
| 17 | C03–C06 | `/como-se-hace#comparador`, `#faq` | Tabla Water/Solvent sin claims técnicos: «Por validar». Enlaces por base/material; errores navegables y FAQ desplegable. No se añade marcado SEO con afirmaciones ficticias. |
| 18 | T01–T04 | `/tienda`, `/carrito`, `Cart` | Ocho accesos de compra, superficies, kits y ofertas demo. Carrito modal lateral accesible con cierre/Escape, cantidades, eliminación, contenido del kit, editar kit, cross-selling y cupón. Entradas concentradas en Tienda en lugar de mega menú. |
| 19 | T05 | `demo.svelte.ts`, `Cart`, `Reviews`, `/favoritos`, `/pedidos`, `/ayuda` | Persistencia en este navegador, checkout invitado ficticio, stock/agotado, favoritos, aviso reposición local, cupón y cross-selling. Recuperación de carrito accesible en Pedidos. Sin cuenta, sincronización entre dispositivos, cobros, correos programados ni logística real. |
| 20 | PC01–PC02 | `/pedidos/[id]`, `Reviews`, `DemoVideo` | Confirmación, resumen económico y proyecto pertinente al pedido, guía y fases. Preferencias de recordatorios persistentes, cuatro estados de seguimiento avanzables y ocho contactos con contenido enlazado; valoración/foto local. Si no hay proyecto vinculado, no se inventa uno. |
| 21 | Pie poscompra | layout global | Mismo pie y reinicio en todas las rutas. |

## Decisiones reversibles para la demo

- Paleta blanco/negro, crema y naranja del wireframe; tipografía de sistema, sin descargas de fuentes. Layouts responsive con grids y controles nativos etiquetados.
- Las imágenes son SVG generados localmente en `Artwork.svelte`, identificados como muestras. Se conservan las jerarquías de cada pantalla, sin copiar anotaciones de implementación del cliente como UI.
- Los vídeos se sustituyen por una secuencia local de cuatro fases con play/pause, sin audio ni filmación. Es una simulación explícita.
- Los documentos son HTML imprimible, guardable como PDF por el navegador. No se fabrica un certificado o ficha aprobada.
- Las necesidades del recomendador se evalúan en orden de reglas. Tras las cuatro respuestas, se ofrece un proyecto/producto de muestra; cuando no hay coincidencia exacta se indica la alternativa, y cuando no hay opción coherente se muestra un estado sin resultado. No constituye selección técnica para uso real.
- El kit aplica 10% ficticio solo si contiene las cuatro fases. Se incluyen herramientas en el modo completo, pero se pueden excluir o cambiar las cantidades. El carrito conserva el kit como línea compuesta.
- `DEMO10` aplica 10% ficticio adicional. Importe de envío UE/EE. UU. calculado después del descuento; impuestos incluidos de muestra, moneda EUR para ambos mercados.
- Los nombres españoles de producto/color se mantienen en EN. Son fixtures de ejemplo, no traducciones técnicas/comerciales aprobadas. Navegación, formularios y acciones tienen texto ES/EN.
- Stock de fixture, sin inventario logístico: cero en negro/200 ml de las pinturas; avisos guardados como intención local. No se reserva ni descuenta stock al crear un pedido ficticio.
- Todos los datos persistentes pertenecen al mismo origen/navegador. La simulación no sincroniza dispositivos. Los formularios de newsletter/contacto muestran confirmación en pantalla sin guardar ni enviar emails.

## Límites efectivos

Sin Shopify, backend, ERP/CRM, pagos, mapas externos, geolocalización real, cuentas, envíos, notificaciones, reseñas verificadas o vídeo aprobado. No se implementa el simulador fotográfico opcional marcado como fase 2 en el wireframe. Los filtros/categorías del listado de proyectos se reducen a los que tienen cobertura útil en los fixtures. No hay catálogo completo de 66 referencias ni certificaciones. Los PDF se generan usando el diálogo de impresión en lugar de una descarga binaria directa.

## Verificación reproducible

`pnpm check`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.

Las pruebas puras cubren reglas del recomendador (incluidas todas las combinaciones visibles), precio de kit completo/parcial, cambios de variante/cantidad, líneas compuestas, cupón, envío y eliminación. Playwright recorre los dos caminos principales, persiste respuestas/carrito/idioma/pedidos tras recarga, prueba edición desde carrito y otros controles visibles en 1440×1000 y 390×844; captura pantallas y registra errores de consola. Una prueba recorre las rutas principales y valida sus enlaces locales y anclas de la propia pantalla.

Resultado de la ejecución de entrega: revisión de tipos **0 errores / 0 avisos**, **8 pruebas unitarias aprobadas**, build final correcto, **8 pruebas Playwright aprobadas**. Sin errores de consola registrados ni desbordamiento horizontal en las pantallas recorridas. Capturas de inicio, producto y pedido examinadas visualmente. `pnpm peers check`: sin incompatibilidades. Servidor local comprobado con respuesta HTTP 200 en `http://127.0.0.1:5187`.
