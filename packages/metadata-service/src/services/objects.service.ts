"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "objects",
	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		get: {
			rest: {
				method: "GET",
				path: "/object"
			},
			async handler() {
				return "Get Object";
			}
		},
		add:{
			handler(ctx){
				console.log("addObject", ctx.params);
				this.broker.emit("$object.registered", {name: 'test'});
				return true;
			}
		},
		change:{

		},
		delete:{

		},
		verify:{
			
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		setInterval(()=>{
			this.broker.call("appContracts.find", {name: 'main 1'}).then(res2=>{console.log(res2)})
			// this.broker.call("$node.services").then(res => console.log(res));
		}, 10000)
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};