import React from "react"
import { UploadContainer } from "./styled"
import { Icon ,message} from "antd"
import { fetch as fetchPro } from "whatwg-fetch"
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl: ""
        }
        if (this.props.value) {
            this.state.imgUrl = this.props.value
        }
    }
    render() {
        let { imgUrl } = this.state
        return (
            <UploadContainer>
                <input type="file" onChange={this.handleUpdate.bind(this)} ref="files" />
                <div className="imgContent">
                    {imgUrl ? <img src={`http://116.228.75.54:8082/qpvms/image/evidence/
${imgUrl}`} /> : <Icon type="plus" style={{ fontSize: 26 }} />}
                </div>
            </UploadContainer>
        )
    }
    async handleUpdate() {
        let fileImg = this.refs.files.files[0];
        console.log(fileImg,'fileImg')
        let formData = new FormData()

        formData.append("files", fileImg)//第一个参数为后端规定字段，第二个参数时需要上传的图片

        let data = await fetchPro("/qpvms/qpvms/api/forensics/uploadFiles", {
            method: "post",
            body: formData
        }).then(res => res.json())//第一个参数为地址,第二个参数为配置项
        
        if(data.code==0){
            this.setState({
                imgUrl:data.data
            })
        }else{
            message.error(data.data.desc)
        }
    }
}




export default Upload