import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const authToken = cookies.get('token');

	if (authToken) {
		redirect(300, '/dashboard');
	}
}
