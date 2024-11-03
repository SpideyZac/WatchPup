<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Dog } from 'lucide-svelte';

	let { children } = $props();
</script>

<!-- Navbar -->
<div class="border-b">
	<div class="container mx-auto px-4">
		<nav class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-2">
				<Dog class="h-8 w-8" />
				<span class="text-lg font-bold">WatchPup</span>
			</div>

			<!-- Auth buttons -->
			<div class="flex items-center gap-4">
				<Button variant="ghost">Log in</Button>
				<Button>Sign up</Button>
			</div>
		</nav>
	</div>
</div>
{@render children()}
