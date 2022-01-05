import React,{useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import './Header.style.css'
import SearchIcon from '@material-ui/icons/Search';


const Header = ({setCoordinates}) => {
    const[autoComplete,setAutoComplete]=useState();

    const onLoad=(autoC) =>setAutoComplete(autoC);
    const onPlaceChanged=()=>{
        const lat=autoComplete.getPlace().geometry.location.lat();
        const lng=autoComplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    } 

    return (
        <div className='nav'>
        <div className='nav__h4'>
        <h2>Discover Around</h2>
        </div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="nav__input">
        <input type="text" placeholder='Search here...' />
        <SearchIcon className='nav__searchIcon'/>
        </div>
        </Autocomplete> 
        
           
        </div>
    )
}

export default Header
