import React, { Component } from 'react'
const uuidv1 = require('uuid/v1');

export default class Result extends Component {

    render() {
        let { data, favs, addFavorite } = this.props;
        let rows = <div></div>


        if (data.length) {
            rows = data.map((( row, i ) => {
                let decodedBody = new DOMParser().parseFromString(row.body, 'text/html').body.textContent;
                let isFavorite = false;

                if (favs.length) {
                    favs.forEach((item, i) => {
                        if (item.title === row.title && item.body === row.body) {
                            isFavorite = true;
                        }
                    })
                }
                
                return (
                    <div style={{display: "table-row"}} className="table-row" key={uuidv1()}>
                        <div style={{display: "table-cell"}} className="table-cell">
                            <i onClick={addFavorite} id={i} className={`fas fa-star ${isFavorite ? "favorited-item": ""}`}></i>
                        </div>
                        <div style={{display: "table-cell"}} className="table-cell">
                            {row.title}
                        </div>
                        <div style={{display: "table-cell"}} className="table-cell" dangerouslySetInnerHTML={{__html: decodedBody}}/>
                    </div>
                )
            }))
        } 

        return (
            <div className="results">
                <div style={{display: "table"}} className="results__table">
                    {rows}
                </div>
            </div>
        )
    }
}

