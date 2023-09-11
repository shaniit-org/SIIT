import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { deskTool } from 'sanity/desk';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schema';
import { newDeskStructure } from './utils/deskStructure';
import { contentGraphView } from 'sanity-plugin-graph-view';

export default defineConfig({
	name: 'default',
	title: 'ShanIIT',
	projectId: 'za3lzlmc',
	dataset: 'live',
	basePath: '/studio',
	plugins: [
		deskTool({
			structure: newDeskStructure
		}),
		visionTool(),
		contentGraphView({}),
		unsplashImageAsset(),
		codeInput()
	],
	schema: {
		types: schemaTypes
	}
});
