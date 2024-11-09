import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { config } from '$lib/config';

export async function load({ cookies }) {
	if (!cookies.get('token')) {
		return redirect(300, '/login');
	}
}

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		try {
			const formData = await request.formData();
			const method = formData.get('method');
			const name = formData.get('name');
			const url = formData.get('url');

			const authToken = cookies.get('token');

			const response = await fetch(`${config.apiUrl}/api/service`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`
				},
				body: JSON.stringify({
					method,
					name,
					url
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, {
					error: errorData.errors[0].message || 'Failed to create service',
					method,
					name,
					url
				});
			}
		} catch (error) {
			console.error('Create service error:', error);
			return fail(500, {
				error: 'Internal server error'
			});
		}

		return redirect(300, '/dashboard');
	}
} satisfies Actions;
