import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import YearMonthBox from './YearMonthBox'
import DayBox from './DayBox'

const Container = styled.div`
    width:100%;
    height:100%;
    box-sizing:content-box;
    background-color:#D5D2D2;
    //background-image:${props=>`url(${props.bgIcon})`};
    background-image:linear-gradient(-180deg,#3F51B5,#FFB74D);
    display:flex;
    align-items:center;
    justify-content:center;
    .container{
        height:60%;
        width:70%;
        min-width:233.333px;
        min-height:200px;
        display:flex;
    }
    
`
const bgicon = require('../res/img/light.jpg');

class App extends React.Component{
    render(){
        return(
            <Container bgIcon= {bgicon}>
                <div className="container">
                    <YearMonthBox/>
                    <DayBox/>
                </div>
            </Container>
                
        )
    }
}

export default App