<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Dog } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="flex h-screen flex-col justify-between bg-background">
	<!-- Navbar -->
	<div class="sticky top-0 border-b">
		<div class="container mx-auto px-4">
			<nav class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<div class="flex items-center gap-2">
					<Dog class="h-8 w-8" />
					<a href="/" class="text-lg font-bold">WatchPup</a>
				</div>

				<!-- Auth buttons -->
				<div class="flex items-center gap-4">
					<Button variant="ghost" href="/login">Log in</Button>
					<Button href="/signup">Sign up</Button>
				</div>
			</nav>
		</div>
	</div>
	{@render children()}
	<!-- Footer -->
	<footer class="px-4 text-muted-foreground">
		<p>Copyright &copy; 2024 WatchPup. All Rights Reserved</p>
	</footer>
</div>
