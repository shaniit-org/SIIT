export interface KeyboardOrFont {
	title: string;
	description: string;
	type: 'keyboard' | 'font';
	os: OS;
	downloadlink: string;
}

type OS = 'mac' | 'windows' | 'linux' | 'ios' | 'android';

export type KeyboardOrFontList = Partial<{
	seo: BaseMetaData;
	linux: KeyboardOrFont[] | string;
	windows: KeyboardOrFont[] | string;
	ios: KeyboardOrFont[] | string;
	mac: KeyboardOrFont[] | string;
	android: KeyboardOrFont[] | string;
}>;
