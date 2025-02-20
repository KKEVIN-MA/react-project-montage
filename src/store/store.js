import { configureStore } from "@reduxjs/toolkit";
import formInfoSlice from '../redux/formInfoSlice';
import rechercheClientSlice from '../redux/recherchClientSlice';
import addUserSlice from '../redux/addUserSlice';

// Create the Redux store
const store = configureStore({
    reducer: {
        formInfo: formInfoSlice,
        rechercheClient: rechercheClientSlice,
        addUser: addUserSlice
        
    }
});

export default store;