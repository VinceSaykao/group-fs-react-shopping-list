import axios from "axios";

function ItemsController({ listItems, getList }) {
	const clearItems = () => {
		for (let item of listItems) {
			axios.delete();
		}
	};

	const resetItems = () => {
		let isDone = new Array(listItems.length).fill(false);
		console.log(isDone);
		for (let i = 0; i < listItems.length; i++) {
			const item = listItems[i];
			const data = {
				purchased: false,
			};
			axios
				.put(`/list/${item.id}`, data)
				.then((response) => {
					isDone[i] = true;
					if (!isDone.includes(false)) {
						getList();
					}
				})
				.catch((err) => {
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
