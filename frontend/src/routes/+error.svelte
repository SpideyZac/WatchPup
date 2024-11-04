<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<main class="container mx-auto px-4 py-16 text-center">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-4xl">{$page.status}</Card.Title>
			<Card.Description>{($page.error as App.Error).message}</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button href="/">Go Home</Button>
		</Card.Content>
	</Card.Root>
</main>
