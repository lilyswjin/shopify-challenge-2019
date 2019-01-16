import React, { Component } from 'react'
const uuidv1 = require('uuid/v1');

export default class Result extends Component {

    render() {
        let { data, addFavorite } = this.props;
        let rows = <tbody></tbody>

        if (data.length) {
            rows = data.map((( row, i ) => {
                let decodedBody = new DOMParser().parseFromString(row.body, 'text/html').body.textContent;

                return (
                    <tbody key={uuidv1()}>
                        <tr>
                            <td className="favorite">
                                <i onClick={addFavorite} id={i} className="fas fa-star"></i>
                            </td>
                            <td>
                                {row.title}
                            </td>
                            <td dangerouslySetInnerHTML={{__html: decodedBody}}/>
                        </tr>
                    </tbody>
                )
            }))
        } 

        return (
            <table className="result">
                {rows}
            </table>
        )
    }
}

