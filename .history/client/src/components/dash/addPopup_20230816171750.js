import './AddPopup.css'

import image from '../../Assets/image-add.png'

const AddPopup = () => {
    return (
    <div className="container pop-container">
        <div className="center-content">
            <div className="row add-image-container">
                <img src={image} className="add-image"/>
            </div>
            <div className='row add-title'> 
                <input type="text" className="add-title-input" placeholder="Title"/>
            </div>
            <div className='row add-description'>
                <textarea className="add-description-input" placeholder="Description"/>
            </div>

            <div className='row add-location'>
                <input type="text" className="add-location-input" placeholder="Location"/>
            </div>
        </div>
    </div>
    )
}

export default AddPopup