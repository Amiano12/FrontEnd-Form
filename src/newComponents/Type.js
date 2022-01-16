import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import formSlice from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import classes from './Layout.module.css';
import typeClasses from './Type.module.css';

const Type = () => {
    const [ typeState, setTypeState ] = useState(null);

    const wheel = useSelector( state => state.wheels );
    const type = useSelector( state => state.type );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(wheel);

    useEffect(() => {

        const fetchType = async () => {
            const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
            const responseData = await response.data;

            if(responseData.status !== 200){
                throw new Error(responseData.message);
            }

            const typeObj = responseData.data.find( data => data.wheels === Number(wheel) );
            const type = typeObj.type;
            setTypeState(type);

        }

        try {
            fetchType();
        } catch (e) {
            console.log(e);
        }

    }, [])

    const changeHandler = (e) => {
        dispatch(formSlice.actions.setType(e.target.value));

        //set type in formSlice dispatch
    }

    const submitHandler = (e) => {
        //navigate to the model page
        e.preventDefault();
        navigate('/model', {
            replace: true,
        });
    }

    return <Fragment>
        <div className={classes.layout}>
        <h1>Choose Number Of Wheels</h1>
        <form onSubmit={submitHandler}>
            <h2 className={typeClasses.label}>{typeState}</h2>
            <input type='radio' name='type' value={typeState} onChange={changeHandler}/>
            <button disabled={type.length === 0} className={typeClasses.btn} type='submit'>Next</button>
        </form>
        </div>
    </Fragment>
}

export default Type;