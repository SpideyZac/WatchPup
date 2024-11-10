<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardHeader,
		CardContent,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-1 text-center">
			<CardTitle class="text-2xl">Create a New Service</CardTitle>
			<CardDescription>Enter the details below to create a new service</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" use:enhance class="space-y-6">
				{#if form?.error}
					<div class="text-center text-sm font-medium text-destructive">
						{form.error}
					</div>
				{/if}
				<div class="space-y-2">
					<Label for="method" class="block">Method</Label>
					<select
						id="method"
						name="method"
						required
						class="w-full rounded-md border bg-background p-2"
					>
						<option value="GET">GET</option>
						<option value="HEAD">HEAD</option>
						<option value="POST">POST</option>
						<option value="PUT">PUT</option>
						<option value="DELETE">DELETE</option>
						<option value="CONNECT">CONNECT</option>
						<option value="OPTIONS">OPTIONS</option>
						<option value="TRACE">TRACE</option>
						<option value="PATCH">PATCH</option>
					</select>
				</div>
				<div class="space-y-2">
					<Label for="name" class="block">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Service Name"
						minlength={3}
						maxlength={35}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="url" class="block">URL</Label>
					<Input
						id="url"
						name="url"
						type="url"
						placeholder="https://example.com"
						maxlength={255}
						required
					/>
				</div>
				<Button type="submit" class="w-full">Create Service</Button>
			</form>
		</CardContent>
	</Card>
</div>
