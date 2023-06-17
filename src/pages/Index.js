import React from 'react';
import { Card, Col, Form, Typography, Row, Layout, Button, Icon, Tag } from 'antd';
import Navbar from '../Navbar/Index';
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { CheckableTag } = Tag;

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
    }
  }



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <>
        <div>
          <Layout>
            <Header style={{ padding: '0px', backgroundColor: '#03a9f452' }}>
              <Navbar />
            </Header>

            <Layout>
              <Content>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: '20px'
                      }}
                    >
                      <div className="text-center">
                        <img
                          className="image-portal"
                          src="https://www.petsnvets.es/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-search-bg.896de752.png&w=640&q=75"
                          alt="logo"

                        />
                      </div>

                    </div>

                  </Col>
                  <Col span={12}>
                    <br></br>
                    <Title level={2}> Encuentra y reserva los mejores cuidados para tu mascota</Title>
                    <br />
                    <Title level={3} > Una plataforma pensada para facilitarle la vida a tu mascota</Title>

                  </Col>
                </Row>

              </Content>


            </Layout>
          </Layout>

          <Footer>


            <Card

              actions={[
                <Button
                  onClick={() => this.setState({ tag1: !this.state.tag1 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag1 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Visita a domicilio
                </Button>,
                <Button
                  onClick={() => this.setState({ tag2: !this.state.tag2 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag2 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Visita online </Button>,
                <Button
                  onClick={() => this.setState({ tag3: !this.state.tag3 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag3 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Abiertos Ahora </Button>,
                <Button
                  onClick={() => this.setState({ tag4: !this.state.tag4 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag4 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Urgencias</Button>,
                <Button
                  onClick={() => this.setState({ tag5: !this.state.tag5 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag5 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Cita online</Button>,
                <Button
                  onClick={() => this.setState({ tag6: !this.state.tag6 })}
                  type="dashed" block style={{ backgroundColor: this.state.tag6 ? "#018D84" : '', borderColor: '#1890ff', color: 'black' }}>
                  Visita presencial</Button>,
              ]}
            >
              <Button type="primary" block>
                Buscar
              </Button>
            </Card>
          </Footer>


        </div>
      </>


    );
  }
}
export default Form.create()(FormModal)