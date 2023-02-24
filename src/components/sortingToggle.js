import React, { useState } from 'react';

const SortingToggle = ({ todoList, setTodoList }) => {
    const [toggleAscDescSorting, setToggleAscDescSorting] = useState(false);
    const listToBeSorted = ([...todoList]);
    console.log("toggle line 6", toggleAscDescSorting)

    const handleSortArcDesc = (e) => {
        if (toggleAscDescSorting) {
            listToBeSorted.sort((a, b) => {
            return b.createdTime.localeCompare(a.createdTime); 
            });
        } else {
            listToBeSorted.sort((a, b) => {
            return a.createdTime.localeCompare(b.createdTime);  
            });
        }
        setToggleAscDescSorting(true);
        setTodoList(listToBeSorted);
        console.log('this is2', toggleAscDescSorting)
    }

    // the second set of buttons that work if not containing the line that we require for updating the list with the sorted list...

    const handleDescending = () => {
        listToBeSorted.sort((a, b) => {
        return b.createdTime.localeCompare(a.createdTime);  
        });
        setTodoList(listToBeSorted); // if deactivating this line - the toggle works (it rerenders an additional time..?)
        console.log('in handleDescending(setToggle to false)', toggleAscDescSorting)
        setToggleAscDescSorting(false);
    }

    const handleAscending = () => {
        listToBeSorted.sort((a, b) => {
        return a.createdTime.localeCompare(b.createdTime);  
        });
        setTodoList(listToBeSorted); // if deactivating this line - the toggle works 
        console.log('in handleAscending(setToggle to true)', toggleAscDescSorting)
        setToggleAscDescSorting(true);
    }

    return (
        <>
            <div>
                <label>Sorted by created time:</label> 
                <button onClick={handleSortArcDesc}>{toggleAscDescSorting ? 'Desc' : 'Asc'}</button>     
            </div>
                
            <hr />
            <button onClick={handleAscending}>Ascending</button>
            <button onClick={handleDescending}>Descending</button>
        </>
        
    )
}

export default SortingToggle;
