import './ViewFullImage.css'
import CloseIcon from '@mui/icons-material/Close';
const ViewFullImage =(props)=>{
    return(
        <div className="container-viewFullImage">
            <img src={props.url}/>
            <CloseIcon className="btn-close" onClick={()=>props.onClick()}/>
        </div>
    )
}
export default ViewFullImage