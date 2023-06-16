import React from 'react';
import { Card, Input, Form, Typography, Divider, Layout, Button } from 'antd';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;


    return (
      <>
        <div>
          <Layout>
            <Content>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: '20px'
                }}
              >

                <Card style={{ width: 500 }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Title level={4} >Encuentra y reserva los mejores cuidados para tu mascota </Title>
                  </div>
                  <div className="text-center">
                    <img
                      className="image-portal"
                      src="https://www.promedco.com/images/NOTICIAS_2020/reducir-estres-de-mascotas-1.jpg"
                      alt="logo"
                      style={{ width: '450px', height: '250px' }}
                    />
                  </div>
                  <Divider type="vertical" />

                  <Divider type="vertical" />
                  <Form>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <Form.Item>
                          {getFieldDecorator('nombre', {
                            initialValue: "",
                            rules: [{
                              required: false,
                              message: 'Campo obligatorio.',
                              whitespace: true
                            }]
                          })(
                            <Input
                              placeholder="Ingrese el nombre de veterinario o servicio"
                              autoComplete="off"
                            />
                          )}
                        </Form.Item>
                        <br></br>
                        <Button type="primary" block>
                          Buscar
                        </Button>
                      </div>


                    </div>


                  </Form>
                </Card>

              </div>

            </Content>
            <Footer>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: '50px'
                }}
              >
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Visita presencial
                </Button>
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Visita a domicilio </Button>
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Visita online </Button>
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Abiertos Ahora
                </Button>
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Urgencias
                </Button>
                <Button type="dashed" block style={{ color: '#1890ff', borderColor: '#1890ff' }}>
                  Cita online
                </Button>
              </div>
            </Footer>
          </Layout>




        </div>
      </>


    );
  }
}
export default Form.create()(FormModal)