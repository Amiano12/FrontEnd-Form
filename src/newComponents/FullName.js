import { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import formSlice from "../store/formSlice";
import classes from './Layout.module.css';
import nameClass from './FullName.module.css';

const FullName = () => {
    const [fIsTouched , setFIsTouched] = useState(false);
    const [lIsTouched , setLIsTouched] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const firstName = useSelector( state => state.firstName );
    const lastName = useSelector( state => state.lastName );

    let fIsValid = firstName.trim() !== '';
    let lIsValid = lastName.trim() !== '';

    let fError = !fIsValid && fIsTouched;
    let lError = !lIsValid && lIsTouched;

    let btnIsInValid = !fIsValid || !lIsValid ;

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/wheels' , { replace: true });
    }

    const fChangeHandler = (e) => {
        dispatch(formSlice.actions.setFirstName(e.target.value));
    }

    const fBlurHandler = (e) => {
        setFIsTouched(true);
    }

    const lChangeHandler = (e) => {
        dispatch(formSlice.actions.setLastName(e.target.value));
    }

    const lBlurHandler = (e) => {
        setLIsTouched(true);
    }

    return <Fragment>
        <div className={classes.layout}>
            <form onSubmit={submitHandler}>

                <h1>First, what's your name ?</h1>

                <label htmlFor='firstName'  className={nameClass.label} >First Name</label>
                <input type='text' name='firstName'  className={nameClass.input} onBlur={fBlurHandler} onChange={fChangeHandler} />
                { fError && <p className={nameClass.error}>Please Enter A Valid First Name !</p>}

                <label htmlFor='lastName'  className={nameClass.label} >Last Name</label>
                <input type='text' name='lastName'  className={nameClass.input} onBlur={lBlurHandler} onChange={lChangeHandler} />
                { lError && <p className={nameClass.error}>Please Enter A Valid Last Name !</p>}
                

                <button disabled={btnIsInValid} className={nameClass.btn} type='submit'>Next</button>

            </form>
        </div>    
        </Fragment>
}

export default FullName;