<script lang="ts">
	import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<main class="container mx-auto px-4 py-16">
	<Card class="rounded-lg p-6 shadow-md">
		<CardHeader class="mb-4 text-center">
			<CardTitle class="text-2xl font-bold">{data.service.service.name}</CardTitle>
		</CardHeader>
		<CardContent class="mx-auto">
			<p><strong>Method:</strong> {data.service.service.method}</p>
			<p>
				<strong>URL:</strong>
				<a href={data.service.service.url} target="_blank" class="hover:underline"
					>{data.service.service.url}</a
				>
			</p>
			<p>
				<strong>Created At:</strong>
				{new Date(data.service.service.created_at).toLocaleString()}
			</p>
		</CardContent>
		<CardFooter class="mt-6 flex justify-end gap-4">
			<Button href={`/service/edit/${data.service.service.id}`} variant="default"
				>Edit Service</Button
			>
			<Button href={`/service/requests/${data.service.service.id}`} variant="default"
				>View Requests</Button
			>
			<Button href={`/service/delete/${data.service.service.id}`} variant="destructive"
				>Delete Service</Button
			>
		</CardFooter>
	</Card>
</main>
