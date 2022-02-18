import axios from "axios";
import Swal from 'sweetalert2'

function Item({ listItem, getList }) {
    
	// Runs when delete is clicked, should take in the ID for SQL Delete Function
	const handleDelete = (listItem) => {
		console.log("Inside Item Delete", listItem);


		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.isConfirmed) {
				axios
				.delete(`/list/${listItem}`)
				.then((result) => {
					console.log("Deleted, this is response", result);
	
					// 
					getList();
				})
				.catch((err) => {
					console.log("Error on delete", err);
	
				});
			  Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			  )
			}
		  })
	};

	// Runs when buy is clicked, should take in the ID number for the SQL table
	const handleBuy = (listItem) => {
		console.log("Inside Item Buy", listItem);
		let purchasedFlip = !listItem.purchased;

		axios
			.put(`/list/${listItem.id}`, { purchased: purchasedFlip })
			.then((result) => {
				console.log("Updated purchase, this is response");
                // Get Updated list, might need rename? 
				getList();
			})
			.catch((res) => {
				console.log("Error on purchase update");
			});
	};

	return (
		<>
		<div id="item-stuff">
			<div key={listItem.id}>
				<p>{listItem.name}</p>
				<p>
					{listItem.qty} {listItem.unit}
				</p>
				{listItem.purchased ? (
					<p>Purchased</p>
				) : (
					<button onClick={() => handleBuy(listItem)}>Buy</button>
				)}
				<button onClick={() => handleDelete(listItem.id)}>Remove</button>
			</div>
			</div>
		</>
	);
}

export default Item;
