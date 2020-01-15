// In case if some question arise, you can see full code in my test app at the link below 
// [LINK]

import store from './store/store.js'

// function for Notify.vue. Just import to component
export const notification = (message, detailMessage) => {
	let obj = new Object()
	obj['message'] = message
	obj['detailMessage'] = detailMessage
	store.dispatch('navigationModule/set_notification', obj)
}

// functions object for Progress.vue
export const progressUtils = {
	startProgress: (emulateState) => {
		let obj = new Object()
		obj['emulate'] = emulateState
		store.dispatch('navigationModule/start_progress', obj)
	},
	getProgress: () => {
		return store.state.navigationModule['progress']
	},
	setProgress: (progress) => {
		store.dispatch('navigationModule/set_progress', progress)
	},
	finishProgress: () => {
		store.dispatch('navigationModule/finish_progress')
	}
}