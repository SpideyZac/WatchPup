import { config } from '$lib/config';

export async function load({ params, cookies }) {
	const authToken = cookies.get('token') || null;
	const serviceId = params.id;

	const response = await fetch(`${config.apiUrl}/api/service/requests?serviceId=${serviceId}`, {
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

	const requests = await response.json();

	const requestsPopulated = [];
	for (const request of requests.requests) {
		const response = await fetch(`${config.apiUrl}/api/request?requestId=${request}`, {
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

		const requestPopulated = await response.json();
		requestsPopulated.push(requestPopulated);
	}

	return {
		requests: requestsPopulated
	};
}
