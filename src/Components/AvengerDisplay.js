import React from 'react';
import axios from 'axios';

class AvengerDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editView: false,
            superInput: ''
        }
    }

    handleInput = (val) => {
        this.setState({ superInput: val });
    }

    toggleEdit = () => {
        this.setState({ editView: !this.state.editView })
    }

    editPower = () => {
        axios.put(`/api/avenger/${this.props.avenger.avenger_id}`, {superPower: this.state.superInput})
        .then(() => this.props.avengerFn())
        .catch(err => console.log(err))
    }

    snapHero = () => {
        axios.delete(`/api/avenger/${this.props.avenger.avenger_id}`)
        .then(() => this.props.avengerFn())
        .catch(err => console.log(err))
    }

    render() {
        const { editView, superInput } = this.state,
              {avenger} = this.props;
              
        return (
            <div className='avenger-box'>
                <p>{avenger.name}</p>
                {!editView
                    ? <p>{avenger.super_power}</p>
                    : (
                        <>
                            <input value={superInput} onChange={e => this.handleInput(e.target.value)} />
                            <button onClick={this.editPower}>Submit</button>
                        </>
                    )
                }
                <button onClick={this.toggleEdit}>Edit SuperPower</button>
                <button onClick={this.snapHero}>Snap</button>
            </div>
        )
    }
}

export default AvengerDisplay;