import React from "react";
import "./Card.style.css";

import SearchIcon from "@material-ui/icons/Search";
import LanguageSharp from '@material-ui/icons/LanguageSharp';
import PhoneIphoneSharp from '@material-ui/icons/PhoneIphoneSharp';

const Card = ({ place,selected,refProp}) => {
  console.log(place);
  const image = place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';
  const title = place.name?(place.name):(place.parent_display_name);
  const address = place?.address;
  const phone = place.phone;
  const rating = Number(place.rating);
  const price = place.price;
  const ranking = place.ranking;
  //const siteLink=place?.web?.web.url;
  const awardImg = place?.award?.map((award) => <img src={award} alt="img" />);
  //const cuisines = place?.cuisine?.map((name) =>  <div><small>{name}</small></div> );

  if(selected) refProp?.current?.scrollIntoView({behavior:'smooth',block:'start'});

  return (
     <div className="work__wrapper">
  
  <div className="img">
    <img src={image} alt="img" />
  </div>  
  
  <div className='infobox'>
    
    <div className='top'>
    <div>{title}</div> 
      <div className='icon'>
        <LanguageSharp className="linkIcon"  onClick={() => window.open(place.web_url, '_blank')}/>
        <PhoneIphoneSharp className="linkIcon"/>
      </div>
    </div>
    
    <div className='bottom'>
      
      <div className='Rating'>
        <div className='leftitle'>Ranking</div>
        <div className='rightcontent'>{ranking}</div> 
      </div> 
      
      <div className='Price'>
        <div className='leftitle'>Rating</div>
        <div className='rightcontent'>{rating}</div> 
      </div> 
      
      <div className='Ranking'>
        <div className='leftitle'>Price</div>
        <div className='rightcontent'>{price}</div> 
      </div> 
      

        <div className='Cuisines'>
      {place?.cuisine?.map(({ name }) => (
          <button key={name} size="small" label={name} id='cuisines' className=''><small>{name}</small></button>
     
        ))}
         </div>
      
      
</div>
    
</div>
    </div>
  );
};

export default Card;
