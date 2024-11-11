import { config } from '$lib/config';

export async function load({ params, cookies }) {
	const authToken = cookies.get('token') || null;
	const serviceId = params.id;

	const response = await fetch(`${config.apiUrl}/api/service`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ serviceId })
	});

	if (!response.ok) {
		const error = await response.json();
		return {
			error: error.errors[0].message
		};
	}
}
