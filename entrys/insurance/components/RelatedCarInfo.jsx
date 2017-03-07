/**
 * Created by douxiaobin on 2017/03/4.
 */
import React from 'react';
import { render } from 'react-dom';

import '../../../css/insurance/components/personInfoBase.css';
import '../../../css/insurance/components/personInfoLayout.css';

import AddRelatedCarInfo from './AddRelatedCarInfo.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');

var RelatedCarInfo=React.createClass({

    initialData:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterPersonInfo',
            reactActionName:'getInsuranceRelatedCarInfo',
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                var re = ob.re;
                if(re!==undefined && re!==null && (re ==2 || re =="2")) { //登录信息为空
                    return;
                }
                var data=ob.data;
                var customerId=ob.customerId;
                this.setState({
                    data:data,
                    customerId:customerId
                });
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){

        return ({data:null, customerId:null,
            isOwner:null, isSecond:null
        });
    },

    render:function(){
        var mainContent;
        var data;
        var car_trs=[];

        if(this.state.data!==undefined && this.state.data!==null) {
            data=this.state.data;
            data.map(function (item, i) {
                car_trs.push(
                    <tr key={i}>
                        <td>
                            {item.carNum}
                        </td>
                        <td>
                            {item.ownerName}
                        </td>
                        <td>
                            {item.firstRegisterDate}
                        </td>
                        <td>
                            {item.factoryNum}
                        </td>
                        <td>
                            {item.engineNum}
                        </td>
                        <td>
                            {item.frameNum}
                        </td>
                    </tr>
                );
            });

            mainContent=
                <div>
                    <div className="self_control_group">
                        <table className="table table-striped invoice-table">
                            <thead>
                            <tr>
                                <th width="300">车牌</th>
                                <th width="300">车主姓名</th>
                                <th width="300">注册日期</th>
                                <th width="300">厂牌型号</th>
                                <th width="300">发动机号</th>
                                <th width="300">车架号</th>
                            </tr>
                            </thead>
                            <tbody>
                            {car_trs}
                            </tbody>
                        </table>
                    </div>

                    <AddRelatedCarInfo customerId={this.state.customerId} flush={this.initialData}/>
                </div>
        }else{
            //初始化内容详情
            this.initialData();
        }

        return(
            <div >
                {mainContent}
            </div>
        );
    },
});
module.exports=RelatedCarInfo;
/**
 * Created by douxiaobin on 2017/03/4.
 */


