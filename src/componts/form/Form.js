import React from 'react'
import { Form ,Button ,Icon} from 'antd'
import './form.css'
import moment from 'moment';
class FormModal extends React.Component {
  state = {
    loading: false,
  }
  onOk = () => {
    const { submit } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submit(values, {
          onSuccess: () => {
            this.props.form.resetFields()
            this.setState({
              loading: false,
            })
          },
        })
      }
    })
  }
  onCancel = () => {
    //关闭弹窗不清空里面的内容
    const { closeModal } = this.props
    this.setState({
      loading: false,
    })
    closeModal()
  }
  handleCancel = () => {
    //关闭弹窗并清空表单
    this.setState({
      loading: false,
    })
    this.onCancel()
    this.props.form.resetFields()
  }
  hasErrors = () => {
    //表单验证不通过则返回true
    const { getFieldsError } = this.props.form
    const fieldsError = getFieldsError()
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  render() {
    const { formItemList = [], className, width=350 ,btnStr,footCls,loading} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div
      className="myForm"
      >
        <Form style={{ display: 'flex', flexWrap: 'wrap',overflow:'auto'}}>
          {formItemList.map(item => {
            const { label, id, options, component, premise, divider, specialItem } = item
            // premise属性是根据他id属性的value值控制该FormItem是否显示
            // if (premise && !(getFieldValue(premise.id) === premise.value)) {
            //   return null
            // }
            return (
              <div key={id}>
                  {/* 如果divider属性为true则显示分隔 */}
                {divider && component}
                {
                    !divider && (
                        <Form.Item className={specialItem} key={id} label={label}>
                            {getFieldDecorator(id, options)(component)}
                        </Form.Item>
                    )
                }
              </div>
            )
          })}
        </Form>
        <div className={footCls?footCls:"footer"}>
            <Button
              type="primary"
              onClick={this.onOk}
              disabled={loading || this.hasErrors()}
            >
              {btnStr?btnStr:"确定"}
            </Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(FormModal)
