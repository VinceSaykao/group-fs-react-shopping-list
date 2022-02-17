import react from 'react';
import axios from 'axios';
import {useState} from 'react';





function InputForm({fetchItems}) {
    
        // use state
    const [newListName, setNewListName] = useState('');
    const [newListQuantity, setNewListQuantity] = useState('');
    const [newListUnit, setNewListUnit] = useState('');




    // Function to add a new list item to the database
    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: '/list',
            data: {
                name: newListName,
                qty: newListQuantity,
                unit: newListUnit,
                purchased: false
            }
        }).then((response) => {
                console.log('Response:', response);

                //function to GET list items
                fetchItems();

                //Clear Inputs & State
                setNewListName('');
                setNewListQuantity('');
                setNewListUnit('');

        }).catch(function (error) {
                console.log('Error on add:', error);
            });
    }


    return(

    <>
        <h2>Add an Item</h2>

        <form onSubmit={handleSubmit}>
                <label>Item:</label>
                <input
                    onChange={(event) => setNewListName(event.target.value)}
                    value={newListName}
                />
                <label>Quantity:</label>
                <input
                    onChange={(event) => setNewListQuantity(event.target.value)}
                    value={newListQuantity} 
                />
                <label>Unit</label>
                <input 
                    onChange={(event) => setNewListUnit(event.target.value)}
                    value={newListUnit}
                />
                <button type="submit">Save</button>
        </form>
    </>

    )
}// end inputForm




export default InputForm;