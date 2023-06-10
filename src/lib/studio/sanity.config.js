import { defineConfig } from 'sanity';
import { newDeskStructure } from './utils/deskStructure';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema';

export default defineConfig({
	name: 'default',
	title: 'ShanIIT',
	projectId: 'uttlgql7',
	dataset: 'production',

	basePath: '/studio',
	plugins: [
		deskTool({
			structure: newDeskStructure
		}),
		visionTool()
	],
	schema: {
		types: schemaTypes
	}
});
