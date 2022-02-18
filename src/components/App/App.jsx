import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Input from "../Input/Input.jsx";
import Item from "../Item/Item.jsx";
import Header from "../Header/Header.jsx";
import ItemsController from "../ItemsController/ItemsController.jsx";
import "./App.css";

function App() {
	const [listItems, setListItems] = useState([]);

	// axios GET will recieve information from children / data-base
	const fetchItems = () => {
		console.log("Getting Item Lists");
		axios({
			method: "GET",
			url: "/list",
		})
			.then((response) => {
				console.log("Entire response", response);
				console.log("Our response-data: ", response.data);

				setListItems(response.data);
			})
			.catch((error) => {
				console.log("Error on GET: ", error);
			});
	}; // end of fetchItems

	// will render upon DOM change on client-side
	useEffect(() => {
		console.log("Use In Effect!");
		fetchItems();
	}, []);

	console.log(listItems);
	return (
		<div className='App'>
			<Header />
			<main>
				<Input fetchItems={fetchItems} />

				<h2>Shopping List</h2>
				<ItemsController listItems={listItems} getList={fetchItems} />

				{listItems.map((items) => (
					<Item key={items.id} listItem={items} getList={fetchItems} />
				))}
			</main>
		</div>
	);
} // end of App function

export default App;
