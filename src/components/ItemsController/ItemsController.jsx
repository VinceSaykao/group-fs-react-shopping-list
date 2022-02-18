import axios from "axios";

function ItemsController({ listItems, getList }) {
	const clearItems = () => {
		for (let item of listItems) {
			axios.delete();
		}
	};

	const resetItems = () => {
		for (let item of listItems) {
			const data = {
				purchased: false,
			};
			axios.put(`/list/${item.id}`);
		}
	};

	return (
		<>
			<button>Reset</button>
			<button>Clear</button>
		</>
	);
}

export default ItemsController;
