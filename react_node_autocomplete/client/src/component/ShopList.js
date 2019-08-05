import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';
class  ShopList extends Component{
    state = {
        items:[
            {id: uuid(), name: 'egg'},
            {id: uuid(), name: 'milk'},
            {id: uuid(), name: 'tuna'},
            {id: uuid(), name: 'chicken'}
        ]
    }

    render() {
        const { items } = this.state;
        return(
            <Container>
                <Button
                    color="dark"
                    style={{margin: '5rem' }}
                    onClick={() => {
                            const name = prompt("enter name");
                            if(name){
                                this.setState(state => ({items: [...state.items, {id: uuid(), name}]}))
                            }
                        }
                    }
                >Add items</Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id, name}) =>(
                                <CSSTransition key={id} timeout={500}  classNames="fade">
                                    <ListGroupItem className="items-row"> {name}
                                    <Button
                                        color={"danger"}
                                        className={"remove-btn"}
                                        size={"sm"}
                                        onClick={() => {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id )
                                            }))
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    </ListGroupItem>
                                </CSSTransition>
                                )
                            )
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

}

export default ShopList;