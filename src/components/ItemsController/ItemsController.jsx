import axios from "axios";
import Swal from "sweetalert2";

function ItemsController({ listItems, getList }) {
	const checkClear = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "green",
			cancelButtonColor: "red",
			confirmButtonText: "Yes, delete them!",
		}).then((result) => {
			if (result.isConfirmed) {
				clearItems();
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
			}
		});
	};

	const clearItems = () => {
		// set an array to check which items have returned values
		let isDone = new Array(listItems.length).fill(false);
		console.log(isDone);

		// loop through listItems to update
		for (let i = 0; i < listItems.length; i++) {
			const item = listItems[i];

			// send ajax to the server
			axios
				.delete(`/list/${item.id}`)
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
		<div id="global-button">
			<button id="reset" onClick={resetItems}>Reset</button>
			<button id="clear" onClick={checkClear}>Clear</button>
			</div>
		</>
	);
}

export default ItemsController;
