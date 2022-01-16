import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import formSlice from "../store/formSlice";
import classes from './Layout.module.css';
import modelClasses from './Model.module.css';



const Model = () => {

    const [ model, setModel ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = useSelector( state => state.type );
    const modelIds = [];
    const modelUrl = [];
    const models = [];

    const m = useSelector( state => state.model );

    useEffect(() => {
        const fetchModels = async () => {
            const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
            const responseData = await response.data;

            if(responseData.status !== 200){
                throw new Error(responseData.message);
            }

            const modelObj = responseData.data.find( data => data.type === type );
            modelObj.vehicles.forEach( item => modelIds.push(item.id) );

            console.log(modelIds)

            modelIds.forEach( id => {
                const url = 'https://octalogic-test-frontend.vercel.app/api/v1/vehicles/' + id;
                modelUrl.push(url);
            });

            const fetchModel = async (url) => {
                const response = await axios.get(url);
                const responseData = await response.data;

                const modelData = { id: '', name: '' , image: '' };
                modelData.id = responseData.data.id;
                modelData.name = responseData.data.name;
                modelData.image = responseData.data.image;

                models.push(modelData);
                setModel([...models]);
            }

            modelUrl.forEach( url => {
                try {
                    fetchModel(url);
                } catch (e) {
                    console.log(e);
                }
            })

        }

        try {
            fetchModels();
        } catch (e) {
            console.log(e);
        }
    }, [])

    const changeHandler = (e) => {
        dispatch(formSlice.actions.setModel(e.target.value));
        const id = model.find( m => m.name === e.target.value);
        dispatch(formSlice.actions.setId(id.id));
    }


    let modelInput;
    console.log(model);

    modelInput = model.map( (m,index) => <Fragment>
                                            <div>
                                            <h2 className={modelClasses.label}>{m.name}</h2>
                                            <img src={m.image.publicUrl} alt={m.image.key}/>
                                            <input 
                                                type='radio'
                                                name='model'
                                                value={m.name}
                                                onChange={changeHandler}
                                            />
                                            </div>
                                        </Fragment>

        );
    console.log(modelInput);

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/date', {
            replace: true,
        });
    }
    
    return <Fragment>
        <div className={classes.layout}>
        <h1>Choose Vehicle Model</h1>
        <form onSubmit={submitHandler}>
        {modelInput}
        <button className={modelClasses.btn} disabled={m.length === 0} type="submit">Next</button>
        </form>
        </div>
    </Fragment>
}

export default Model;