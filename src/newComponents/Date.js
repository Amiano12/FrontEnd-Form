import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import formSlice from "../store/formSlice";
import classes from './Layout.module.css';

const Date = () => {
    const [bookedStart, setBookedStart] = useState(null);
    const [bookedEnd, setBookedEnd] = useState(null);

    const id = useSelector( state => state.id );
    const dispatch = useDispatch();

    const url = 'https://octalogic-test-frontend.vercel.app/api/v1/bookings/' + id;

    useEffect(() => {
        const fetchDate = async () => {
            const response = await axios.get(url);
            const responseData = await response.data;

            if(responseData.status !== 200){
                throw new Error(responseData.message);
            }
            const bookingObj = responseData.data.find( b => b.vehicleId === id);

            setBookedStart(bookingObj.startDate);
            setBookedEnd(bookingObj.endDate);
           
        }

        try {
            fetchDate();
        } catch (e) {
            console.log(e);
        }

    }, [])

    console.log('start :' + bookedStart);
    console.log('end :' + bookedEnd);

    const onChange = (day) => {
        dispatch(formSlice.actions.setStartDate(day.startDate.toISOString()));
        dispatch(formSlice.actions.setEndDate(day.endDate.toISOString()));
    }

    const startDate = useSelector( state => state.startDate );
    const endDate = useSelector( state => state.endDate );
    const firstName = useSelector( state => state.firstName );
    const lastName = useSelector( state => state.lastName );
    const model = useSelector( state => state.model );
    const type = useSelector( state => state.type );
    const wheels = useSelector( state => state.wheels );

    const bookDetails = {
        firstName,
        lastName,
        wheels,
        type,
        model,
        startDate,
        endDate,
    }
    

    const clickHandler = () => {
        console.log(bookDetails);
    }

    return <Fragment>
        <div className={classes.layout}>
            <h1>Select Booking Dates</h1>
            <DateRangePickerComponent id='dateRange' min={bookedEnd} change={onChange} />
            <button disabled={startDate.length === 0 || endDate.length === 0} onClick={clickHandler} />
        </div>
        </Fragment>
}

export default Date;