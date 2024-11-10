<script lang="ts">
	import { BarChartSimple, ScaleTypes } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	export let data;

	const options = {
		title: '',
		axes: {
			left: {
				title: 'Response Time (ms)',
				mapsTo: 'value'
			},
			bottom: {
				title: 'Date',
				mapsTo: 'date',
				scaleType: ScaleTypes.TIME
			}
		},
		color: {
			pairing: {
				option: 2
			},
			scale: {
				OK: '#3d70b2',
				Error: '#da1e28'
			}
		},
		height: '400px',
		theme: 'g100'
	};

	let chartData: Record<string, any[]>[] = [];
	if (!data.error) {
		// @ts-ignore
		chartData = (data.requests as any[]).map((request) => {
			return {
				group: request.request.status >= 200 && request.request.status < 300 ? 'OK' : 'Error',
				date: new Date(request.request.created_at),
				value: request.request.response_time
			};
		});
	}

	const table = createTable(
		readable(
			(data.requests as any[]).map((request) => {
				return {
					created_at: new Date(request.request.created_at).toLocaleString(),
					status: request.request.status,
					response_time: `${request.request.response_time}ms`,
					headers: JSON.stringify(request.request.headers),
					response: request.request.response
				};
			})
		),
		{
			page: addPagination({
                initialPageSize: 5,
            })
		}
	);

	const columns = table.createColumns([
		table.column({
			accessor: 'created_at',
			header: 'Date'
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'response_time',
			header: 'Response Time'
		}),
		table.column({
			accessor: 'headers',
			header: 'Headers'
		}),
		table.column({
			accessor: 'response',
			header: 'Response'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<main class="container mx-auto px-4 py-16">
	{#if data.error}
		<Card>
			<CardHeader class="mb-5">
				<CardTitle class="text-destructive">Error</CardTitle>
				<CardDescription class="text-destructive">{data.error}</CardDescription>
			</CardHeader>
		</Card>
	{:else}
		<Card>
			<CardHeader>
				<CardTitle class="text-center text-3xl">Requests</CardTitle>
			</CardHeader>
			<CardContent>
				<Table.Root {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()}>
								<Table.Row>
									{#each headerRow.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
											<Table.Head {...attrs}>
												<Render of={cell.render()} />
											</Table.Head>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Header>
					<Table.Body {...$tableBodyAttrs}>
						{#each $pageRows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											<Table.Cell {...attrs}>
												<Render of={cell.render()} />
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Body>
				</Table.Root>
				<div class="flex items-center justify-end space-x-4 py-4">
					<Button
						variant="outline"
						size="sm"
						on:click={() => ($pageIndex = $pageIndex - 1)}
						disabled={!$hasPreviousPage}>Previous</Button
					>
					<Button
						variant="outline"
						size="sm"
						disabled={!$hasNextPage}
						on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
					>
				</div>
				<BarChartSimple data={chartData} {options} />
			</CardContent>
		</Card>
	{/if}
</main>
