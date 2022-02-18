import react from 'react';
import axios from 'axios';
import {useState} from 'react';
import Swal from 'sweetalert2';





function InputForm({fetchItems}) {
    
        // use state
    const [newListName, setNewListName] = useState('');
    const [newListQuantity, setNewListQuantity] = useState('');
    const [newListUnit, setNewListUnit] = useState('');




    // Function to add a new list item to the database
    const handleSubmit = (event) => {
        event.preventDefault();

        if (newListUnit.length > 20){
            Swal.fire({
                icon: 'error',
                title: 'Unit Too Long',
                text: '20 Character Max for Units!',
              })
            return;
        }

        if (newListName.length > 80){
            Swal.fire({
                icon: 'error',
                title: 'Name Too Long',
                text: '80 Character Max for Units!',
              })
            return;
        }

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
                // Works!
                if(error.toString().includes('999')){
                    alert('Server Requires All Inputs!')
                }
            });
    }


    return(

    <>
        <h2>Add an Item</h2>
<div id="input-stuff">
        <form onSubmit={handleSubmit}>
                <label>Item</label>
                <input
                    onChange={(event) => setNewListName(event.target.value)}
                    value={newListName} placeholder="Avocado..."
                    required/>
                <label>Quantity</label>
                <input
                    type="number"
                    onChange={(event) => setNewListQuantity(event.target.value)}
                    value={newListQuantity}  placeholder="3.00..."
                    required/>
                <label>Unit</label>
                <input 
                    onChange={(event) => setNewListUnit(event.target.value)}
                    value={newListUnit} placeholder="2 lbs..."
                    required/>
                <button type="submit">Save</button>
        </form>
        </div>
    </>

    )
}// end inputForm




export default InputForm;