import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Label, Button,
    CardTitle,  Breadcrumb, BreadcrumbItem, Row,  Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);    
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-9">
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" name="rating" 
                    className="form-control" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author">Your name</Label>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="author"
                    className="form-control"
                    validators={{
                      minLength: minLength(3), 
                      maxLength: maxLength(15)
                    }} />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                          minLength: 'Must be greater than 3 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                    />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6" 
                    className="form-control"/>
                </Row>
                <Row className="form-group">
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </div>) 
  }
}

function RenderComments({comments}){
  if (comments != null){
    const commentList = comments.map((commentNode) =>
      <li key={commentNode.id}>
          <p>{commentNode.comment} </p> --{commentNode.author},{ new Date(commentNode.date).toLocaleDateString()}
      </li>
    );
    return (<div><h4>Comments</h4>
        <ul className="list-unstyled text-left">{commentList}</ul>
        <CommentForm isModalOpen={false} />
        </div>);
  } else {
    return (
      <div>
      </div>
    );
  }
}

function RenderDish({dish}){
  if (dish != null){
    return(
      <Card>
        <CardImg top src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );

  } else {
    return (<div></div>);
  }
}

const DishDetail = (props) => {
  if (props.dish != null){
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
            <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );

  } else {
      return (<div></div>);
  }
}

export default DishDetail;