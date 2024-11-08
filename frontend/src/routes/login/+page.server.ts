import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { config } from '$lib/config';

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		try {
			const formData = await request.formData();
			const user = formData.get('user');
			const password = formData.get('password');

			const response = await fetch(`${config.apiUrl}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user,
					password
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(400, {
					error: errorData.errors[0].message || 'Failed to create account',
					user: user as string
				});
			}

			const data = await response.json();
			cookies.set('token', data.accessToken, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: true,
				expires: new Date(config.accessTokenExpiresIn + Date.now())
			});
			return { success: true, data };
		} catch (error) {
			console.error('Signup error:', error);
			return fail(500, {
				error: 'Internal server error'
			});
		}
	}
} satisfies Actions;
