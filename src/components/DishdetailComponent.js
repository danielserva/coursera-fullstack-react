import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderComments({comments}){
        if (comments != null){
            const commentList = comments.map((commentNode) =>
                <li key={commentNode.id}>
                    <p>{commentNode.comment} </p> --{commentNode.author},{ new Date(commentNode.date).toLocaleDateString()}
                </li>
            );
            return (<div><h4>Comments</h4>
                <ul className="list-unstyled text-left">{commentList}</ul></div>);
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
            return(<div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
                </div>
            );

        } else {
            return (<div></div>);
        }
    }

export default DishDetail;