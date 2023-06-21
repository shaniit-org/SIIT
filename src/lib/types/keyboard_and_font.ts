export interface KeyboardOrFont {
	title: string;
	description: string;
	type: 'keyboard' | 'font';
	os: OS;
	downloadlink: string;
}

type OS = 'mac' | 'windows' | 'linux' | 'ios' | 'android';

export type KeyboardOrFontList = Partial<{
	[key in OS]: KeyboardOrFont[];
}>;
