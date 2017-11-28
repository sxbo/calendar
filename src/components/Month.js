import React from 'react';
import {render} from 'react-dom'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import calendarAction from '../action/calendarAction'
const Root = styled.div`
    height:90%;
    display:flex;
    flex-direction:column;
    .month-list{
        background: rgba(0,0,0, 0.3);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#9900000, endColorstr=#9900000);
        height:75%;
        display:flex;
        flex-wrap:wrap;
        margin-bottom:5%;
        .month{
            width:40%;
            height:12.666%;
            background: rgba(255,255,255, 0.3);
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99FFFFFF, endColorstr=#99FFFFFF);
            display:flex;
            align-items:center;
            justify-content:center;
            margin:2% 5%;
            box-shadow:1px 1px 5px  #000;
            color:#039BE5;
            font-size:60%;
            border-radius:3px;
            &:hover{
                background: rgba(33,150,243, 0.8);
                filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#992196F3, endColorstr=#992196F3);
                color:#fff;
                box-shadow:2px 2px 5px #000;
            }
        }
    }
    .help{
        height:20%;
        font-size:60%;
        background-color:#000;
        opacity:0.3;
        color:#fff;
        padding:0 5px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    

`


const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

class Month extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            style:{

            }
        }
    }

    componentWillMount(){

    }

    onMonthClicked =(e)=>{
        let value = e.target.textContent;
        let month = months.indexOf(value)+1
        let mon = month >= 10?month.toString():'0'+month
        let {select_calendar_month} = this.props
        select_calendar_month?select_calendar_month(mon):''        
    }

    render(){

        return(
            <Root>
                <div className="month-list">
                {
                    months.map((item,index)=>{
                        let str = index+1>=10?(index+1).toString():'0'+(index+1);
                        if(str == this.props.month)
                        return <div className="month" style={{background: 'rgba(33,150,243, 0.8)',
                            filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#992196F3, endColorstr=#992196F3',
                            color:'#fff',
                            boxShadow:'2px 2px 5px #000'}} key={index} onClick={this.onMonthClicked}>{item}</div>
                        return <div className="month" key={index} onClick={this.onMonthClicked}>{item}</div>
                    })
                }
                </div>
                <div className="help">
                        请在左边选中年或月查看日期<br/>
                        请在右边每天工作时间内进行签入.签出操作
                </div>
            </Root>
        )
    }
}
function mapStateToProps(state) {
    return state.calendar
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(calendarAction, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Month)
