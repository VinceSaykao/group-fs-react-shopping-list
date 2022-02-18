import axios from "axios";

function ItemsController({ listItems, getList }) {
	const clearItems = () => {
		for (let item of listItems) {
			axios.delete();
		}
	};

	const resetItems = () => {
		// set an array to check which items have returned values
		let isDone = new Array(listItems.length).fill(false);
		console.log(isDone);

		// loop through listItems to update
		for (let i = 0; i < listItems.length; i++) {
			const item = listItems[i];

			// we are resetting the purchased value to false on all the items
			const data = {
				purchased: false,
			};

			// send ajax to the server
			axios
				.put(`/list/${item.id}`, data)
				.then((response) => {
					// tell the function that this call is finished
					isDone[i] = true;
					// if all the calls to the server have returned, re-render the list
					if (!isDone.includes(false)) {
						getList();
					}
				})
				.catch((err) => {
					// handle errors
					console.error("Issue with update client:", err);
				});
		}
	};

	return (
		<>
			<button onClick={resetItems}>Reset</button>
			<button>Clear</button>
		</>
	);
}

export default ItemsController;
