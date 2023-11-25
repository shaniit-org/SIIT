/** @type {import('./$types').RequestHandler} */
export async function GET() {
	/*
    const query = `{
          'term': *[_type == 'random_terms'][0..10]{title,description,slug,_createdAt},
    }`;
    // create file named dateSync
    const file = `dateSync`;
    const fileExists = fs.existsSync(file);
    if (!fileExists) {
        fs.writeFileSync(file, new Date().toISOString());
    }
    // get time difference between now and last sync
    let lastSync = fs.readFileSync(file, 'utf8');
    let lastSyncDate = new Date(lastSync);
    let now = new Date();
    let diff = now.getTime() - lastSyncDate.getTime();
    let diffHours = Math.floor(diff / 1000 / 60 / 60);
    // if more than 24 hours, sync
    if (diffHours > 24) {
        console.log('syncing');
    }
    console.log('not syncing');
    // if less than 24 hours, do nothing
*/
	return new Response(
		JSON.stringify({
			status: 200,
			body: 'term'
		})
	);
}
