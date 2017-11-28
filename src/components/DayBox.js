/**
 * 右侧存放day的容器
 */
import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import { dateUtil } from '../utils/DateUtil';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import calendarAction from '../action/calendarAction'
const Root = styled.div`
    width:80%;
    height:100%;
    margin-left:5px;
    display:flex;
    flex-direction:column;
    .week_box{
        height:10%;
        background: rgba(0,0,0, 0.3);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#9900000, endColorstr=#9900000);
        margin-bottom:10px;
        display:flex;
        align-items:center;
        justify-content:space-around;
        .week{
            background-color:#fff;
            opacity:0.3;
            width:12.2857%;
            margin:7.5% 1%;
            height:85%;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:4px;
            &:hover{
                background: rgba(33,150,243, 0.8);
                filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#992196F3, endColorstr=#992196F3);
                color:#fff;
                box-shadow:2px 2px 5px #000;
            }
        }
    }
    .day_box{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        height:90%;
        background: rgba(0,0,0, 0.3);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#9900000, endColorstr=#9900000);
        display:flex;
        flex-wrap:wrap;
        .dayCard{
            z-index:9999;
            font-size:60%;
            background-color:#fff;
            opacity:0.3;
            border-radius:4px;
            width:12.2857%;
            height:18%;
            margin:0 1%;
            margin-top:2px;
            display:flex;
            flex-direction:column;
            &:hover{
                opacity:1.0;
            }
            .top-box{
                display:flex;
                justify-content:space-around;
                .fill-box{
                    flex-grow:1;
                }
            }
            .midium-box{
                flex-grow:1;
                display:flex;
                flex-direction:column;
                justify-content:flex-end;
                .span-icon-checkin{
                    display:inline-block;
                    width:10px;
                    height:10px;
                    border-radius:50%;
                    background-color:green;
                    margin:0 1.5px;
                    &:hover{
                        position:relative;
                        top:2.5px;
                        left:-2.5px;
                        width:15px;
                        height:15px;
                    }
                }
                .span-icon-checkout{
                    display:inline-block;
                    width:10px;
                    height:10px;
                    border-radius:50%;
                    background-color:#2196F3;
                    margin:0 1.5px;
                    &:hover{
                        position:relative;
                        top:2.5px;
                        left:-2.5px;
                        width:15px;
                        height:15px;
                    }
                }
                .time-text{

                }

            }
            .bottom-box{
                display:flex;
                justify-content:flex-end;
                color:#2196F3;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .bottom-box1{
                display:flex;
                justify-content:flex-end;
                color:yellow;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }

`
//一天的毫秒数
const MILLISECOND =  1*24*60*60*1000;
const weeks = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];

class DayBox extends React.Component{
    constructor(props){
        super(props)
        this.state ={

        }

    }

    componentWillMount(){
       
    }

    /**
     * 根据开始时间戳得到35天的数据
     */
    get35DaysDate = (startMillis)=>{
        let data = []
        for(let i=0;i<35;i++){
            let date = dateUtil.getDateByMilliseconds(startMillis+MILLISECOND*i)
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let month2 = month >= 10?month:('0'+month);
            let daynum = date.getDate();
            let daynum2 = daynum >= 10?daynum:('0'+daynum);
            data.push(
                {
                    //几号
                    dayNumber:month2+'-'+daynum2,
                    //是否周末
                    weekable:date.getDay() ===0 ||date.getDay() ===6,
                    //日子类型，某个节日，工作日，或者周末
                    dayType:dateUtil.getFestival(month,daynum),
                    //当前展示的月份
                    currentMonth:month2,
                    currentYear:year,
                    currentDay:daynum2
                }
            );
        }

        return data;
    }

    render(){
        let {year} = this.props
        let {month} = this.props
        let time = year.toString()+'-'+month.toString()+'-'+'01'+' 00:00:00'
        //得到这个月一号的时间戳
        let date1millis = dateUtil.getMillisecondsByDateFormat(time);
        //得到这个月1号的Date对象
        let date1 = dateUtil.getDateByMilliseconds(date1millis)
        //得到星期
        let week = date1.getDay();
        //得到起始时间戳
        let startMillis = date1millis-week*MILLISECOND;
        let data35 = this.get35DaysDate(startMillis) 
        return (
           <Root>
               <div className="week_box">
                    {
                        weeks.map((item,index)=>{
                           return <span className="week" key={index}>{item}</span>
                        })
                    }
               </div>
               <div className="day_box">
                    {
                        
                        data35.map((item,index)=>{
                            return <DayCard key={index} className="dayCard" {...item} {...this.props}></DayCard>
                        })
                    }
               </div>
           </Root>
        )
    }
}

class DayCard extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            hello:'辛苦了',
            checkInStyle:{},
            checkInTime:"09:00:00",
            checkOutStyle:{},
            helloStyle:{color:'#2196F3'},
            checkOutTime:"17:00:00",

        }
    }

    componentWillMount(){
       
        
    }

    checkIn = ()=>{
        let inTime = new Date();
        let inHour = inTime.getHours();
        if(inHour > 9 &&inHour<=17){
            this.setState({
                hello:'晚到',
                helloStyle:{
                    color:'red',
                },
                checkInStyle:{
                    backgroundColor:'red'
                },
            })
        }else{
            this.setState({
                hello:'辛苦了',
                helloStyle:{
                    color:'#2196F3',
                },
                checkInStyle:{
                    backgroundColor:'green',
                },
            })
        }
    }


    checkOut =() =>{
        let outDate = new Date();
        let outHour = outDate.getHours();
        if(outHour>=9 &&outHour < 17){
            this.setState({
                hello:"需请假",
                helloStyle:{
                    color:'yellow',
                },
                checkOutStyle:{
                    backgroundColor:'yellow',
                }
            })
        }else{
            this.setState({
                hello:"辛苦了",
                helloStyle:{
                    color:'#2196F3',
                },
                checkOutStyle:{
                    backgroundColor:'#2196F3',
                }
            })
        }
    }

    render(){
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth()+1>=10?(date.getMonth()+1).toString():'0'+(date.getMonth()+1);
        let day = date.getDate() >= 10?date.getDate().toString():'0'+date.getDate();
        return (
            <div className="dayCard" style={
                    this.props.currentYear == year&&this.props.currentMonth ==month&&this.props.currentDay == day
                    ?
                    {opacity:0.8,backgroundColor:'#F59248'}
                    :
                    (
                        this.props.month == this.props.currentMonth
                        ?
                        this.props.weekable?{opacity:0.6,backgroundColor:'#0CB943'}:{opacity:0.6}
                        :
                        this.props.weekable?{opacity:0.3,backgroundColor:'#0CB943'}:{opacity:0.3}
                    )
                }
            >
                {/* 上边最左边显示日期，最右边显示出勤状况 */}
                <div className="top-box">
                    <div className="day-number"> {this.props.dayNumber}</div>
                    <div className="fill-box"></div>
                    <div className="hello-word" style={this.state.helloStyle}> {this.props.weekable?'':this.state.hello}</div>
                </div>
                {/* z中间签到操作 */}
                <div className="midium-box">
                {
                    this.props.weekable?'':
                    <div onClick={this.checkIn}><span className="span-icon-checkin" style={this.state.checkInStyle}></span><span className="time-text">{this.state.checkInTime}</span></div>
                }
                {
                    this.props.weekable?'':
                    <div onClick={this.checkOut}><span className="span-icon-checkout" style={this.state.checkOutStyle}></span><span className="time-text">{this.state.checkOutTime}</span></div>
                }
                    
                </div>
                {/* 下边左右边显示day Type，工作日，周末，或者节日 */}
                {
                    this.props.dayType =='工作日'&&this.props.weekable?
                    <div className="bottom-box">周末</div>
                    :this.props.dayType == "工作日"&&!this.props.weekable?
                    <div className="bottom-box">工作日</div>
                    :
                    <div className="bottom-box1">{this.props.dayType}</div>
                }
                
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state.calendar
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(calendarAction, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DayBox)
