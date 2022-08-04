import { Label } from "../styles";
import { useState } from "react";

function MiniCard({ exercise, handleChange }) {
  const [showImage, setShowImage] = useState(false);

    const [showImage, setShowImage] = useState(false)

    useEffect(() => {
        setShowImage(false)
    },[exercise])
   
    return(
        <Label key={exercise.id} style={{ marginTop: "30px", border: 'solid 1px', borderRadius: '6px', height: 'fit-content', width: '265px'}}>
            <input
              type="checkbox"
              value={exercise.name}
              onChange={(e) => {
                handleChange(e.target.value)
              }}
            ></input>
            <span>{exercise.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Label onClick={() => setShowImage(!showImage)} style={{ background: '#d3d3d3', borderRadius: '6px', cursor: 'pointer', padding: '0px 10px 0px 10px', width: 'fit-content', marginLeft: '3px'}}>{showImage === false ? "Quick View" : "Hide"}</Label>
            <img src={exercise.image_url} alt={exercise.name} style={ { display: showImage === false ? 'none' : '' , width: '100px', height: '100px', margin: '10px' } }></img>
        </Label>
    )
}

export default MiniCard;
