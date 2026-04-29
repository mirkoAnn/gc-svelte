<script lang="ts">
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { m } from './../../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../../component/games/gallery/game-gallery-filters-helper';
	import FaqsList from './../../../../component/faqs/faqs-list.svelte';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import ContentContainer from '../../../../component/content/content-container.svelte';
	import type { NewSlotsPageData } from './+page.server';
	import type { Slot } from '$lib/types/games';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import { resolveSlotGratisIndexPath, resolveSlotNewPath } from '$lib/link-resolver';

	let {
		data
	}: {
		data: {
			page: NewSlotsPageData;
			slots: Slot[];
			slotThemes: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: data.slots,
			slotThemes: data.slotThemes,
			slotThemesLabel: m.game_filter_theme({}, { locale: 'es' }),
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'es' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'es' }),
			orderByOptions: getSlotOrderByOptions('es'),
			defaultOrderByValue: 'createdAt:desc',
			defaultOrderByTitle: m.game_filter_release_date_new_old({}, { locale: 'es' })
		});
	};

	refreshGallery();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: resolveSlotGratisIndexPath(CountryCodes.es) },
			title: 'Juega gratis a las Tragaperras Online',
			label: 'Tragaperras Gratis'
		},
		{
			route: { id: resolveSlotNewPath(CountryCodes.es) },
			title: `Juega Gratis a las Nuevas Tragaperras Online`,
			label: 'Nuevas Tragaperras'
		}
	]}
/>

<h1 class="page-title">Nuevas Tragaperras Online</h1>
<div class="slot-category">
	<Gallery category="slot" type="grid" hasFilters={true} />
</div>

{#if data.page.content.firstContent}
	<ContentContainer content={data.page.content.firstContent} />
{/if}
{#if data.page.content.secondContent}
	<ContentContainer content={data.page.content.secondContent} />
{/if}
{#if data.page.content.thirdContent}
	<ContentContainer content={data.page.content.thirdContent} />
{/if}
{#if data.page.content.fourthContent}
	<ContentContainer content={data.page.content.fourthContent} />
	<table class="content content-table">
		<thead>
			<tr>
				<th>Tipos de novedades en slots online</th>
				<th>Qué significa</th>
				<th>Ejemplos</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Juego original</td>
				<td>Slot nueva con título, temática, diseño y mecánica propia</td>
				<td>Danger! High Voltage de BTG</td>
			</tr>
			<tr>
				<td>Personajes</td>
				<td>Diferentes episodios a partir de una slot popular</td>
				<td>Rich Wilde de Play’n GO</td>
			</tr>
			<tr>
				<td>Sagas</td>
				<td>"Slots que giran en torno a un mismo protagonista o universo "</td>
				<td>"Boof Dead Legacy of Dead de Play’n GO "</td>
			</tr>
			<tr>
				<td>Secuelas o Precuelas</td>
				<td>Basadas en episodios posteriores o previos a una slot anterior</td>
				<td>Wanted Dead or a Wild Duel at Dawn de Hacksaw Gaming</td>
			</tr>
			<tr>
				<td>Nueva entrega de una marca</td>
				<td>Otro título dentro de una franquicia reconocible</td>
				<td>Sizzling Hot 6 de Greentube</td>
			</tr>
			<tr>
				<td>Nueva entrega de una serie</td>
				<td>Otro título entre slots que comparten una misma familia</td>
				<td>Fire Blaze: Blue Wizard Megaways de Playtech</td>
			</tr>
			<tr>
				<td>Nueva mecánica</td>
				<td>Juego creado para explotar una función concreta</td>
				<td>Book of Ra Deluxe Win Ways de Novomatic</td>
			</tr>
			<tr>
				<td>Revisión moderna</td>
				<td>Clásico actualizado con gráficos o funciones nuevas</td>
				<td>Jack and the Beanstalk Remastered de NetEnt</td>
			</tr>
		</tbody>
	</table>
{/if}

{#if data.page.content.fifthContent}
	<ContentContainer content={data.page.content.fifthContent} />
	<table class="content content-table">
		<thead>
			<tr>
				<th>Tendencia</th>
				<th>Cuándo se consolidó</th>
				<th>Ejemplo</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Cascadas / Avalanche</td>
				<td>Desde 2010</td>
				<td>Gonzo’s Quest de NetEnt</td>
			</tr>
			<tr>
				<td>Megaways</td>
				<td>Desde 2016</td>
				<td>Bonanza Megaways de BTG</td>
			</tr>
			<tr>
				<td>Alta volatilidad</td>
				<td>Desde finales de 2010s</td>
				<td>Mental de Nolimit City</td>
			</tr>
			<tr>
				<td>Cluster pays</td>
				<td>2019-2021</td>
				<td>Sugar Rush de Pragmatic Play</td>
			</tr>
			<tr>
				<td>Compra de bonus</td>
				<td>2018-2020</td>
				<td>The Dog House Megaways de Pragmatic Play</td>
			</tr>
			<tr>
				<td>Book of</td>
				<td>Desde 2005</td>
				<td>Book of Ra de Novomatic/Greentube</td>
			</tr>
			<tr>
				<td>Series y secuelas</td>
				<td>Permanente</td>
				<td>Reactoonz 2 de Play’n GO</td>
			</tr>
			<tr>
				<td>Jackpots en red</td>
				<td>2000s-actualidad</td>
				<td>Mega Moolah de Microgaming</td>
			</tr>
			<tr>
				<td>Clásicos modernizados </td>
				<td>Actualidad </td>
				<td>Book of Ra Deluxe Win Ways de Greentube </td>
			</tr>
		</tbody>
	</table>
{/if}
{#if data.page.content.sixthContent}
	<ContentContainer content={data.page.content.sixthContent} />
	<table class="content content-table">
		<thead>
			<tr>
				<th>Proveedor / estudio</th>
				<th>Ritmo de estrenos</th>
				<th>Cómo son sus novedades</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Pragmatic Play</td>
				<td>Semanal</td>
				<td>Slots originales, secuelas, series y promociones tipo Drops & Wins</td>
			</tr>
			<tr>
				<td>Play’n GO</td>
				<td>Mensual</td>
				<td>Slots narrativas, series, mitología, alta volatilidad</td>
			</tr>
			<tr>
				<td>Hacksaw Gaming</td>
				<td>Mensual</td>
				<td>Slots volátiles, formatos compactos, mecánicas propias</td>
			</tr>
			<tr>
				<td>Nolimit City</td>
				<td>Mensual o bimensual</td>
				<td>Slots extremas, secuelas, xWays/xNudge/xSplit</td>
			</tr>
			<tr>
				<td>Yggdrasil</td>
				<td>Por campañas</td>
				<td>Juegos visuales, jackpots, mecánicas diferenciales</td>
			</tr>
			<tr>
				<td>NetEnt</td>
				<td>Selectivo</td>
				<td>Secuelas, clásicos renovados, slots premium</td>
			</tr>
			<tr>
				<td>Greentube</td>
				<td>Selectivo</td>
				<td>Clásicos modernizados y continuación de las series Novomatic </td>
			</tr>
			<tr>
				<td>IGT </td>
				<td>Selectivo </td>
				<td>Slots de marca, jackpots y juegos adaptados a mercados regulados específicos </td>
			</tr>
		</tbody>
	</table>
{/if}
{#if data.page.content.seventhContent}
	<ContentContainer content={data.page.content.seventhContent} />
	<table class="content content-table">
		<thead>
			<tr>
				<th>Promoción</th>
				<th>Cómo funciona</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Tiradas gratis</td>
				<td>Free spins para probar una slot recién estrenada</td>
			</tr>
			<tr>
				<td>Slot de la semana</td>
				<td>Juego destacado durante varios días</td>
			</tr>
			<tr>
				<td>Torneos</td>
				<td>Clasificación por premios acumulados o multiplicadores</td>
			</tr>
			<tr>
				<td>Misiones</td>
				<td>Retos por jugar a varias slots o completar objetivos</td>
			</tr>
			<tr>
				<td>Drops diarios</td>
				<td>Premios aleatorios asociados a ciertas slots</td>
			</tr>
			<tr>
				<td>Cashback</td>
				<td>Devolución parcial en pérdidas de juegos seleccionados</td>
			</tr>
		</tbody>
	</table>
{/if}
{#if data.page.content.eighthContent}
	<ContentContainer content={data.page.content.eighthContent} />
{/if}
{#if data.page.content.ninethContent}
	<ContentContainer content={data.page.content.ninethContent} />
{/if}
{#if data.page.content.tenthContent}
	<ContentContainer content={data.page.content.tenthContent} />
{/if}

{#if data.page.faqs.length > 0}
	<FaqsList faqs={data.page.faqs} />
{/if}

{#if data.page.author}
	<AuthorBox author={data.page.author} />
{/if}
