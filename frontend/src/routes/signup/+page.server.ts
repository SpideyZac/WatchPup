import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { config } from '$lib/config';

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			const email = formData.get('email');
			const username = formData.get('username');
			const password = formData.get('password');
			const confirmPassword = formData.get('confirmPassword');

			if (password !== confirmPassword) {
				return fail(400, {
					error: 'Passwords do not match',
					email: email as string,
					username: username as string
				});
			}

			const response = await fetch(`${config.apiUrl}/api/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password,
					username
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(400, {
					error: errorData.errors[0].message || 'Failed to create account',
					email: email as string,
					username: username as string
				});
			}

			const data = await response.json();
			return { success: true, data };
		} catch (error) {
			console.error('Signup error:', error);
			return fail(500, {
				error: 'Internal server error'
			});
		}
	}
} satisfies Actions;
