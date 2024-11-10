import { config } from '$lib/config';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
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
};

export const actions: Actions = {
    default: async ({ request, cookies, params }) => {
        const authToken = cookies.get('token') || null;
        const formData = await request.formData();
        const id = params.id;
        const method = formData.get('method');
        const name = formData.get('name');
        const url = formData.get('url');

        const response = await fetch(`${config.apiUrl}/api/service`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ serviceId: id, method, name, url })
        });

        if (!response.ok) {
            const error = await response.json();
            return {
                error: error.errors[0].message
            };
        }

        return redirect(300, `/service/${id}`);
    }
};