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

	function redirectToHome() {
		location.href = '/dashboard';
	}
</script>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-1 text-center">
			<CardTitle class="text-2xl">Login to your account</CardTitle>
			<CardDescription>Enter your information below to login to your account</CardDescription>
		</CardHeader>

		<CardContent>
			<form method="POST" use:enhance class="space-y-6">
				{#if form?.error}
					<div class="text-center text-sm font-medium text-destructive">
						{form.error}
					</div>
				{:else if form?.success}
					<div class="text-center text-sm font-medium">
						Successfully logged in
						{redirectToHome()}
					</div>
				{/if}
				<div class="space-y-2">
					<Label for="user" class="block">Username or Email</Label>
					<Input
						id="user"
						name="user"
						type="text"
						placeholder="name@company.com"
						value={form?.user ?? ''}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="password" class="block">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>

				<Button type="submit" class="w-full">Login</Button>

				<div class="text-center text-sm text-muted-foreground">
					Don't have an account?{' '}
					<a
						href="/signup"
						class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
					>
						Signup
					</a>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
