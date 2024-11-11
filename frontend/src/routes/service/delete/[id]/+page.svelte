<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<main class="container mx-auto px-4 py-16">
	<Card class="rounded-lg p-6 shadow-md">
		<CardHeader class="mb-4 text-center">
			<CardTitle class="text-2xl font-bold">Service successfully deleted</CardTitle>
		</CardHeader>
		<CardContent class="mx-auto text-center">
			<p>
				Your service has been successfully deleted. If you have any questions or need further
				assistance, please contact support.
			</p>
			<div class="mt-4 flex justify-center space-x-4">
				<Button href="/dashboard" variant="default">Go to Dashboard</Button>
				<Button href="/service/create" variant="default">Create New Service</Button>
			</div>
		</CardContent>
	</Card>
</main>
