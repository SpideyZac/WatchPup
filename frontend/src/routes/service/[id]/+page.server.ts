import { config } from '$lib/config';

export async function load({ params, cookies }) {
	const authToken = cookies.get('token') || null;
	const id = params.id;

	const response = await fetch(`${config.apiUrl}/api/service?serviceId=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	});

	if (!response.ok) {
		const error = await response.json();
		return {
			error: error.errors[0].message
		};
	}

	const service = await response.json();

	return {
		service
	};
}
