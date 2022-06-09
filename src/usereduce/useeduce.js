import React, {useState, useReducer} from "react";
import {data} from './data';
import { Res } from "./res";

export let Usereduce = () =>{

    //let [people, setPeople] = useState(data);

    let [person, setPerson] = useState('');

    let reducer = (state, action) => {

        //console.log(state);

        if (action.type == 'ADD_PERSON') {

            let newpeople = [...state.people, action.payload];

            return {
                ...state,
                people : newpeople,
                modelContent : 'person successfully entered',
                ismodelOpen : true
            };

            
        }


        if (action.type == 'NO_VALUE') {

            return {
                ...state,
                modelContent : 'please enter name',
                ismodelOpen : true
            };
            
        }

        if (action.type == 'REMOVE_PERSON') {
            
            //console.log(action.payload);

            let remaingPeople = state.people.filter((person) => person.id != action.payload);

            //console.log(remaingPeople);
            return {
                ...state,
                people : remaingPeople,
                modelContent : 'data succsfully deleted',
                ismodelOpen : true
            };
        }

        if (action.type == 'CLOSE_MODEL') {

            return {
                ...state,
                ismodelOpen : false
            };
            
        }

        
    }

    let defaultState = {
        people : data,
        modelContent : '',
        ismodelOpen : false
    };

    let [state, dispatch] = useReducer(reducer, defaultState);


    let handleClick = (e) => {

        e.preventDefault();

        if (person) {

            let newperson = {id: new Date().getTime(), name: person};

            dispatch({type: 'ADD_PERSON', payload: newperson});

            setPerson('');

            //console.log(new Date().getTime());
            
        }else{
            dispatch({type: 'NO_VALUE'});
        }
    }


    let handleREmove = (id) => {

        dispatch({type: 'REMOVE_PERSON', payload: id});

    }

    let closeModel = () => {

        dispatch({type: 'CLOSE_MODEL'});
    }

    return(
        <>
        <h3>use reducer</h3>

        {state.ismodelOpen && <Res modelContent= {state.modelContent} closeModel = {closeModel} />}

        <form action="">

            <div>
                <input type="text" name="name" id="name" placeholder="nameeeee" value={person} onChange={(e) => setPerson(e.target.value)}/>
            </div>

            <button type="submit" id="btn" onClick={handleClick}>submit</button>
        </form>

        <div>
            {state.people.map((person) => {
                return <div key={person.id}>
                    <span>{person.name}</span>
                    <button type="button" onClick={() => {handleREmove(person.id)}}> remove</button>
                </div>
            })}
        </div>
        </>
    )
}