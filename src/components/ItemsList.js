import React from "react";
import Item from "./Item.js"
import { Link } from "react-router-dom";

const ItemList = ({searchName, searchType, searchSlot, setBisList, bisList, accessToken, setGear, gear, setStats, stats}) => {
    // console.log(bisList)
    
    const url = `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&locale=en_US&name.en_US=${searchName}&orderby=id&_page=1&access_token=${accessToken}`

    const [items, setItems] = React.useState(null)

    const getItems = async () =>{
        const response = await fetch(url)
        const data = await response.json()
        setItems(data)
    }

    React.useEffect(() =>{        
        getItems()
        // console.log(searchName)
    }, [url])

    const sortBySlot = (typeArr) =>{
        if(searchSlot !== ""){
            for (let i = 0; i < items.results.length; i++) {
                if(items.results[i].data.inventory_type.type === searchSlot){
                    typeArr.push(items.results[i])
                }
            }
        }
    }

    const sortByType = (typeArr) =>{
        if(searchType !== ""){
            for (let i = 0; i < items.results.length; i++) {
                if(items.results[i].data.item_subclass.name.en_US === searchType){
                    typeArr.push(items.results[i])
                }                    
            }
        }
    }

    const sortByTypeAndSlot = (typeArr) =>{
        if(searchType !== "" && searchSlot !== ""){
            for (let i = 0; i < items.results.length; i++) {
                if(items.results[i].data.item_subclass.name.en_US === searchType){
                    if(items.results[i].data.inventory_type.type === searchSlot){
                        typeArr.push(items.results[i])
                    }
                                            
                }
            }
        }    
    }

    const loaded = () =>{
        // console.log(items.results)
        const typeArr = []

        //checks if an armor type has been chosen and filters out items that do not match that name.
        
        if(searchType !== "" && searchSlot !== ""){
            sortByTypeAndSlot(typeArr)
            return(
                <div >
                    {typeArr.map((item) =>{
                        // console.log(items)
                        return(
                            <>
                                <Item item={item.data} 
                                    accessToken={accessToken} 
                                    setBisList={setBisList} 
                                    bisList={bisList} 
                                    gear={gear} 
                                    setGear={setGear} 
                                    setStats={setStats}
                                    stats={stats}/>
                            </>
                        )         
                    })}
                </div>
            )
        }
        else if(searchType !== "" && searchSlot === "")
        {
            sortByType(typeArr)
            return(
                <div >
                    {typeArr.map((item) =>{
                        // console.log(items)
                        return(
                            <>
                                <Item item={item.data} 
                                    accessToken={accessToken} 
                                    setBisList={setBisList} 
                                    bisList={bisList} 
                                    gear={gear} 
                                    setGear={setGear} 
                                    setStats={setStats}
                                    stats={stats}/>
                            </>
                        )         
                    })}
                </div>
            )
        }
        else if(searchType === "" && searchSlot !== "")
        {
            sortBySlot(typeArr)
            return(
                <div >
                    {typeArr.map((item) =>{
                        // console.log(items)
                        return(
                            <>
                                <Item item={item.data} 
                                    accessToken={accessToken} 
                                    setBisList={setBisList} 
                                    bisList={bisList} 
                                    gear={gear} 
                                    setGear={setGear} 
                                    setStats={setStats}
                                    stats={stats}/>
                            </>
                        )         
                    })}
                </div>
            )
        }
        else{
            return(
                <div >
                    {items.results.map((item) =>{
                        // console.log(item)
                        return(
                            <>
                                <Item item={item.data} 
                                    accessToken={accessToken} 
                                    setBisList={setBisList} 
                                    bisList={bisList} 
                                    gear={gear} 
                                    setGear={setGear} 
                                    setStats={setStats}
                                    stats={stats}/>
                            </>
                        )         
                    })}
                </div>
            )

        }

        
        //returns all items that match the search name
        
        
    }

    const loading = () =>{
        <h1>LOADING...</h1>
    }
    return (
        <>
            <div className="searchUI">
                <div className="itemList">
                    <div className="itemNav">      
                        <h4>ICON</h4>
                        <h4>NAME</h4>
                        <h4>TYPE</h4>
                        <h4>ADD</h4>
                    </div>
                    <div className="list">
                        {items ? loaded() : loading()}
                    </div>
                    
                </div>
                {/* <div className="itemInspector">
                    <h1>Item Name</h1>
                    <p>stat</p>
                    <p>stat</p>
                    <p>stat</p>
                    <p>stat</p>
                </div> */}
            </div>

        </>
    );
};

export default ItemList