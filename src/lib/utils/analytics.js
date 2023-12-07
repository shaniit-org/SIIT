import posthog from 'posthog-js';

export function initAnalytics() {
	posthog.init('phc_EU9JtrzmBCjImKPKqbpfVHJMLwM8ZzkESiygi04e07W', {
		api_host: 'https://shaniit.org'
	});
	posthog.capture('welcome from posthog', { property: 'Hello World' });
}
