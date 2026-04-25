export const parseCookieValue = (
	cookieHeader: string | null,
	cookieName: string
): string | undefined => {
	if (!cookieHeader) return undefined;

	for (const cookie of cookieHeader.split(';')) {
		const [rawKey, ...rawValueParts] = cookie.trim().split('=');
		if (rawKey !== cookieName || rawValueParts.length === 0) continue;

		const rawValue = rawValueParts.join('=');
		try {
			return decodeURIComponent(rawValue).toLowerCase();
		} catch {
			return rawValue.toLowerCase();
		}
	}

	return undefined;
};

export const extractPreferredLocaleFromAcceptLanguage = (
	header: string | null,
	toCode: (tag: string) => string | undefined
): string | undefined => {
	if (!header) return undefined;

	const candidates = header
		.split(',')
		.map((entry) => {
			const [tag, q = '1'] = entry.trim().split(';q=');
			return { tag, q: Number(q) };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of candidates) {
		const parsed = toCode(tag);
		if (parsed) return parsed;
	}

	return undefined;
};
