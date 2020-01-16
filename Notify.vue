<template>
<!-- 
	In case if some question arise, you can see full code in my test app at the link below 
	https://github.com/Bogdan-id/alphabet-version-2  
	or my test App - https://distracted-bohr-49d2d7.netlify.com/
-->
<v-hover v-slot:default="{ hover }">
	<v-snackbar
		absolute
		v-model="state"
		@mouseenter="timeOutClear()"
		@mouseleave="timeOutSet()"
		style="z-index: 3000"
		class="snack-bar text-center d-flex"
		ref="snackbar"
		:style="!hover && opacity ? 'opacity: 0.9' : 'opacity: 1'"
		:timeout="0"
		top
		right
		>
		{{ message }}
		<div class="d-inline-flex">
			<v-dialog
				persistent
				v-model="dialog"
				max-width="450px"
				>
				<template v-slot:activator="{ on }">
					<v-btn
						icon
						v-on="on"
						color="green"
						>
						<v-icon v-text="'mdi-information-outline'">
						</v-icon>
					</v-btn>
					<v-btn
						class="ml-1"
						@click="animateAndClose()"
						color="blue lighten-2"
						text
						>
						close
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="justify-center">
						Some title here
					</v-card-title>
					<v-card-text>
						{{ detailMessage }}
					</v-card-text>
					<v-card-actions>
						<v-spacer>
						</v-spacer>
						<v-btn
							text
							@click="closeDialog()"
							>
							close
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</v-snackbar>
</v-hover>
</template>

<script>
export default {
	props: ['state'],
	data: () => ({
		el: null,
		dialog: false,
		timer: null,
		delay: 5000,
		opacity: false,
		delayToOpacity: 3000,
	}),
	computed: {
		// Need Vuex
		message() {
			return this.$store.state.navigationModule.snackbar.notifications[0].message
		},
		detailMessage() {
			return this.$store.state.navigationModule.snackbar.notifications[0].detailMessage
		}
	},
	methods: {
		animate(el, eff, callback) {
			el.classList.add('animated', eff)
			el.addEventListener('animationend', function deleteAnimation() {
				el.classList.remove('animated', eff)
				el.removeEventListener('animationend', deleteAnimation)
				typeof callback === 'function' ? callback() : false
			})
		},
		animateAndClose() {
			new Promise(resolve => {
				this.animate(this.el, 'bounceOutRight')
				resolve()
			}).then(() => {
				this.$store.dispatch('navigationModule/close_notification')
			})
		},
		setOpacity() {
			this.opacity = false
			setTimeout(() => {
				this.opacity = true
			}, this.delayToOpacity)
		},
		closeDialog() {
			this.dialog = false
		},
		timeOutSet() {
			if(!this.dialog){
				this.setOpacity()
				this.timer = setTimeout(() => {
					this.animateAndClose()
				}, this.delay)
			}
		},
		timeOutClear() {
			clearTimeout(this.timer)
			this.timer = null
		}
	},
	watch: {
		dialog(val) {
			val && this.timer !== null ? this.timeOutClear() : this.timeOutSet()
		}
	},
	mounted() {
		this.el = this.$refs.snackbar.$el
		this.animate(this.el, 'bounceInRight')
		this.timeOutSet()
	},
}
</script>

<style scoped>
	.snack-bar {
		transition: all 0.6s;
	}
</style>