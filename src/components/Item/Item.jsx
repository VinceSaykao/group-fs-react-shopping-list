import axios from "axios";

function Item({ listItem, getList }) {
	// Runs when delete is clicked, should take in the ID for SQL Delete Function
	const handleDelete = (listItem) => {
		console.log("Inside Item Delete");

		axios
			.delete(`/list/${listItem}`)
			.then((res) => {
				console.log("Deleted, this is response", res);
				res.sendStatus(200);
				getList();
			})
			.catch((err) => {
				console.log("Error on delete", err);
				res.sendStatus(500);
			});
	};

	// Runs when buy is clicked, should take in the ID number for the SQL table
	const handleBuy = (listItem) => {
		console.log("Inside Item Buy");
		let purchased = !listItem.purchased;

		axios
			.put(`/list/${listItem}`, { purchased: purchased })
			.then((res) => {
				console.log("Updated purchase, this is response", res);
				res.sendStatus(200);
				getList();
			})
			.catch((err) => {
				console.log("Error on purchase update", err);
				res.sendStatus(500);
			});
	};

	return (
		<>
			<div key={listItem.id}>
				<p>{listItem.name}</p>
				<p>
					{listItem.qty} {listItem.unit}
				</p>
				{listItem.purchased ? (
					<button onClick={() => handleBuy(listItem.id)}>Buy</button>
				) : (
					<p>Purchased</p>
				)}
				<button onClick={() => handleBuy(listItem.id)}>Buy</button>
				<button onClick={() => handleDelete(listItem.id)}>Remove</button>
			</div>
		</>
	);
}

export default Item;
