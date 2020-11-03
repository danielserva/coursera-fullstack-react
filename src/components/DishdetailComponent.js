import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    renderComments(comments){
        if (comments != null){
            const commentList = comments.map((commentNode) =>
                <li key={commentNode.id}>
                    <p>{commentNode.comment} <br></br> --{commentNode.author},{ new Date(commentNode.date).toLocaleDateString()}</p>
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

    renderDish(dish){
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

    render() {
        const dish = this.props.dish;
        if (dish != null){

            return(<div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );

        } else {
            return (<div></div>);
        }
    }

}

export default Dishdetail;