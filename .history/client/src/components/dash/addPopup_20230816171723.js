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

            </div>
            <div className='row add-description'>
            </div>

            <div className='row add-location'>
                
            </div>
        </div>
    </div>
    )
}

export default AddPopup