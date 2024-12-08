<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';

	const features = [
		{
			title: 'Real-Time Monitoring',
			description: "Track your services' performance with instant updates and detailed metrics"
		},
		{
			title: 'Instant Alerts',
			description: 'Get notified immediately when issues arise through multiple channels'
		},
		{
			title: 'Performance Insights',
			description: 'Analyze trends and optimize your services with detailed performance data'
		}
	];

	export let data;
</script>

<main class="container mx-auto px-4 py-16">
	<!-- Hero Section -->
	<div class="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			Effortless Web Service Monitoring
		</h1>

		<p class="max-w-[700px] text-xl text-muted-foreground">
			Keep your web services running smoothly with real-time uptime tracking, instant alerts, and
			performance insights. Stay informed and proactive with simple, reliable monitoring designed
			for peace of mind.
		</p>

		<div class="flex gap-4">
			{#if !data.authToken}
				<Button size="lg" href="/signup">Get Started</Button>
			{:else}
				<Button size="lg" href="/dashboard">Dashboard</Button>
			{/if}
			<Button size="lg" variant="outline" href="https://github.com/SpideyZac/WatchPup"
				>Docs/Github</Button
			>
		</div>
	</div>

	<!-- Features Section -->
	<div class="mt-16 grid gap-6 md:grid-cols-3">
		{#each features as feature}
			<Card>
				<CardHeader>
					<CardTitle>{feature.title}</CardTitle>
					<CardDescription>{feature.description}</CardDescription>
					<br />
				</CardHeader>
			</Card>
		{/each}
	</div>

	{#if !data.authToken}
		<!-- CTA Section -->
		<div class="mt-16 flex flex-col items-center space-y-4">
			<h2 class="text-2xl font-bold">Ready to get started?</h2>
			<Button size="lg" href="/signup">Create an Account</Button>
		</div>
	{/if}
</main>
