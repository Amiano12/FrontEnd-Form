import { Fragment, useEffect, useState } from "react";

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import formSlice from "../store/formSlice";
import { useNavigate } from 'react-router-dom';
import classes from './Layout.module.css';
import wheelClass from './Wheels.module.css';


const Wheels = () => {
    const [ wheelState, setWheelState ] = useState([]);
    let wheels = [];

    const wheel = useSelector( state => state.wheels );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {

        const fetchWheels = async () => {
            const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
            const responseData = await response.data;

            if(responseData.status !== 200){
                throw new Error(responseData.message);
            }

            responseData.data.forEach(element => {
                wheels.push(element.wheels);
            });
            console.log(wheels);

            setWheelState([...wheels]);

        }

        try {
            fetchWheels();
        } catch (e) {
            console.log(e);
        }

    }, [])

    const changeHandler = (e) => {
        dispatch(formSlice.actions.setWheels(e.target.value));
    }


    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/type', {
            replace: true,
        })

    }

    const wheelInput = wheelState.map( (wheel, index) => {
                                                            return <Fragment>
                                                                        <h2 className={wheelClass.label}>{wheel}</h2>
                                                                        <input
                                                                           type='radio'
                                                                           name='wheels'
                                                                           key={index}
                                                                           onChange={changeHandler}
                                                                           value={wheel}
                                                                           className={wheelClass.radio}
                                                                        />
                                                                    </Fragment>
                                                        }
                                     );



    return <Fragment>
        <div className={classes.layout}>
        <h1>Choose Number Of Wheels</h1>
        <form onSubmit={submitHandler} >
            {wheelInput}
            <button disabled={wheel.length === 0} className={wheelClass.btn} type="submit">Next</button>
        </form>
        </div>
    </Fragment>
}

export default Wheels;