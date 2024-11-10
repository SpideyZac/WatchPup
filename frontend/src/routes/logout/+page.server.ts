export function load({ cookies }) {
	cookies.set('token', '', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: true,
		expires: new Date(0)
	});
}
