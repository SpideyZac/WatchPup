export function load({ cookies }) {
	const authToken = cookies.get('token');

	return {
		authToken
	};
}
