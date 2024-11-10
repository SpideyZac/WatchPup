<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';

	export let data;
</script>

<main class="container mx-auto px-4 py-16">
	<Card>
		<CardHeader class="text-center">
			<CardTitle class="text-3xl">Dashboard</CardTitle>
			<CardDescription class="text-muted-foreground">
				Welcome to your dashboard. Here you can manage your services.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<!-- Services section -->
			<div class="grid gap-6 md:grid-cols-3">
				{#each data.services as service}
					<a href={`/service/${service.id}`}>
						<Card>
							<CardHeader class="mb-5 text-center">
								<CardTitle class="text-3xl">{service.name}</CardTitle>
								<CardDescription>{service.url}</CardDescription>
							</CardHeader>
						</Card>
					</a>
				{/each}
			</div>
			{#if data.services.length === 0}
				<p class="text-center text-muted-foreground">
					No services found. Create one <a
						class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
						href="/service/create">here</a
					>
				</p>
			{/if}
		</CardContent>
	</Card>
</main>
