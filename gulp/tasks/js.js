import browserSync from 'browser-sync'
import * as build from 'esbuild'

export const js = () => {
	return Promise.all([
		build.build({
			entryPoints: [app.path.src.js],
			outfile: app.path.build.js + '/app.js',
			bundle: true,
			sourcemap: false,
		}),
		build.build({
			entryPoints: [app.path.src.js],
			outfile: app.path.build.js + '/app.min.js',
			bundle: true,
			minify: true,
			sourcemap: false,
		}),
	])
		.then(() => {
			browserSync.reload()
		})
		.catch(err => {
			console.error('Помилка збірки JavaScript:', err)
		})
}
