import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getAll} from '../BookApi';

// Templates
import Header from './Header'
import FooterTemplate from './FooterTemplate'
import BookSection from './BookSection'
import { Row, Tab } from 'react-materialize';
import Col from 'react-materialize/lib/Col';
import Tabs from 'react-materialize/lib/Tabs';



class LoggedHome extends Component {
    state ={
        userName:"José Ronaldo",
        userPoints: 100,
        userTag: "@zeRonaldo",
        readingShelf: [],
        readShelf:[],
        noShelf:[],
        wantToShelf: []
    }
    componentDidMount(){
        getAll().then( books => {
                books.map( book => {
                    console.log(book);
                    if(book.shelf === 'currentlyReading'){
                        this.setState({
                            readingShelf: [...this.state.readingShelf, book]
                        });
                    }else if (book.shelf === 'read'){
                        this.setState({
                            readShelf: [...this.state.readShelf, book]
                        });
                    }else if(book.shelf === 'wantToRead'){
                        this.setState({
                            wantToShelf: [...this.state.wantToShelf, book]
                        });
                    }else{
                        this.setState({
                            noShelf: [...this.state.noShelf, book]
                        })
                    };
                });
        })
    }

    render() {
        return(
            <div className="home">
                
                <Header/>
                    <div className="container">
                        <Row className="home-header">
                            <Col s={12} m={6} className="center">
                                <img src="" className="profile-picture"></img>
                            </Col>
                            <Col s={12} m={6}>
                                <h1 className="greetings"> Hey, {this.state.userName}</h1>
                                
                                    <p>
                                        <b>{this.state.userTag}</b> - <b>{this.state.userPoints}</b> My Points
                                    </p>
                                
                            </Col>
                        </Row>
                        
                        <div className="content">
                            <Tabs >
                                <Tab title="Reading" active>
                                    <BookSection sectionName="Lendo" books={this.state.readingShelf} />
                                </Tab>
                                <Tab title="Read">
                                    <BookSection sectionName="Lidos" books={this.state.readShelf} />
                                </Tab>
                                <Tab title="Want To Read">
                                    <BookSection sectionName="Quero Ler" books={this.state.wantToShelf} />
                                </Tab>
                            </Tabs>
                            
                        </div>
                    </div>
                
                

                <FooterTemplate />
            </div>
            
        );
    };
}

export default LoggedHome;