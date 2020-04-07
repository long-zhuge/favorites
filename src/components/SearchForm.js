import React from 'react';
import { Form, Button, Row } from 'antd';

class SearchForm extends React.PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    const { form, callback = () => {} } = this.props;

    form.validateFields((err, values) => {
      callback(values);
    });
  };

  render() {
    const { form, btnText = '查询', children, loading = false, extraNode } = this.props;
    const formProps = { form, required: false };

    return (
      <Form
        hideRequiredMark
        autoComplete="off"
        className="tableListForm"
        onSubmit={this.handleSearch}
      >
        <Row>
          {children(formProps)}
          {btnText && btnText !== '' && <Button loading={loading} htmlType="submit">{btnText}</Button>}
          {extraNode}
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
