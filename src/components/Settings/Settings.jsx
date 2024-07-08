import { connect } from "react-redux"
import { setDark, setWhite } from "../../redux/settingsReducer"

const Settings = (props) =>{
    return(
        <button onClick={props.dark ? props.setWhite : props.setDark}>сменить тему</button>
    )
}

const mapStateToProps = (state) =>{
    return{
        dark: state.Settings.dark
    }
}

export default connect(mapStateToProps, {setDark, setWhite})(Settings)