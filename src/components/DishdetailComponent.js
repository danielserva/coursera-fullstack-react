import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Label, Button,
    CardTitle,  Breadcrumb, BreadcrumbItem, Row,  Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-9">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
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
                          minLength: 'Must be greater than 2	q	 characters',
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

function RenderComments({comments, postComment, dishId}){
  if (comments != null){
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
        <Stagger in>
          { comments.map((commentNode) => {
            return (
              <Fade in>
                <li key={commentNode.id}>
                  <p>{commentNode.comment}</p> 
                  <p>--{commentNode.author},{ new Date(commentNode.date).toLocaleDateString()}</p>
                </li>
              </Fade>
            );
          })}
        </Stagger>
        </ul>
        <CommentForm isModalOpen={false} 
          dishId={dishId}
          postComment={postComment} />
      </div>);
  } else {
    return (
      <div>
      </div>
    );
  }
}

function RenderDish({dish}){
    return(
      <div className="col-12 col-md-5 m-1">
        <FadeTransform in
            transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );

}

const DishDetail = (props) => {
  if (props.isLoading){
    return (
      <div className="container">
        <div className="row">
          <Loading></Loading>
        </div>
      </div>
    );
  } else if(props.errMess){
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else  if (props.dish != null){
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
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id} />
        </div>
      </div>
    );

  } else {
      return (<div></div>);
  }
}

export default DishDetail;