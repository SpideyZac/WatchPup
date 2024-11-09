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
			<CardTitle class="text-2xl">Create an account</CardTitle>
			<CardDescription>Enter your information below to create your account</CardDescription>
		</CardHeader>

		<CardContent>
			<form method="POST" use:enhance class="space-y-6">
				{#if form?.error}
					<div class="text-center text-sm font-medium text-destructive">
						{form.error}
					</div>
				{/if}
				<div class="space-y-2">
					<Label for="email" class="block">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="name@company.com"
						value={form?.email ?? ''}
						max="255"
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="username" class="block">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="example123"
						value={form?.username ?? ''}
						min="3"
						max="16"
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="password" class="block">Password</Label>
					<Input id="password" name="password" type="password" max="255" required />
				</div>

				<div class="space-y-2">
					<Label for="confirmPassword" class="block">Confirm password</Label>
					<Input id="confirmPassword" name="confirmPassword" type="password" max="255" required />
				</div>

				<Button type="submit" class="w-full">Create account</Button>

				<div class="text-center text-sm text-muted-foreground">
					Already have an account?{' '}
					<a
						href="/login"
						class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
					>
						Sign in
					</a>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
