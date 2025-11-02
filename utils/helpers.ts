export const slugify = (text: string): string => {
	return text
		.toString()
		.trim()
		.toLowerCase()
		.replace(/&/g, ' and ')
		.normalize('NFD') // Normalize unicode characters
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters (keep spaces and hyphens)
		.replace(/[_\s]+/g, '-') // Replace spaces/underscores with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove hyphens from start and end
};

// MV Signature => mv-signature


/**
 * find all toLowerCase().replace and replace it by the slugify 
 * 
 */

export const slugEquals = (
	a: string | null | undefined,
	b: string | null | undefined
): boolean => {
	return slugify(String(a ?? '')) === slugify(String(b ?? ''));
};

export const ensureFilterNameFromSlug = (
	slugValue: string | null | undefined,
	items: Array<{ name: string }>
): string | null => {
	if (!slugValue) return null;
	const target = slugify(slugValue);
	const match = items.find((item) => slugify(item.name) === target);
	return match ? match.name : null;
};