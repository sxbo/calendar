import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import calendarAction from '../action/calendarAction'

const CheckBox = styled.div`
    background-color:#000;
    opacity:0.3;        
    height:10%;
    width:100%;
    margin-bottom:10px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    .content{
        height:30px;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        .valueBox{
            color:#fff;
            margin:0 2px;
        }
        .optionBox{
            display:flex;
            flex-direction:column;
            height:20px;
            align-items:center;
            justify-content:center;
            margin:0 2px;
            .arrow-up{
               height:50%;
               width:15px;
               background-image:${props=>`url(${props.bgupIcon})`};
               background-size:100% 100%;
               margin-bottom:1.5px;
               &:hover{
                    height:20px;
                    width:20px;
               }
            }
            .arrow-down{
                margin-top:1.5px;
                height:50%;
                background-image:${props=>`url(${props.bgDownIcon})`};
                background-size:100% 100%;
                width:15px;
                &:hover{
                    height:20px;
                    width:20px;
               }
            }
        }
    }        
`

const bgupIcon = require('../res/img/arrow_up.png')
const bgdownIcon = require('../res/img/arrow_down.png')

class Year extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            value:new Date().getFullYear(),
        }
    }

    componentWillMount(){

    }

    
    arrow_up_clicked = (e)=>{
        let value = this.state.value+1;
        this.setState({
            value:value
        })
        let {select_calendar_year} = this.props
        select_calendar_year?select_calendar_year(value):''
    }

    arrow_down_clicked=()=>{
        if(this.state.value <= 1){
            return;
        }
        let value = this.state.value-1;
        this.setState({
            value:value
        })
        let {select_calendar_year} = this.props
        select_calendar_year?select_calendar_year(value):''
    }
    render(){
        return(
            <CheckBox bgupIcon={bgupIcon} bgDownIcon={bgdownIcon}>
                <div className="content">
                    <div className="valueBox">
                        {this.state.value}
                    </div>
                    <div className="optionBox">
                        <div className="arrow-up" onClick={this.arrow_up_clicked.bind(this)}>
                        </div>
                        <div className="arrow-down" onClick={this.arrow_down_clicked.bind(this)}>
                            
                        </div>
                    </div>
                </div>
            </CheckBox>       
        )
    }
}
function mapStateToProps(state) {
    return state.calendar
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(calendarAction, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Year)
