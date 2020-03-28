/***
 * 这是form 表单递交
 */

import React, { Component } from 'react'
import './upload.css';
import {Icon,Input,Modal,Upload,Select,Cascader,DatePicker,message,} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import 'moment/locale/zh-cn';
import moment from 'moment';
// moment.locale('zh-cn');
import {userRiver,findDict,uploadFiles,findRegionName,list,addSupervisorByAllow} from '../../data/dataStore';
import { fetch as fetchPro } from "whatwg-fetch"
import Form from '../../componts/form/Form'
const { TextArea } = Input;
// 把图片转为base
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });
}
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
const day = date.getDate()<10 ? '0'+date.getDate() :date.getDate();
const hour = date.getHours()<10 ? '0'+date.getHours() :date.getHours();
const minute = date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()
const second = date.getSeconds() <10 ? '0'+date.getSeconds() : date.getSeconds();

const today=year+'-'+month+'-'+day+' ';
const dayList=year+'-'+month+'-'+day+' '+ hour +':'+ minute+':'+second ;
let arr=[];
export default class UploadPage extends Component {
    constructor(props){
        super(props)
        this.state={
            userData:{},
            previewVisible: false,
            previewImage: '',
            fileList: [],
            townArr:[],
            fileUrl:[],
            load:false,
        }
    }
    componentDidMount(){
        let userData=JSON.parse(localStorage.getItem('userdata'));
        console.log(userData,'userData')
        this.setState({
            userData
        },()=>{
            this.userRiver()
            this.findDict()
            this.findRegionName()
            this.list()
        })
    }
    //获取河道信息
    async userRiver(){
        let {userData}=this.state;
        let param={
            userId:userData.userId?userData.userId:0
        }
        let data = await userRiver(param)
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==0){
            let arr=[]
            let riverArr=[]
            
            for (let i =0;i<data.data.length;i++){
                if(data.data[i]&&data.data[i]['riverFid']&&arr.indexOf(data.data[i]['riverFid'])==-1){
                    riverArr.push({
                        id:data.data[i]['riverFid'],
                        regionName:data.data[i]['riverName']
                    })
                    arr.push(data.data[i]['riverFid'])
                }
            }
            this.setState({
                riverArr
            })
        }else{
            this.props.history.push('/login')

        }
    }
    async addSupervisorByAllow(param,callback){
        let data = await addSupervisorByAllow(param)
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==200){
            message.success(data.desc)
            // callback.onSuccess()
            arr=[]
            this.setState({
                fileList:arr,
                load:false
            })
        }
    }
    async findRegionName(){
        let param={
            // riverName:'',
            // townName:'',
        }
        let data = await findRegionName(param)
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==200){
            let arr=[]
            let townArr=[]
            
            for (let i =0;i<data.data.length;i++){
                if(data.data[i]&&data.data[i]['id']&&arr.indexOf(data.data[i]['id'])==-1){
                    townArr.push({
                        id:data.data[i]['id'],
                        regionName:data.data[i]['regionName']
                    })
                    arr.push(data.data[i]['id'])
                }
            }
            this.setState({
                townArr
            })
            console.log(townArr,'town')

        }
    }
    // 片区的数据
    async list(){
        let data = await list()
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==0){
            let arr=[]
            let areaArr=[]
            
            for (let i =0;i<data.data.length;i++){
                if(data.data[i]&&data.data[i]['regionId']&&arr.indexOf(data.data[i]['regionId'])==-1){
                    areaArr.push({
                        id:data.data[i]['regionId'],
                        regionName:data.data[i]['regionName']
                    })
                    arr.push(data.data[i]['regionId'])
                }
            }
            this.setState({
                areaArr
            })
        }
    }
    async findDict(){
        let param={
            
        }
        let data = await findDict(param)
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==200){
            let propblemType=[]
            let propblemObj={
                '轻微问题':this.haveList(data.data.slightProblem),
                '一般问题':this.haveList(data.data.generalProblem),
                '重大问题':this.haveList(data.data.greatProblem),
            }
            for (let i in data.data.problem){
                propblemType.push({value:data.data.problem[i].id,label:data.data.problem[i].key_value})
                for (let j in propblemObj){
                if(propblemType[i].label==j){
                    propblemType[i].children=propblemObj[j]
                }
                }
            }
            this.setState({
                propblemType,
                parameterDict:data.data,
            })
            
            console.log(propblemType,propblemObj,'propblemType')
        }
    }
    haveList=(arr)=>{
        let newList=[]
        for (let y in arr){
            newList.push({value:arr[y].id,label:arr[y].key_value})
        }
        return newList;
    }
    
    // 根据传过来的term筛选data获取相对应的fruit
    screeningData=(data,term,fruit)=>{
        if(Array.isArray(term)){
            let str1="";
            let str2="";
            for(let j in data){
                if(data[j].value==term[0]){
                    str1=data[j].label
                    for(let t in data[j].children){
                        if(data[j].children[t].value==term[1]){
                            str2=data[j].children[t].label
                        }
                    }
                }
            }
            return `${str1}-${str2}`
        }else{
            for (let i in data){
                if(data[i].id==term){
                    return data[i][fruit]
                }
            }
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
    // 阻止antd上传图片
    beforeUpload=(file)=>{
        //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({
        title: '超过2M限制，不允许上传~',
      });
      return;
    }
    if((isJPG || isJPEG || isGIF || isPNG) && isLt2M){
        console.log(file,'beforefile')
        arr.push(file)
        this.setState({
          fileUrl: arr,
        });
    }
      return false;
    }
    // 上传图片
    async handleUpdate(values,callback) {
        let formData = new FormData()
        let {fileUrl}=this.state
        for(let i in fileUrl){
            formData.append("files", fileUrl[i])//第一个参数为后端规定字段，第二个参数时需要上传的图片
        }


        let data = await fetchPro("/qpvms/api/forensics/uploadFiles", {
            method: "post",
            body: formData
        }).then(res => res.json())//第一个参数为地址,第二个参数为配置项
        
        if(data.code==0){
            this.setState({
                imgUrl:data.data
            },()=>{
                let {parameterDict,imgUrl,fileUrl,userData,townArr,propblemType,areaArr,riverArr}=this.state;
                if(imgUrl&&imgUrl.length>0){
                    values.foundTime=values.foundTime.format('YYYY-MM-DD HH:mm:ss')
                let param={
                    forensicsId:"",
                    area:"00",
                    areaName:this.screeningData(areaArr,values.area,'regionName'),
                    river:"",
                    riverName:this.screeningData(riverArr,values.river,'regionName'),
                    riverBank:"",
                    regionId:"",
                    regionName:this.screeningData(townArr,values.regionId,'regionName'),
                    bankName:this.screeningData(parameterDict.riverBank,values.riverBank,'key_value'),
                    type:"",
                    typeName:this.screeningData(propblemType,values.type),//轻微问题-绿化养护
                    pointDesc:"",
                    forensicsDesc:"",
                    updatetime:dayList,
                    foundTime:"",
                    lon:'',
                    lat:'',
                    subType:"101",
                    processState:42,
                    username:userData.userName,
                    userId:userData.userId,
                    files:'',
                    supervisorDesc:""
                }
                for(let i in param){
                    for (let j in values){
                        if(i==j){
                            param[i]=values[j]
                        }else{
                            // param[i]=''
                        }
                    }
                }
                param.type=param.type[0]
                param.files=imgUrl.toString()

                console.log(param,'param')
                this.addSupervisorByAllow(param,callback)
                }
            })
        }else{
            message.error(data.data)
        }
    }
  
    handleChange = ({ file,fileList }) => {
        console.log(file,fileList,'filechange')
        this.setState({fileList})
}
handleRemove=(file)=>{
    for(let i=0;i<arr.length;i++){
        if(file.uid==arr[i].uid){
            arr.splice(i,1)
        }
    }
    this.setState({
        fileUrl:arr
    })
}
submit=(values,callback)=>{
    this.setState({
        load:true
    })
    this.handleUpdate(values,callback)
}
  
    render() {
        let {userData,parameterDict,propblemType,previewVisible, previewImage, fileList ,townArr,areaArr,riverArr,load}=this.state;
        // document.title="无人机巡查登记管理"
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
            );
        const formItemList = [
            {
                label: '片区', //表单label
                id: 'area', //表单Item的Key值
                component: ( 
                    <Select placeholder='请选择片区' >
                        {areaArr&&areaArr.map((item)=>(
                            // console.log(item)
                            <Select.Option value={item.id} key={item.id}>{item.regionName}</Select.Option>
                        ))}
                    </Select>), //表单受控组件
                options:{rules: [{ required: true, message: '用户名不能为空!' }]}
            },
            {
                label: '河道', 
                id: 'river',
                component: ( 
                    <Select placeholder='请选择河道' >
                        {riverArr&&riverArr.map((item)=>(
                            // console.log(item)
                            <Select.Option value={item.id} key={item.id}>{item.regionName}</Select.Option>
                        ))}
                    </Select>),
                options:{rules: [{ required: true, message: '河道不能为空!' }]}
            },
            {
                label: '岸别', //表单label
                id: 'riverBank', //表单Item的Key值
                component: ( 
                    <Select placeholder='请选择岸别' >
                        {parameterDict&&parameterDict.riverBank.map((item)=>(
                            // console.log(item)
                            <Select.Option value={item.id} key={item.id}>{item.key_value}</Select.Option>
                        ))}
                    </Select>), //表单受控组件
                options:{rules: [{ required: true, message: '岸别不能为空!' }]}
            },
            {
                label: '村居', 
                id: 'regionId',
                component: ( 
                    <Select placeholder='请选择村居' >
                        {townArr&&townArr.length>0&&townArr.map((item)=>(
                            // console.log(item)
                            <Select.Option value={item.id} key={item.id}>{item.regionName}</Select.Option>
                        ))}
                    </Select>),
                options:{rules: [{ required: true, message: '村居不能为空!' }]}
            },
            {
                label: '类别', //表单label
                id: 'type', //表单Item的Key值
                component: (<Cascader options={propblemType} placeholder="请选择类别" />), //表单受控组件
                options:{rules: [{ required: true, message: '类别不能为空!' }]}
            },
            {
                label: '发现时间', 
                id: 'foundTime',
                component: (<DatePicker  showTime placeholder="请选择时间" format="YYYY-MM-DD HH:mm:ss" locale={locale}/>),
                options:{rules: [{ required: true, message: '发现时间不能为空!' }]}
            },
            {
                label: '经度', //表单label
                id: 'lon', //表单Item的Key值
                component: <Input placeholder="经度" />, //表单受控组件
                options:{rules: [{ required: true, message: '经度不能为空!' }]}
            },
            {
                label: '纬度', //表单label
                id: 'lat', //表单Item的Key值
                component: <Input placeholder="纬度" />, //表单受控组件
                options:{rules: [{ required: true, message: '纬度不能为空!' }]}
            },
            
            {
                label: '位置描述', //表单label
                id: 'pointDesc', //表单Item的Key值
                component: <TextArea rows={4} placeholder={'请输入位置描述'}/>, //表单受控组件
                specialItem: 'remark',
                // options:{rules: [{ required: true, message: '用户名不能为空!' }]}
            },
            {
                label: '描述', 
                id: 'supervisorDesc',
                component: <TextArea rows={4} placeholder={'请输入问题描述'} />,
                specialItem: 'remark',
                // options:{rules: [{ required: true, message: '密码不能为空!' }]}
            },
            {
                label: '图片上传', 
                id: 'files',
                component: (<Upload
                    action="/qpvms/qpvms/api/forensics/uploadFiles"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    name="files"
                    multiple
                    beforeUpload={this.beforeUpload}
                    >
                    {fileList.length >= 5 ? null : uploadButton}
                    </Upload>),
                specialItem: 'remark',
                options:{rules: [{ required: true, message: '照片不能为空!' }]}
            },
        ]
        
        return (
            <div className="uploadMsg">
                <div className="upload_header">
                    <h3>{userData.title}</h3>
                    <div><Icon type="user" /> <span>{userData.userName}</span></div>
                </div>
                <div className="upload_body">
                    <h3>上传取证信息</h3>
                    <Form formItemList={formItemList} submit={this.submit} footCls="imgfooter" loading={load}/>
                    <div className="clearfix">
                        {/* <span className="imgName">取证照片: </span> */}
                        <div className="clearfix">
                            
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        {/* <MyUpload/> */}
                </div>
                
                </div>
            </div>
        )
    }
}
