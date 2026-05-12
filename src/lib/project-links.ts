export function getProjectHref(slug: string): string {
	return `/project/${encodeURIComponent(slug)}`
}
