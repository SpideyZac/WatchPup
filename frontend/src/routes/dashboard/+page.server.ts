import { redirect } from '@sveltejs/kit';

import { config } from '$lib/config.js';

export async function load({ cookies }) {
    const authToken = cookies.get('token');

    if (!authToken) {
        return redirect(300, '/login');
    }

    const response = await fetch(`${config.apiUrl}/api/service/owned`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        return redirect(300, '/');
    }

    const services = (await response.json()).services;

    return {
        services,
    }
}